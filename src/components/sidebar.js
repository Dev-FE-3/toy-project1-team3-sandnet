import './Sidebar.css';  // 사이드바 스타일 import 추가

export default class Sidebar {
  constructor(currentPage = '') {
    this.currentPage = currentPage;
  }

  // 사이드바 HTML 생성
  template() {
    return `
      <div class="sidebar">
        <div class="sidebar-logo">
          <img src="/src/assets/images/logo.png" alt="SandNet Logo">
        </div>
        <ul class="nav-menu">
          <li class="${this.currentPage === 'listing' ? 'active' : ''}">
            <a href="#" data-page="listing">직원목록</a>
          </li>
          <li class="${this.currentPage === 'notice' ? 'active' : ''}">
            <a href="#" data-page="notice">공지사항</a>
          </li>
          <li class="${this.currentPage === 'mypage' ? 'active' : ''}">
            <a href="#" data-page="mypage">마이페이지</a>
          </li>
        </ul>
      </div>
    `;
  }

  // 이벤트 설정
  setEvent(target) {
    // 로고 클릭 이벤트
    const logo = target.querySelector(".sidebar-logo");
    if (logo) {
      logo.addEventListener("click", () => {
        import('../pages/home/home.js').then(module => {
          module.initHome();
        });
      });
    }

    // 네비게이션 이벤트
    const navLinks = target.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const pageName = link.textContent;
        
        switch (pageName) {
          case "직원목록":
            import('../pages/listing/listing.js').then(module => {
              new module.default(document.querySelector("#app"));
            });
            break;
          case "공지사항":
            import('../pages/notice/notice.js').then(module => {
              new module.default(document.querySelector("#app"));
            });
            break;
          case "마이페이지":
            import('../pages/mypage/mypage.js').then(module => {
              new module.default(document.querySelector("#app"));
            });
            break;
          default:
            console.log("Unknown page:", pageName);
        }
      });
    });
  }
} 