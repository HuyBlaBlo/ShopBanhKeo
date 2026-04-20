let currentProduct = null;

// laasy id
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);

  return params.get("id") || "socola-1";
}

function loadProductDetail() {
  const productId = getProductIdFromUrl();

  //lấy từ data.js
  if (typeof productData === "undefined" || !productData[productId]) {
    alert("Lỗi: Không tìm thấy sản phẩm này!");
    return;
  }

  currentProduct = productData[productId];

  //đưa dữ lieuejv vào
  document.getElementById("product-img").src = currentProduct.image;
  document.getElementById("product-img").alt = currentProduct.name;
  document.getElementById("product-name").textContent = currentProduct.name;
  document.getElementById("product-price-new").textContent =
    currentProduct.price.toLocaleString("vi-VN") + "đ";

  let skuEl = document.querySelector(".product-meta span.fw-bold");
  if (skuEl) skuEl.textContent = productId.toUpperCase();

  let descEl = document.getElementById("product-desc");
  if (descEl) {
    descEl.textContent =
      currentProduct.desc ||
      "Sản phẩm ngọt ngào từ Sweet Cravings, mang đến hương vị tuyệt hảo và cảm xúc thăng hoa số 1 num bờ oăn";
  }

  return productId;
}

window.changeQty = function (delta) {
  const qtyInput = document.getElementById("qty");

  if (!qtyInput) return;

  let currentQty = parseInt(qtyInput.value) || 1;
  currentQty = Math.max(1, currentQty + delta);
  qtyInput.value = currentQty;
};

function setupButtons() {
  let btnAdd = document.querySelector(".btn-warning");
  if (btnAdd) {
    btnAdd.addEventListener("click", function (e) {
      e.preventDefault();
      xuLyThemVaoGio(false);
    });
  }

  let btnBuy = document.querySelector(".btn-danger");
  if (btnBuy) {
    btnBuy.addEventListener("click", function (e) {
      e.preventDefault();
      xuLyThemVaoGio(true);
    });
  }
}

function xuLyThemVaoGio(chuyenTrang) {
  if (!currentProduct) return;

  const qtyInput = document.getElementById("qty");
  const soLuongThem = parseInt(qtyInput ? qtyInput.value : 1) || 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existingItem = cart.find((item) => item.id === currentProduct.id);

  if (existingItem) {
    existingItem.quantity += soLuongThem;
  } else {
    cart.push({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: currentProduct.image,
      quantity: soLuongThem,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  if (typeof updateCartBadge === "function") {
    updateCartBadge();
  }

  if (chuyenTrang) {
    window.location.href = "cart.html";
  } else {
    alert(
      `Đã thêm ${soLuongThem} phần "${currentProduct.name}" vào giỏ ngọt ngào!`,
    );
  }
}

// sarn pham lien quan
function loadRelatedProducts(currentProductId) {
  let container = document.getElementById("related-products");
  if (!container) return;

  // chỉ lấy chữ cái đầu để đi duyệt
  let currentCategory = currentProductId.split("-")[0];

  let html = "";
  let count = 0;

  //
  for (let id in productData) {
    if (
      id.startsWith(currentCategory) &&
      id !== currentProductId &&
      count < 4
    ) {
      let product = productData[id];

      html += `
        <div class="col-6 col-md-3 mb-4">
          <div class="card h-100 shadow-sm border-0 position-relative" style="cursor: pointer;" onclick="window.location.href='product-detail.html?id=${id}'">
            <img src="${product.image}" class="card-img-top" alt="${product.name}" style="height: 180px; object-fit: cover;">
            <div class="card-body text-center p-3">
              <h6 class="card-title text-truncate" style="font-size: 0.9rem;" title="${product.name}">${product.name}</h6>
              <p class="text-danger fw-bold mb-0">${product.price.toLocaleString("vi-VN")}đ</p>
            </div>
            <div class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-25 opacity-0 hover-overlay" style="transition: 0.3s;">
              <span class="btn btn-sm btn-light fw-bold rounded-pill">Xem chi tiết</span>
            </div>
          </div>
        </div>
      `;
      count++;
    }
  }

  if (html === "") {
    container.innerHTML =
      "<p class='text-center text-muted'>Đang cập nhật thêm sản phẩm cùng loại...</p>";
  } else {
    container.innerHTML = html;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let id = loadProductDetail();

  setupButtons();
  if (id) {
    loadRelatedProducts(id);
  }
});
