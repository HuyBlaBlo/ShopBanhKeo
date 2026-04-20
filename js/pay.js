// File: js/pay.js

// 1. SỰ KIỆN LOAD TRANG (Phải nằm ngoài cùng)
document.addEventListener("DOMContentLoaded", function () {
  // Hiển thị hóa đơn ngay khi vào trang
  hienThiHoaDon();

  // Bắt sự kiện ấn nút MUA NGAY
  let nutMuaNgay = document.getElementById("btn-confirm-pay");

  if (nutMuaNgay) {
    nutMuaNgay.addEventListener("click", function () {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống! Vui lòng chọn sản phẩm trước.");
        window.location.href = "products.html";
        return;
      }

      //LẤY PHƯƠNG THỨC THANH TOÁN
      let paymentMethod = document.querySelector(
        'input[name="payment"]:checked'
      ).value;

      // NẾU CHUYỂN KHOẢN → HIỆN QR
      if (paymentMethod == "bank") {
        const qrModal = new bootstrap.Modal(
          document.getElementById("qrModal")
        );
        qrModal.show();
        return; //dừng lại, chưa đặt hàng
      }

      //COD
      xuLyDatHangThanhCong();
    });
  }

      //sự kiện nút "ĐÃ THANH TOÁN"
      let btnPaid = document.getElementById("btn-paid");

      if (btnPaid) {
        btnPaid.addEventListener("click", function () {
          // đóng modal trước
          const modalEl = document.getElementById("qrModal");
          const modal = bootstrap.Modal.getInstance(modalEl);
          modal.hide();

      // xử lý đơn hàng
      xuLyDatHangThanhCong();
    });
}
});

function xuLyDatHangThanhCong() {
  alert("Cảm ơn bạn! Đơn hàng đã được đặt thành công.");
      localStorage.removeItem("cart"); // Xóa giỏ hàng sau khi mua xong

      // reset số luowgnj trên icon giỏ hàng về 0
      if (typeof updateCartBadge === "function") {
        updateCartBadge();
      }

      // Đẩy người dùng về trang chủ
      window.location.href = "index.html";
}

// 2. HÀM HIỂN THỊ HÓA ĐƠN VÀ TÍNH TIỀN
function hienThiHoaDon() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let khungChuaSanPham = document.getElementById("checkout-items-container");

  if (!khungChuaSanPham) return;

  if (cart.length === 0) {
    khungChuaSanPham.innerHTML =
      '<p class="text-center mt-3 text-muted">Giỏ hàng trống, vui lòng thêm sản phẩm vào giỏ hàng</p>';
    return;
  }

  let html = "";
  let tongTienHang = 0;
  let phiShip = 35000;

  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let thanhTienMonHang = item.price * item.quantity;

    tongTienHang += thanhTienMonHang;

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
  }

  khungChuaSanPham.innerHTML = html;

  let tongThanhToan = tongTienHang + phiShip;

  let theTienHang = document.getElementById("checkout-subtotal");
  let theTongThanhToan = document.getElementById("checkout-total");
  let theTongThanhToanDuoiDay = document.getElementById("bottom-total");

  if (theTienHang) {
    theTienHang.innerText = tongTienHang.toLocaleString("vi-VN") + "đ";
  }

  if (theTongThanhToan) {
    theTongThanhToan.innerText = tongThanhToan.toLocaleString("vi-VN") + "đ";
  }

  if (theTongThanhToanDuoiDay) {
    theTongThanhToanDuoiDay.innerText =
      tongThanhToan.toLocaleString("vi-VN") + "đ";
  }
}
