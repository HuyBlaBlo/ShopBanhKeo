//SAN PHAM
function createProductCard(id, product) {
  return `
    <div class="card_sp col-6 col-md-4 col-lg-3 mb-5">
        <div class="hinh_sp card m-2 h-100 d-flex flex-column shadow-sm border-0" data-id="${id}" style="cursor:pointer;">
            <img class="card-img-top" src="${product.image}" alt="${product.name}" style="height: 200px; object-fit: cover;">
            <div class="khung_card card-body d-flex flex-column">
                <div class="nd text-center mt-auto mb-3">
                    <h6 class="fw-bold text-truncate" title="${product.name}">${product.name}</h6>
                    <p class="text-danger fw-bold fs-5 mb-0">${product.price.toLocaleString("vi-VN")}đ</p>
                </div>
                <button class="dat btn btn-danger w-100 mb-2 py-2 fw-bold" type="button">Mua Ngay</button>
                <button class="them btn btn-outline-warning w-100 py-2 fw-bold text-dark" type="button">Thêm giỏ hàng</button>
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

  const indexContainer = document.getElementById("index-products-container");
  for (let id in productData) {
    const product = productData[id];
    const cardHTML = createProductCard(id, product);

    let categoryPrefix = id.split("-")[0];

    if (containers[categoryPrefix]) {
      containers[categoryPrefix].innerHTML += cardHTML;
    }

    // CHI LAY 8 CAI
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
    allSections.forEach((el) => (el.style.display = "flex"));
    allLists.forEach((el) => (el.style.display = "flex"));
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
