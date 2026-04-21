// 1. tạo ra thẻ sản phẩm dựa trên data
function createProductCard(id, product) {
  return `
        <div class="card_sp col-6 col-md-4 col-lg-3 mb-5">
            <div class="hinh_sp card m-2 h-100 d-flex flex-column" data-id="${id}">
                <img class="card-img-top" src="${product.image}" alt="${product.name}">
                <div class="khung_card card-body">
                    <div class="nd text-center mt-auto">
                        <h5>${product.name}</h5>
                        <p classs="text-danger fs-5">Giá: ${product.price.toLocaleString("vi-VN")} VNĐ</p>
                    </div>
                    <button class="dat border border-0" type="button">Đặt hàng</button>
                    <button class="them border border-0" type="button">Thêm giỏ hàng</button>
                </div>
            </div>
        </div>
    `;
}

// hàm vẽ sản phẩm lên màn hình dựa trên loại
function renderProducts() {
  const socolaContainer = document.getElementById("socola-list");
  const cakeContainer = document.getElementById("cake-list");
  const keoContainer = document.getElementById("keo-list");
  const indexContainer = document.getElementById("index-products-container");

  for (let id in productData) {
    const product = productData[id];
    const cardHTML = createProductCard(id, product);

    // Nếu đang ở trang products, phân loại theo id
    if (id.startsWith("socola") && socolaContainer) {
      socolaContainer.innerHTML += cardHTML;
    } else if (id.startsWith("cake") && cakeContainer) {
      cakeContainer.innerHTML += cardHTML;
    } else if (id.startsWith("keo") && keoContainer) {
      keoContainer.innerHTML += cardHTML;
    }

    // Nếu ở trang  index chỉ lấy 8 sp noi bataj
    if (indexContainer && Object.keys(productData).indexOf(id) < 8) {
      indexContainer.innerHTML += cardHTML;
    }
  }
}

//  Xử lý click
document.addEventListener("click", function (e) {
  const card = e.target.closest(".hinh_sp");
  if (!card) return;

  const id = card.dataset.id;
  const product = productData[id];

  // them vaof gior hang
  if (e.target.classList.contains("them")) {
    addToCart(id, product.name, product.price, product.image);
  }
  // Trường hợp bấm nút đặt hàng
  else if (e.target.classList.contains("dat")) {
    addToCart(id, product.name, product.price, product.image);
    window.location.href = "cart.html";
  }
  // Trường hợp bấm vào xewm chi tiết
  else {
    window.location.href = `product-detail.html?id=${id}`;
  }
});
// luon bật
document.addEventListener("DOMContentLoaded", renderProducts);
