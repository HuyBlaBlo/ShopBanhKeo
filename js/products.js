//SAN PHAM VA SALE
function createProductCard(id, product) {
  let priceHTML = `
    <div class="mb-2">
      <p class="text-danger fw-bold fs-5 mb-0">${product.price.toLocaleString("vi-VN")}đ</p>
    </div>
  `;
  let badgeHTML = "";

  if (product.oldPrice && product.oldPrice > product.price) {
    let discountPercent = Math.round(
      (1 - product.price / product.oldPrice) * 100,
    );

    priceHTML = `
      <div class="mb-2">
        <p class="text-muted text-decoration-line-through mb-0" style="font-size: 0.85rem;">${product.oldPrice.toLocaleString("vi-VN")}đ</p>
        <p class="text-danger fw-bold fs-5 mb-0">${product.price.toLocaleString("vi-VN")}đ</p>
      </div>
    `;
    badgeHTML = `<span class="badge bg-danger position-absolute top-0 start-0 m-2 shadow-sm">-${discountPercent}%</span>`;
  }

  return `
    <div class="card_sp col-6 col-md-4 col-lg-3 mb-5">
        <div class="hinh_sp card m-2 h-100 d-flex flex-column shadow-sm border-0 position-relative" data-id="${id}" style="cursor:pointer;">
            ${badgeHTML}
            <img class="card-img-top p-2" src="${product.image}" alt="${product.name}" style="height: 200px; object-fit: cover; border-radius: 12px;">
            <div class="khung_card card-body d-flex flex-column">
                <div class="nd text-center mt-auto mb-3">
                    <h6 class="fw-bold text-truncate" title="${product.name}">${product.name}</h6>
                    ${priceHTML}
                </div>
                <button class="dat btn btn-danger w-100 mb-2 py-2 fw-bold text-uppercase" style="font-size: 0.9rem;" type="button">Mua Ngay</button>
                <button class="them btn btn-outline-warning w-100 py-2 fw-bold text-dark text-uppercase" style="font-size: 0.9rem;" type="button">Thêm giỏ hàng</button>
            </div>
        </div>
    </div>
  `;
}

// LAY DU LIEU TU DATA.JS
function renderProducts() {
  const containers = {
    socola: document.getElementById("socola-list"),
    cake: document.getElementById("cake-list"),
    keo: document.getElementById("keo-list"),
    hopqua: document.getElementById("hopqua-list"),
    gioqua: document.getElementById("gioqua-list"),
  };

  const khuyenMaiContainer = document.getElementById("khuyenmai-list");
  const indexContainer = document.getElementById("index-products-container");

  for (let id in productData) {
    const product = productData[id];
    const cardHTML = createProductCard(id, product);

    let categoryPrefix = id.split("-")[0];

    // Đưa vào từng loại tương ứng
    if (containers[categoryPrefix]) {
      containers[categoryPrefix].innerHTML += cardHTML;
    }

    // Nếu có giá cũ lớn hơn giá mới thì thêm vào mục khuyeens  mãi
    if (khuyenMaiContainer && product.oldPrice > product.price) {
      khuyenMaiContainer.innerHTML += cardHTML;
    }

    // Load 8 sản phẩm ra trang chủ
    if (indexContainer && Object.keys(productData).indexOf(id) < 8) {
      indexContainer.innerHTML += cardHTML;
    }
  }
}

function filterCategoryByHash() {
  const hash = window.location.hash;

  const allSections = document.querySelectorAll(".category-section");
  const allLists = document.querySelectorAll(".category-list");

  if (allSections.length === 0 || allLists.length === 0) return;

  if (hash) {
    allSections.forEach((el) => (el.style.display = "none"));
    allLists.forEach((el) => (el.style.display = "none"));

    let targetTitle = document.querySelector(hash);
    let targetList = document.querySelector(hash + "-list");

    if (targetTitle) targetTitle.style.display = "flex";
    if (targetList) targetList.style.display = "flex";
  } else {
    // truong hop bam "san pham" o footer
    allSections.forEach((el) => (el.style.display = "none"));
    allLists.forEach((el) => (el.style.display = "none"));
    // hien thi tat ca tru sale
    const danhMucCoBan = ["#socola", "#cake", "#keo"];

    danhMucCoBan.forEach((id) => {
      let title = document.querySelector(id);
      let list = document.querySelector(id + "-list");

      if (title) title.style.display = "flex";
      if (list) list.style.display = "flex";
    });
  }
}

document.addEventListener("click", function (e) {
  const card = e.target.closest(".hinh_sp");
  if (!card) return;

  const id = card.dataset.id;
  const product = typeof productData !== "undefined" ? productData[id] : null;

  if (!product) return;

  if (e.target.classList.contains("them")) {
    if (typeof addToCart === "function")
      addToCart(id, product.name, product.price, product.image);
  } else if (e.target.classList.contains("dat")) {
    if (typeof addToCart === "function")
      addToCart(id, product.name, product.price, product.image);
    window.location.href = "cart.html";
  } else {
    window.location.href = `product-detail.html?id=${id}`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (typeof productData !== "undefined") {
    renderProducts();
    filterCategoryByHash();
  }
});

window.addEventListener("hashchange", filterCategoryByHash);
