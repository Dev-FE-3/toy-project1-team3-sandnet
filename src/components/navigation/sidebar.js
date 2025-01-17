import styles from './sidebar.module.css';
import { renderController } from '@/libs/renderController';
import handleRouting from '@/main';

class Component {
  constructor(target) {
    this.target = target;
    // this.setup();
  }

  setup() {}
  template() { return ''; }
  setEvent() {}
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.setEvent();
  }
}

class Sidebar extends Component {
  setup() {
    // this.state = {
    //   employees: [
    //     {
    //       id: 1,
    //       image: "https://avatars.githubusercontent.com/u/113437204?v=4",
    //       name: "안요셉",
    //       phone: "010-1234-5678",
    //       email: "yosep@gmail.com",
    //       branch: "1",
    //       rank: "Leader"
    //     },
    //     // 더 많은 데이터...
    //   ],
    //   searchText: '',
    //   currentPage: 1
    // };
  }

  template() {
    return `
      <aside class="${styles.sidebar}">
        <nav>
          <div class="${styles.logoContainer}">
            <p>
              <span class="${styles.breadColor}">S</span><span class="${styles.gradientText}">ANDNA</span><span class="${styles.breadColor}">T</span>
            </p>
          </div>
          <ul>
            <li>
              <a href="#" id="profileMenu"class="${styles.menuItem}">
                <i class="fa fa-fw fa-money-bill" aria-hidden="true"></i>
                <span class="menu-name">프로필</span>
              </a>
              <ul class="${styles.submenu}">
                <li>
                  <div class="${styles.submenuItem}">
                    <a href="#earnings">Earnings</a>
                  </div>
                </li>
                <li>
                  <div class="${styles.submenuItem}">
                    <a href="#refunds">Refunds</a>
                  </div>
                </li>
                <li>
                  <div class="${styles.submenuItem}">
                    <a href="#declines">Declines</a>
                  </div>
                </li>
                <li>
                  <div class="${styles.submenuItem}">
                    <a href="#payouts">Payouts</a>
                  </div>
                </li>
              </ul>
            </li>
            <li>
              <a href="#staff-list" class="${styles.menuItem}">
                <i class="fa-solid fa-user"></i>
                <span class="menu-name">Staff List</span>
              </a>
            </li>
          </ul>
          <div class="${styles.themeToggleContainer}">
            <label class="${styles.switch}">
              <input type="checkbox" id="${styles.themeToggle}" />
              <span class="${styles.slider} ${styles.round}">
                <span class="${styles.adminText} ${styles.active}">Admin</span>
                <span class="${styles.userText}">User</span>
              </span>
            </label>
          </div>
        </nav>
      </aside>
    `;
  }

  setEvent() {
    document.querySelector(`#profileMenu`).addEventListener('click', (e) => {
      e.preventDefault();
      // /profile로 이동
      window.history.pushState({}, '', '/profile');
      handleRouting();
      console.log("Sidebar ~ document.querySelector ~ handleRouting: ")
      
      // renderController('/profile', document.querySelector('#app'));
    });
  }
}

// 앱 실행
new Sidebar(document.querySelector('#app'));

export default Sidebar; 