import MyPage from "./mypage/mypage.js";
import NoitcePage from "./notice/notice.js";
import ListingPage from "./listing/listing.js";

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
          new NoticePage(document.querySelector('#app'));
          break;
        case "회원목록":
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
      <header></header>
      <div class="sidebar">
        <nav>
          <ul class="nav-menu">
            <li><a href="#">홈</a></li>
            <li><a href="#">마이페이지</a></li>
            <li><a href="#">공지사항</a></li>
            <li><a href="#">회원목록</a></li>
          </ul>
        </nav>
      </div>
      <main>
        <!-- 홈 페이지 컨텐츠 -->
      </main>
    </body>
  `;

  // 네비게이션 초기화
  initNavigation();
}
