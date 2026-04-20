let cart = [];

window.onload = function () {
  let savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
  renderCart();
};

// uopdate lại toàn bộ giao diện giỏ hàng
function renderCart() {
  let container = document.getElementById("cart-items-container");
  let subtotalEl = document.getElementById("subtotal");
  let totalEl = document.getElementById("total");
  let countEl = document.getElementById("cart-count");

  // Nếu giỏ hàng trống
  if (cart.length === 0) {
    container.innerHTML =
      '<div class="p-4 text-center text-muted">Giỏ hàng của bạn đang trống</div>';
    subtotalEl.innerText = "0đ";
    totalEl.innerText = "0đ";
    countEl.innerText = "0";

    // cập nhật lại số đếm trên icon giỏ hàng
    if (typeof updateCartBadge === "function") updateCartBadge();
    return;
  }

  let html = "";
  let totalPrice = 0;
  let totalItems = 0;

  // Vòng lặp in từng sản phẩm
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    let itemTotal = item.price * item.quantity;

    totalPrice += itemTotal;
    totalItems += item.quantity;

    html += `
            <div class="d-flex flex-column flex-md-row align-items-center p-3 border-bottom position-relative">
              <button class="btn btn-link text-danger p-0 position-absolute top-0 end-0 mt-3 me-3 d-md-none" onclick="removeItem(${i})">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
              
              <div class="col-12 col-md-5 d-flex align-items-center mb-3 mb-md-0">
                <img src="${item.image}" alt="${item.name}" class="img-fluid rounded border" style="width: 80px; height: 80px; object-fit: cover;">
                <div class="ms-3">
                  <a href="product-detail.html?id=${item.id}" class="text-decoration-none text-dark fw-bold mb-1 d-block">${item.name}</a>
                  <small class="text-muted">${item.variant || "Mặc định"}</small>
                </div>
              </div>
              
              <div class="col-12 col-md-2 text-md-center mb-2 mb-md-0 fw-medium">
                <span class="d-md-none text-muted small">Đơn giá: </span>${item.price.toLocaleString("vi-VN")}đ
              </div>
              
              <div class="col-12 col-md-3 d-flex justify-content-md-center mb-2 mb-md-0">
                <span class="d-md-none text-muted small me-2 align-self-center">Số lượng: </span>
                <div class="input-group input-group-sm" style="width: 110px">
                  <button class="btn btn-outline-secondary" type="button" onclick="changeQuantity(${i}, -1)">−</button>
                  <input type="text" class="form-control text-center border-secondary" value="${item.quantity}" readonly />
                  <button class="btn btn-outline-secondary" type="button" onclick="changeQuantity(${i}, 1)">+</button>
                </div>
              </div>
              
              <div class="col-12 col-md-2 text-md-end text-danger fw-bold">
                <span class="d-md-none text-muted small fw-normal">Thành tiền: </span>${itemTotal.toLocaleString("vi-VN")}đ
                <button class="btn btn-link text-muted p-0 ms-2 d-none d-md-inline" type="button" onclick="removeItem(${i})">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 1a.5.5 0 0 0-.5.5v1h6V1.5a.5.5 0 0 0-.5-.5h-5z"/>
                  </svg>
                </button>
              </div>
            </div>
          `;
  }
  // update html và số tiền
  container.innerHTML = html;
  subtotalEl.innerText = totalPrice.toLocaleString("vi-VN") + "đ";
  totalEl.innerText = totalPrice.toLocaleString("vi-VN") + "đ";
  countEl.innerText = totalItems;

  // cập nhật lại số đếm trên icon giỏ hàng
  if (typeof updateCartBadge === "function") updateCartBadge();
}

// 4. Hàm thay đổi số lượng (+ / -)
function changeQuantity(index, change) {
  let newQuantity = cart[index].quantity + change;

  // Không cho phép số lượng nhỏ hơn 1
  if (newQuantity >= 1) {
    cart[index].quantity = newQuantity;
    saveCart(); // Lưu thay đổi vào bộ nhớ
    renderCart(); // Vẽ lại giao diện
  }
}

// 5. Hàm xóa 1 sản phẩm khỏi mảng
function removeItem(index) {
  // Cắt bỏ 1 phần tử tại vị trí index
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

// 6. Hàm lưu giỏ hàng vào HTML5 LocalStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
