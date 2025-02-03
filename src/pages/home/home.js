import styles from './home.module.css';

export default class Home {
  constructor(target) {
    this.target = target;
  }

  template() {
    return `
      <main class="main-content">
        <header>
        </header>
        <section class="my-content green-border">
          <div class="${styles.content}">
            <h2 class="${styles.welcomeTitle}">SANDNET에 오신 것을 환영합니다</h2>
            <div class="${styles.dashboard}">
              <article class="${styles.dashboardItem}">
                <i class="fas fa-store"></i>
                <h3>매장 수</h3>
                <p>125개</p>
                <span class="${styles.trend}">전월 대비 +3개 매장</span>
              </article>
              <article class="${styles.dashboardItem}">
                <i class="fas fa-users"></i>
                <h3>전체 직원</h3>
                <p>1,580명</p>
                <span class="${styles.trend}">가맹점 포함</span>
              </article>
              <article class="${styles.dashboardItem}">
                <i class="fas fa-bell"></i>
                <h3>신규 공지</h3>
                <p>3건</p>
              </article>
            </div>
            <div class="${styles.roleSelectionContainer}">
              <div class="${styles.userSelection}">
                <select class="${styles.userSelect}">
                  <option value="user1">안샌드</option>
                  <option value="user2">장샌드</option>
                  <option value="user3">이샌드</option>
                  <option value="user4">최샌드</option>
                </select>
                <p>유저를 선택하세요</p>
              </div>
              <div class="${styles.roleSelection}">
                <button class="${styles.roleButton}" data-role="admin">관리자</button>
                <button class="${styles.roleButton}" data-role="user">사용자</button>
              </div>
              <p>유형을 선택하세요</p>
            </div>
          </div>
        </section>

      </main>
    `;
  }

  setEvent() {
    this.roleCheck();
    this.userCheck();
    this.roleClickEvent();
    this.userChangeEvent();
  }

  roleCheck() { // 기존 선택 권한 확인(admin || user)
    const roleButtons = document.querySelectorAll(`.${styles.roleButton}`);
    const savedRole = sessionStorage.getItem('currentRole');
    if (savedRole) {
        roleButtons.forEach(button => {
            if (button.getAttribute('data-role') === savedRole) {
                button.classList.add(styles.active);
            }
        });
    }
  }
  userCheck() { // 기존 선택 유저 확인
    const userSelect = this.target.querySelector(`.${styles.userSelect}`);
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      userSelect.value = savedUser;
    }else {
      sessionStorage.setItem('currentUser', 'user1'); 
    }
  }

  roleClickEvent() { // 권한 클릭 이벤트
    const roleSelection = this.target.querySelector(`.${styles.roleSelection}`);
    roleSelection.addEventListener('click', (e) => {
      {
        if (e.target.classList.contains(styles.roleButton)) {
          roleSelection.querySelector(`.${styles.active}`)?.classList.remove(styles.active); //선택된 버튼의 'active' 클래스 제거
          e.target.classList.add(styles.active); //
          const selectedRole = e.target.getAttribute('data-role');
          sessionStorage.setItem('currentRole', selectedRole); // 세션 스토리지에 저장
        }
      }
    });
  }

  userChangeEvent() { // 유저 변경 이벤트
    const userSelect = this.target.querySelector(`.${styles.userSelect}`);
    userSelect.addEventListener('change', (e) => {
      const selectedUser = e.target.value;
      sessionStorage.setItem('currentUser', selectedUser); // 세션 스토리지에 저장
    });
  }
}
