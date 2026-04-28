// Đợi trang load xong rồi mới xử lý
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnGoogle").addEventListener("click", function () {
        alert("Đăng nhập Google (demo)");
    });

    document.getElementById("btnFacebook").addEventListener("click", function () {
        alert("Đăng nhập Facebook (demo)");
    });

  // Gắn sự kiện submit cho form
    document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // chặn reload trang khi submit

    if (kiemTraForm()) {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let found = users.find(u => u.email === email && u.password === password);

    if (found) {
      alert("Đăng nhập thành công!");

      localStorage.setItem("currentUser", JSON.stringify(found));
      window.location.href = "index.html";
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  }
});

    document.getElementById("email").addEventListener("blur", kiemTraEmail);
    document.getElementById("password").addEventListener("blur", kiemTraMatKhau);
});

//KIỂM TRA EMAIL
function kiemTraEmail() {
  let email = document.getElementById("email").value.trim();
  let mauEmail = /^[A-Za-z0-9]+@[A-Za-z]{4,}\.[A-Za-z]{2,}$/;

  //kiểm tra rỗng
  if (email == "") {
    document.getElementById("emailError").innerHTML =
      "<span class='text-danger'>Không được bỏ trống</span>";
    return false;
  }

  document.getElementById("emailError").innerHTML = mauEmail.test(email)
    ? "<span class='text-success'>OK</span>"
    : "<span class='text-danger'>Email không hợp lệ</span>";

  return mauEmail.test(email);
}

//KIỂM TRA MẬT KHẨU
function kiemTraMatKhau() {
  let password = document.getElementById("password").value.trim();
  let mauMatKhau = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])\S{12,}$/;

  if (password == "") {
    document.getElementById("passwordError").innerHTML =
      "<span class='text-danger'>Không được bỏ trống</span>";
    return false;
  }

  document.getElementById("passwordError").innerHTML =
     mauMatKhau.test(password)
      ? "<span class='text-success'>OK</span>"
      : "<span class='text-danger'>Mật khẩu phải có ít nhất 12 ký tự, không khoảng trắng, có chữ hoa và ký tự đặc biệt</span>";

  return mauMatKhau.test(password);
}

//KIỂM TRA FORM
function kiemTraForm() {
  let kq = kiemTraEmail() && kiemTraMatKhau();
  return kq;
}