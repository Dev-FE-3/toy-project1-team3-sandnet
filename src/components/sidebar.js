import './Sidebar.css';  // 사이드바 스타일 import 추가
import router from '@/app/router/router.js';
import logo from '../assets/images/logo.png';  // 로고 이미지 import

export default class Sidebar {
  constructor(currentPage = '') {
    this.currentPage = currentPage;
  }

  // 사이드바 HTML 생성
  template() {
    return `
      <div class="sidebar">
        <div class="sidebar-logo">
          <img src="${logo}" alt="SANDNET">
        </div>
        <ul class="nav-menu">
          
          <li class="${this.currentPage === 'listing' ? 'active' : ''}">
            <a href="/listing" data-link>직원목록</a>
          </li>
          <li class="${this.currentPage === 'notice' ? 'active' : ''}">
            <a href="/notice" data-link>공지사항</a>
          </li>
          <li class="${this.currentPage === 'mypage' ? 'active' : ''}">
            <a href="/mypage" data-link>마이페이지</a>
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
        router.navigate('/');
      });
    }

    // 네비게이션 이벤트
    const navLinks = target.querySelectorAll("[data-link]");
    navLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const path = e.target.getAttribute('href');
        router.navigate(path);
        
        // 활성 메뉴 표시 업데이트
        const menuItems = target.querySelectorAll('.nav-menu li');
        menuItems.forEach(item => item.classList.remove('active'));
        e.target.closest('li').classList.add('active');
      });
    });
  }
} 