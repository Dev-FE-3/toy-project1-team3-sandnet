import MyPage from "./mypage/mypage.js";
import NoitcePage from "./notice/notice.js";
import ListingPage from "./listing/listing.js";
import "../../reset.css"
import "../styles/variables.css";
import "../styles/global.css";

function initNavigation() {
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const pageName = link.textContent;
      switch (pageName) {
        case "홈":
          initHome();
          break;
        case "마이페이지":
          new MyPage(document.querySelector("#app"));
          break;
        // 다른 페이지들도 여기에 추가 가능
        case '공지사항':
          new NoitcePage(document.querySelector('#app'));
          break;
        case "직원목록":
          new ListingPage(document.querySelector('#app'));
          break;
        default:
          console.log("default");
      }
    });
  });
}

export function initHome() {
  // 홈 페이지 HTML 렌더링
  document.querySelector("#app").innerHTML = `
    <body>
      <div class="page-container">
        <div class="sidebar">
          <div class="sidebar-logo">
            <img src="/src/assets/images/logo.png" alt="SandNet Logo">
          </div>
          <ul class="nav-menu">
            <li><a href="#">홈</a></li>
            <li><a href="#">직원목록</a></li>
            <li><a href="#">공지사항</a></li>
            <li><a href="#">마이페이지</a></li>
          </ul>
        </div>
      </div>
        
    </body>
  `;

  // 네비게이션 초기화
  initNavigation();
}
