// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(id, name, price, image) {
    // 1. Lấy giỏ hàng hiện tại từ localStorage (nếu chưa có thì tạo mảng rỗng)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 2. Kiểm tra xem sản phẩm đã có trong giỏ chưa
    let existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        // Nếu có rồi thì tăng số lượng
        existingItem.quantity += 1;
    } else {
        // Nếu chưa có thì thêm mới vào mảng
        cart.push({ id: id, name: name, price: price, image: image, quantity: 1 });
    }

    // 3. Lưu mảng ngược lại vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // 4. Cập nhật số lượng trên icon góc phải
    updateCartCount();

    // Thông báo cho người dùng biết
    alert(`Đã thêm "${name}" vào giỏ hàng!`);
}

// Hàm cập nhật số lượng trên icon giỏ hàng ở Header
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    // Tính tổng số lượng của tất cả sản phẩm
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Tìm thẻ hiển thị số lượng và cập nhật
    let countBadge = document.getElementById('cart-count');
    if (countBadge) {
        countBadge.innerText = totalItems;
    }
}

// Luôn chạy hàm cập nhật số lượng khi trang vừa load xong
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});