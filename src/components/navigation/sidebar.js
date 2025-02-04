import styles from './sidebar.module.css'; // CSS 모듈 import 추가
import { handleRouting, getRoute } from '@/app/router/router';
import logo from '@/assets/images/logo.png'; // 로고 이미지 import
import Component from '@/components/componentClass';
export default class Sidebar extends Component {
  constructor(target) {
    super(target);
    this.target = target;

    this.setup();
    this.setEvent(target);
  }

  setup() {
    this.state = {
      roleAndUserPath: '/',
      currentPage: window.location.pathname.replace('/', '') || 'profile',
    };
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

  logoInit() {
    //this.targer을 기준으로 검색 - 해당 sidebar 내부에서만 요소를 찾음음
    const logo = this.target.querySelector(`.${styles.sidebarLogo}`);

    if (logo) {
      logo.addEventListener('click', () => {
        window.history.pushState({}, '', '/');
        handleRouting();
        this.setState({
          currentPage: 'home',
        });

        // this.currentPage = 'home';
        this.updateActiveMenu();
      });
    }
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

  checkRoleAndUser() {
    const currentRole = sessionStorage.getItem('currentRole'); // 권한
    const currentUser = sessionStorage.getItem('currentUser'); // 유저
    const { roleAndUserPath } = this.state;

    if (currentRole && currentUser) {
      // 역할에 맞는 경로를 정의하는 객체
      const rolePaths = {
        admin: `${roleAndUserPath}admin`,
        user: `${roleAndUserPath}user`,
      };

      // currentRole에 해당하는 경로를 설정하거나 기본 경로 사용
      const updatedPath = rolePaths[currentRole] || roleAndUserPath;

      // 상태 업데이트
      this.setState({
        roleAndUserPath: updatedPath,
      });

      return true;
    } else {
      alert('권한과 유저 정보를 선택해 주세요.');
      return false; // 권한 또는 유저 정보가 없음
    }
  }

  linkToPage() {
    const navMenu = this.target.querySelector(`.${styles.navMenu}`);

    if (navMenu) {
      navMenu.addEventListener('click', (e) => {
        e.preventDefault();

        const link = e.target.closest('.link');
        if (!link) return; // 클릭한 요소가 .link 내부가 아니면 무시

        const path = link.querySelector('a').getAttribute('data-link');
        if (!path) return;

        if (this.checkRoleAndUser()) {
          let url = '';

          switch (path) {
            case 'listing':
              url = `${this.state.roleAndUserPath}/${path}`;
              break;
            case 'notice':
            case 'mypage':
              url = `/${path}`;
              break;
            default:
          }

          window.history.pushState({}, '', url);
          handleRouting();
        }

        this.currentPage = path;
        this.updateActiveMenu();
      });
    }
  }

  setEvent() {
    this.logoInit();
    this.linkToPage();

    // 브라우저 뒤로가기/앞으로가기 처리
    window.addEventListener('popstate', () => {
      this.currentPage = window.location.pathname.replace('/', '') || 'home';
      this.updateActiveMenu();
    });
  }
}
