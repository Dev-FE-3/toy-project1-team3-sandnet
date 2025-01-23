import styles from './Sidebar.module.css'; // CSS 모듈 import 추가
import { handleRouting, getRoute } from '@/app/router/router';
import logo from '@/assets/images/logo.png'; // 로고 이미지 import

export default class Sidebar {
  constructor(target) {
    this.target = target;
  }

  // 사이드바 HTML 생성
  template() {
    return `
      <div class="${styles.sidebar}">
        <div data-link="/" data-role="sidebar-logo" class="${styles.sidebarLogo}">
          <img src="${logo}" alt="SANDNET">
        </div>
        <ul class="${styles.navMenu}">
          
          <li class="${this.currentPage === 'profile' ? styles.active : ''} link">
            <a href="#" data-link="profile">프로필</a>
          </li>
          <li class="${this.currentPage === 'listing' ? styles.active : ''} link">
            <a href="#" data-link="listing">직원목록</a>
          </li>
          <li class="${this.currentPage === 'notice' ? styles.active : ''} link">
            <a href="#" data-link="notice">공지사항</a>
          </li>
          <li class="${this.currentPage === 'mypage' ? styles.active : ''} link">
            <a href="#" data-link="mypage">마이페이지</a>
          </li>
        </ul>
      </div>
    `;
  }

  // 이벤트 설정
  setEvent(target) {
    // 로고 클릭 이벤트
    const logo = document.querySelector("[data-role='sidebar-logo']");
    if (logo) {
      logo.addEventListener('click', () => {
        window.history.pushState({}, '', '/');
        handleRouting();
      });
    }

    // 페이지 이동
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

        // 활성 메뉴 표시 업데이트
        // const menuItems = target.querySelectorAll('.nav-menu li');
        // menuItems.forEach(item => item.classList.remove('active'));
        // e.target.closest('li').classList.add('active');
      });
    });

    // 네비게이션 이벤트
    // const navLinks = target.querySelectorAll("[data-link]");
    // navLinks.forEach(link => {
    //   link.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     const path = e.target.getAttribute('href');
    //     router.navigate(path);

    //     // 활성 메뉴 표시 업데이트
    //     const menuItems = target.querySelectorAll('.nav-menu li');
    //     menuItems.forEach(item => item.classList.remove('active'));
    //     e.target.closest('li').classList.add('active');
    //   });
    // });
  }
}
