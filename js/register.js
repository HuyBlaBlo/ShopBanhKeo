// Đợi trang load xong rồi mới xử lý
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnGoogle").addEventListener("click", function () {
        alert("Đăng nhập Google (demo)");
    });

    document.getElementById("btnFacebook").addEventListener("click", function () {
        alert("Đăng nhập Facebook (demo)");
    });

    // Gắn sự kiện submit cho form
    document.getElementById("formRegister").addEventListener("submit", function (e) {
    e.preventDefault(); // chặn reload trang khi submit

    if (kiemTraForm()) {
      alert("Đăng ký thành công!");
    }
  });

  document.getElementById("username").addEventListener("blur", kiemTraUsername);
  document.getElementById("password").addEventListener("blur", kiemTraPassword);
  document.getElementById("repassword").addEventListener("blur", kiemTraRePassword);
  document.getElementById("ho").addEventListener("blur", kiemTraHo);
  document.getElementById("ten").addEventListener("blur", kiemTraTen);
  document.getElementById("ngaysinh").addEventListener("blur", kiemTraNgaySinh);
  document.getElementById("diachi").addEventListener("blur", kiemTraDiaChi);
  document.getElementById("sdt").addEventListener("blur", kiemTraSDT);
  document.getElementById("email").addEventListener("blur", kiemTraEmail);
});


//KIEM TRA USERNAME
function kiemTraUsername() {
  let u = document.getElementById("username").value.trim();

  document.getElementById("errUsername").innerHTML =
    u !== ""
      ? "<span class='text-success'>OK</span>"
      : "<span class='text-danger'>Không được bỏ trống</span>";

  return u != "";
}


//KIEM TRA PASSWORD
function kiemTraPassword() {
  let p = document.getElementById("password").value.trim();
  let regex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9])\S{12,}$/;
  
  document.getElementById("errPassword").innerHTML =
    regex.test(p)
      ? "<span class='text-success'>OK</span>"
      : "<span class='text-danger'>Mật khẩu phải có ít nhất 12 ký tự, không khoảng trắng, có chữ hoa và ký tự đặc biệt</span>";

  return regex.test(p);
}


//KIEM TRA RE-PASSWORD
function kiemTraRePassword() {
  let p = document.getElementById("password").value;
  let rp = document.getElementById("repassword").value;

  document.getElementById("errRepassword").innerHTML =
    p == rp && rp != ""
      ? "<span class='text-success'>OK</span>"
      : "<span class='text-danger'>Không trùng mật khẩu</span>";

  return p == rp && rp != "";
}

//KIEM TRA HO
function kiemTraHo() {
  let ho = document.getElementById("ho").value.trim();

  let mauHo = /^[A-Z][a-z]*$/;

  document.getElementById("errHo").innerHTML = mauHo.test(ho)
    ? "<span class='text-success'>OK</span>"
    : "<span class='text-danger'>Họ phải viết hoa chữ cái đầu</span>";

  return mauHo.test(ho);
}

//KIEM TRA TEN
function kiemTraTen() {
  let ten = document.getElementById("ten").value.trim();

  let mauTen = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;

  document.getElementById("errTen").innerHTML = mauTen.test(ten)
    ? "<span class='text-success'>OK</span>"
    : "<span class='text-danger'>Mỗi từ phải viết hoa chữ cái đầu</span>";

  return mauTen.test(ten);
}

//KIEM TRA NGAY SINH
function kiemTraNgaySinh() {
  let ns = new Date(document.getElementById("ngaysinh").value);
  let tuoi = new Date().getFullYear() - ns.getFullYear();

  if (!document.getElementById("ngaysinh").value) {
  document.getElementById("errNgaySinh").innerHTML =
    "<span class='text-danger'>Không được bỏ trống</span>";
  return false;
  }

  document.getElementById("errNgaySinh").innerHTML =
    tuoi >= 16
      ? "<span class='text-success'>OK</span>"
      : "<span class='text-danger'>Phải >= 16 tuổi</span>";

  return tuoi >= 16;
}


//KIEM TRA GIOI TINH
function kiemTraGender() {
  let checked = document.querySelector('input[name="gender"]:checked');
  
  document.getElementById("errGender").innerHTML =
    checked
      ? "<span class='text-success'>OK</span>"
      : "<span class='text-danger'>Phải chọn giới tính</span>";

  return checked != null;
}


//KIEM TRA DIA CHI
function kiemTraDiaChi() {
  let dc = document.getElementById("diachi").value.trim();

  document.getElementById("errDiaChi").innerHTML =
    dc !== ""
      ? "<span class='text-success'>OK</span>"
      : "<span class='text-danger'>Không được bỏ trống</span>";

  return dc !== "";
}


//KIEM TRA SDT
function kiemTraSDT() {
  let sdt = document.getElementById("sdt").value.trim();
  let regex = /^(03|07|08|09)\d{8}$/;

  document.getElementById("errSDT").innerHTML =
    regex.test(sdt)
      ? "<span class='text-success'>OK</span>"
      : "<span class='text-danger'>10 số, bắt đầu bằng 03|07|08|09</span>";

  return regex.test(sdt);
}


//KIEM TRA EMAIL
function kiemTraEmail() {
  let email = document.getElementById("email").value.trim();
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  document.getElementById("errEmail").innerHTML =
    regex.test(email)
      ? "<span class='text-success'>OK</span>"
      : "<span class='text-danger'>Email không hợp lệ</span>";

  return regex.test(email);
}


//KIEM TRA FORM
function kiemTraForm() {
  return (
    kiemTraUsername() &&
    kiemTraPassword() &&
    kiemTraRePassword() &&
    kiemTraHo() &&
    kiemTraTen() &&
    kiemTraNgaySinh() &&
    kiemTraGender() &&
    kiemTraDiaChi() &&
    kiemTraSDT() &&
    kiemTraEmail()
  );
}