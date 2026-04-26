// thong tin giao hang
let currentDeliveryInfo = null;
// mảng địa chỉ ví dụ
const locationData = {
  HCM: {
    name: "TP. Hồ Chí Minh",
    districts: {
      Q1: {
        name: "Quận 1",
        wards: ["Phường Bến Nghé", "Phường Bến Thành", "Phường Đa Kao"],
      },
      GV: {
        name: "Quận Gò Vấp",
        wards: ["Phường 3", "Phường 4", "Phường 5", "Phường 10"],
      },
      TDB: {
        name: "TP. Thủ Đức",
        wards: ["Phường Linh Trung", "Phường Linh Chiểu", "Phường Hiệp Phú"],
      },
    },
  },
  HN: {
    name: "Hà Nội",
    districts: {
      CG: {
        name: "Quận Cầu Giấy",
        wards: ["Phường Dịch Vọng", "Phường Mai Dịch", "Phường Quan Hoa"],
      },
      DD: {
        name: "Quận Đống Đa",
        wards: ["Phường Cát Linh", "Phường Láng Hạ", "Phường Ô Chợ Dừa"],
      },
    },
  },
  DN: {
    name: "Đồng Nai",
    districts: {
      CM: {
        name: "Huyện Cẩm Mỹ",
        wards: ["Xã Xuân Đông", "Xã Xuân Quế", "Xã Xuân Tây"],
      },
      ST: {
        name: "Huyện Xuân Lộc",
        wards: ["Xã Lang Minh", "Xã Xuân Định", "Xã Bảo Hòa"],
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutItems();
  initAddressSelects();
  // sự kiện
  const btnConfirmPay = document.getElementById("btn-confirm-pay");
  if (btnConfirmPay) {
    btnConfirmPay.addEventListener("click", handleCheckout);
  }

  const btnPaid = document.getElementById("btn-paid");
  if (btnPaid) {
    btnPaid.addEventListener("click", finishOrder);
  }

  const btnSaveAddress = document.querySelector("#addressModal .btn-danger");
  if (btnSaveAddress) {
    btnSaveAddress.addEventListener("click", validateAndSaveAddress);
  }
});

// Xử lý khi khách bấm Mua Ngay
function handleCheckout() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // kiểm tra đã có gì trong giỏ chưa
  if (cart.length === 0) {
    alert("Giỏ hàng trống trơn kìa bro! Mua gì đi rồi hẳn thanh toán.");
    window.location.href = "products.html";
    return;
  }

  // Chưa có địa chỉ
  if (!currentDeliveryInfo) {
    alert("Chưa có thông tin nhận hàng, tính ship đi đâu?");
    // Bật modal cho nhập vào
    const addressModal = new bootstrap.Modal(
      document.getElementById("addressModal"),
    );
    addressModal.show();
    return;
  }

  const paymentMethod = document.querySelector(
    'input[name="payment"]:checked',
  ).value;

  if (paymentMethod === "bank") {
    const qrModal = new bootstrap.Modal(document.getElementById("qrModal"));
    qrModal.show();
  } else {
    finishOrder();
  }
}

// kết thúc thanh toans
function finishOrder() {
  const modalEl = document.getElementById("qrModal");
  if (modalEl && modalEl.classList.contains("show")) {
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
  alert(
    `Chốt đơn thành công!\nSẽ ship tới: ${currentDeliveryInfo.ten} - ${currentDeliveryInfo.sdt}\nĐịa chỉ: ${currentDeliveryInfo.diaChi}`,
  );

  // Xóa cart
  localStorage.removeItem("cart");
  if (typeof updateCartBadge === "function") {
    updateCartBadge();
  }
  window.location.href = "index.html";
}

// Lấy thoogn tin người đặt
function validateAndSaveAddress() {
  const ten = document.getElementById("ten-nguoi-nhan").value.trim();
  const sdt = document.getElementById("sdt-nguoi-nhan").value.trim();
  const soNha = document.getElementById("so-nha").value.trim();

  const tinhEl = document.getElementById("tinh");
  const quanEl = document.getElementById("quan");
  const phuongEl = document.getElementById("phuong");

  if (
    !ten ||
    !sdt ||
    !soNha ||
    !tinhEl.value ||
    !quanEl.value ||
    !phuongEl.value
  ) {
    alert("Nhập thiếu thông tin rồi, điền cho đủ form đi!");
    return;
  }

  if (sdt.length < 10 || isNaN(sdt)) {
    alert("Số điện thoại nhìn điêu thế? Nhập lại đê!");
    return;
  }
  const tenTinh = tinhEl.options[tinhEl.selectedIndex].text;
  const tenQuan = quanEl.options[quanEl.selectedIndex].text;
  const tenPhuong = phuongEl.options[phuongEl.selectedIndex].text;

  const diaChiFull = `${soNha}, ${tenPhuong}, ${tenQuan}, ${tenTinh}`;

  // Truyền vào thong tin người mua
  currentDeliveryInfo = { ten, sdt, diaChi: diaChiFull };

  const infoBox = document.querySelector(".card-custom .mt-2");
  if (infoBox) {
    infoBox.innerHTML = `
      <b class="text-dark">${ten}</b> | <b>${sdt}</b><br />
      <span class="small-text text-muted">${diaChiFull}</span>
    `;
  }

  const modal = bootstrap.Modal.getInstance(
    document.getElementById("addressModal"),
  );
  modal.hide();
}

// hiển thị sản phẩm đã lấy
function renderCheckoutItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("checkout-items-container");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML =
      '<p class="text-center mt-3 text-muted">Trống trơn, đi lựa đồ đi đã.</p>';
    return;
  }

  let html = "";
  let tongTienHang = 0;
  const phiShip = 35000;

  cart.forEach((item) => {
    tongTienHang += item.price * item.quantity;
    html += `
      <div class="d-flex mt-3 border-bottom pb-2">
        <img src="${item.image}" class="product-img me-3" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" />
        <div class="flex-grow-1">
          <div class="fw-bold" style="font-size: 0.9rem;">${item.name}</div>
          <div class="text-danger fw-bold mt-1">${item.price.toLocaleString("vi-VN")}đ</div>
        </div>
        <div class="fw-bold align-self-center text-muted">x${item.quantity}</div>
      </div>
    `;
  });

  container.innerHTML = html;

  const tongThanhToan = tongTienHang + phiShip;

  const elTienHang = document.getElementById("checkout-subtotal");
  const elTongThanhToan = document.getElementById("checkout-total");
  const elBottomTotal = document.getElementById("bottom-total");

  if (elTienHang)
    elTienHang.innerText = `${tongTienHang.toLocaleString("vi-VN")}đ`;
  if (elTongThanhToan)
    elTongThanhToan.innerText = `${tongThanhToan.toLocaleString("vi-VN")}đ`;
  if (elBottomTotal)
    elBottomTotal.innerText = `${tongThanhToan.toLocaleString("vi-VN")}đ`;
}

function initAddressSelects() {
  const selectTinh = document.getElementById("tinh");
  const selectQuan = document.getElementById("quan");
  const selectPhuong = document.getElementById("phuong");

  if (!selectTinh || !selectQuan || !selectPhuong) return;

  let htmlTinh = '<option value="">Chọn Tỉnh / Thành phố</option>';
  for (const code in locationData) {
    htmlTinh += `<option value="${code}">${locationData[code].name}</option>`;
  }
  selectTinh.innerHTML = htmlTinh;

  // Xử lý khi đổi Tỉnh -> Đổ data quận/ huyện
  selectTinh.addEventListener("change", (e) => {
    const maTinh = e.target.value;
    if (maTinh) {
      const districts = locationData[maTinh].districts;
      let htmlQuan = '<option value="">Chọn Quận / Huyện</option>';
      for (const code in districts) {
        htmlQuan += `<option value="${code}">${districts[code].name}</option>`;
      }
      selectQuan.innerHTML = htmlQuan;
    } else {
      selectQuan.innerHTML = '<option value="">Chọn Quận / Huyện</option>';
    }
    selectPhuong.innerHTML = '<option value="">Chọn Phường / Xã</option>';
  });

  selectQuan.addEventListener("change", (e) => {
    const maTinh = selectTinh.value;
    const maQuan = e.target.value;

    if (maQuan) {
      const wards = locationData[maTinh].districts[maQuan].wards;
      let htmlPhuong = '<option value="">Chọn Phường / Xã</option>';
      wards.forEach((wardName) => {
        htmlPhuong += `<option value="${wardName}">${wardName}</option>`;
      });
      selectPhuong.innerHTML = htmlPhuong;
    } else {
      selectPhuong.innerHTML = '<option value="">Chọn Phường / Xã</option>';
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
    // 1. Danh sách mã giảm giá giả lập
    const validVouchers = {
        "SWEET10": { type: "percent", value: 10 },      // Giảm 10%
        "FREESHIP": { type: "fixed", value: 35000 },    // Giảm 35.000đ
        "GIAM50K": { type: "fixed", value: 50000 }      // Giảm 50.000đ
    };

    // Hàm tiện ích: Ép chuỗi "35.000đ" thành số 35000
    function parseCurrency(str) {
        return parseInt(str.replace(/[^0-9]/g, "")) || 0;
    }

    // Hàm tiện ích: Format số 35000 thành "35.000đ"
    function formatCurrency(num) {
        return num.toLocaleString("vi-VN") + "đ";
    }

    // 2. Bắt sự kiện khi bấm nút "Áp dụng"
    const btnApplyVoucher = document.getElementById("btn-apply-voucher");
    if (btnApplyVoucher) {
        btnApplyVoucher.addEventListener("click", function () {
            const inputCode = document.getElementById("voucher-input").value.trim().toUpperCase();
            
            if (!inputCode) {
                alert("Vui lòng nhập mã giảm giá!");
                return;
            }

            if (validVouchers.hasOwnProperty(inputCode)) {
                const voucher = validVouchers[inputCode];
                applyDiscount(voucher, inputCode);
            } else {
                alert("Mã giảm giá không hợp lệ hoặc đã hết hạn!");
            }
        });
    }

    // 3. Logic tính toán tiền
    function applyDiscount(voucher, codeName) {
        const subtotalEl = document.getElementById("checkout-subtotal");
        const shippingEl = document.getElementById("checkout-shipping");
        const totalEl = document.getElementById("checkout-total");
        const bottomTotalEl = document.getElementById("bottom-total");
        
        const discountRow = document.getElementById("discount-row");
        const discountValEl = document.getElementById("checkout-discount");

        // Lấy tiền hàng và tiền ship hiện tại (Mặc định đang là 0đ và 35.000đ trong HTML của bạn)
        let subtotal = parseCurrency(subtotalEl.innerText);
        let shipping = parseCurrency(shippingEl.innerText);
        let discountAmount = 0;

        // Tính tiền được giảm
        if (voucher.type === "percent") {
            discountAmount = (subtotal * voucher.value) / 100;
        } else if (voucher.type === "fixed") {
            discountAmount = voucher.value;
        }

        // Không cho phép giảm lố tổng tiền
        if (discountAmount > (subtotal + shipping)) {
            discountAmount = subtotal + shipping;
        }

        let newTotal = subtotal + shipping - discountAmount;
        if (newTotal < 0) newTotal = 0;

        // Cập nhật lên giao diện
        discountValEl.innerText = "-" + formatCurrency(discountAmount);
        discountRow.classList.remove("d-none"); // Hiện dòng màu xanh lên
        
        totalEl.innerText = formatCurrency(newTotal);
        bottomTotalEl.innerText = formatCurrency(newTotal);

        alert(`Áp dụng mã ${codeName} thành công! Bạn được giảm ${formatCurrency(discountAmount)}`);
        
        // Đóng Modal an toàn bằng Bootstrap
        const modalElement = document.getElementById('voucherModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modalInstance.hide();
    }
});