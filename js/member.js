function kiemTraTen() {
  let ten = document.getElementById("txtHoTen").value.trim();
  let mauTen = /^[A-Z][a-z]*(\s[A-Z][a-z]*)+$/;
  document.getElementById("errHoTen").innerHTML = mauTen.test(ten)
    ? "<span class='text-success'>OK</span>"
    : "<span class='text-danger'>Họ tên phải viết hoa chữ cái đầu mỗi từ</span>";
  return mauTen.test(ten);
}

function kiemTraSoDT() {
  let sdt = document.getElementById("txtSoDT").value.trim();
  let mauSoDT = /^0\d{9}$/;
  document.getElementById("errSoDT").innerHTML = mauSoDT.test(sdt)
    ? "<span class='text-success'>OK</span>"
    : "<span class='text-danger'>Số điện thoại phải có 10 số và bắt đầu bằng 0</span>";
  return mauSoDT.test(sdt);
}

function kiemTraEmail() {
  let email = document.getElementById("txtEmail").value.trim();
  let mauEmail = /^[A-Za-z0-9]+@[A-Za-z]{4,}\.[A-Za-z]{2,}$/;
  document.getElementById("errEmail").innerHTML = mauEmail.test(email)
    ? "<span class='text-success'>OK</span>"
    : "<span class='text-danger'>Email phải đúng định dạng và có đuôi @gmail.com</span>";
  return mauEmail.test(email);
}

// function kiemTraTuoi() {
//   let ns = document.getElementById("txtNgaySinh").value;
//   let ngaySinh = new Date(ns);
//   let today = new Date();
//   let tuoi = today.getFullYear() - ngaySinh.getFullYear();

//   let thang = today.getMonth() - ngaySinh.getMonth();
//   if (
//     thang < 0 ||
//     (thang === 0 && today.getDate() < ngaySinh.getDate())
//   ) {
//     tuoi--;
//   }

//   document.getElementById("errNgaySinh").innerHTML =
//     tuoi >= 18
//       ? "<span class='text-success'>OK</span>"
//       : "<span class='text-danger'>Phải từ 18 tuổi trở lên</span>";
//   return tuoi >= 18;
// }

function kiemTraTuoi() {
  let ns = document.getElementById("txtNgaySinh").value;
  let ngaySinh = new Date(ns);
  let today = new Date();
  let tuoi = today.getFullYear() - ngaySinh.getFullYear();

  document.getElementById("errNgaySinh").innerHTML =
    tuoi >= 16
      ? "<span class='text-success'>OK</span>"
      : "<span class='text-danger'>Phải từ 16 tuổi trở lên</span>";

  return tuoi >= 16;
}

function kiemTraDiaChi() {
  let diaChi = document.getElementById("txtDiaChi").value.trim();
  let mauDiaChi = /^[A-Z0-9][A-Za-z0-9\s,./-]*$/;
  document.getElementById("errDiaChi").innerHTML = mauDiaChi.test(diaChi)
    ? "<span class='text-success'>OK</span>"
    : "<span class='text-danger'>Địa chỉ phải bắt đầu bằng chữ hoa hoặc số</span>";
  return mauDiaChi.test(diaChi);
}

function kiemTraHang() {
  let hang = document.getElementById("slHang").value;
  document.getElementById("errHang").innerHTML =
    hang != "Chọn hạng thành viên"
      ? "<span class='text-success'>OK</span>"
      : "<span class='text-danger'>Phải chọn hạng thành viên</span>";
  return hang != "Chọn hạng thành viên";
}

function kiemTraDongY() {
  let dongY = document.getElementById("agree").checked;
  document.getElementById("errDongY").innerHTML = dongY
    ? "<span class='text-success'>OK</span>"
    : "<span class='text-danger'>Bạn phải đồng ý với chính sách</span>";
  return dongY;
}

function kiemTraForm() {
  let kq =
    kiemTraTen() &&
    kiemTraSoDT() &&
    kiemTraEmail() &&
    kiemTraTuoi() &&
    kiemTraDiaChi() &&
    kiemTraHang() &&
    kiemTraDongY();

  if (kq == true) {
    alert("Đăng ký thành viên thành công!");
  }

  return kq;
}
