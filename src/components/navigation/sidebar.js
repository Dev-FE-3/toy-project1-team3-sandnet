import styles from './sidebar.module.css'; // CSS 모듈 import 추가
import { handleRouting, getRoute } from '@/app/router/router';
import logo from '@/assets/images/logo.png'; // 로고 이미지 import

export default class Sidebar {
  constructor(target) {
    this.target = target;
    this.currentPage = window.location.pathname.replace('/', '') || 'profile';
    this.render();
    this.setEvent(target);
  }

  // 사이드바 HTML 생성
  template() {
    return `
      <div class="${styles.sidebar}">
        <div data-link="/" data-role="sidebar-logo" class="${styles.sidebarLogo}">
          <img src="${logo}" alt="SandNet">
        </div>
        <ul class="${styles.navMenu}">
          <li data-page="listing" class="link">
            <a href="#" data-link="listing">직원목록</a>
          </li>
          <li data-page="notice" class="link">
            <a href="#" data-link="notice">공지사항</a>
          </li>
          <li data-page="mypage" class="link">
            <a href="#" data-link="mypage">마이페이지</a>
          </li>
        </ul>
      </div>
    `;
  }

  updateActiveMenu() {
    const currentPath = window.location.pathname.replace('/', '') || 'home';
    const menuItems = document.querySelectorAll('.link');

    menuItems.forEach((item) => {
      const itemPath = item.querySelector('a').getAttribute('data-link');
      if (itemPath === currentPath) {
        item.classList.add(styles.active);
      } else {
        item.classList.remove(styles.active);
      }
    });
  }

  setEvent(target) {
    const logo = document.querySelector("[data-role='sidebar-logo']");
    if (logo) {
      logo.addEventListener('click', () => {
        window.history.pushState({}, '', '/');
        handleRouting();
        this.currentPage = 'home';
        this.updateActiveMenu();
      });
    }

    const links = document.querySelectorAll('.link');

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        const path =
          e.target.tagName.toLowerCase() === 'li'
            ? e.target.querySelector('a').getAttribute('data-link')
            : e.target.getAttribute('data-link');

        window.history.pushState({}, '', `/${path}`);
        handleRouting();

        // 활성 메뉴 업데이트
        this.currentPage = path;
        this.updateActiveMenu();
      });
    });

    // 브라우저 뒤로가기/앞으로가기 처리
    window.addEventListener('popstate', () => {
      this.currentPage = window.location.pathname.replace('/', '') || 'home';
      this.updateActiveMenu();
    });
  }

  render() {
    this.target.innerHTML = this.template();
  }
}
