var modal = document.getElementById("myModal");
var btn = document.getElementById("openModal");
var span = document.getElementsByClassName("close")[0];

// 모달 열기
btn.onclick = function () {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
};

// 모달 닫기
span.onclick = function () {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
};

// 모달 외부 클릭 시 닫기
window.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
};
