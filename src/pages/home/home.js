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
                  <option value="장샌드">장샌드</option>
                  <option value="최샌드">최샌드</option>
                  <option value="안샌드">안샌드</option>
                  <option value="이샌드">이샌드</option>
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
    // 계정 권한 선택(admin || user)
    const roleButtons = document.querySelectorAll(`.${styles.roleButton}`);

    roleButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        // 모든 버튼에서 'active' 클래스 제거
        roleButtons.forEach((btn) => btn.classList.remove(styles.active));

        // 클릭한 버튼에 'active' 클래스 추가
        e.target.classList.add(styles.active);

        const selectedRole = e.target.getAttribute('data-role');
        console.log(
          'Home ~ button.addEventListener ~ selectedRole: ',
          selectedRole,
          e.target.textContent,
        );
        sessionStorage.setItem('currentRole', selectedRole); // 세션 스토리지에 저장
      });
    });

    // 유저 선택
    const userSelect = document.querySelector(`.${styles.userSelect}`);

    userSelect.addEventListener('change', (e) => {
      const selectedUser = e.target.value;
      console.log('Home ~ userSelect.addEventListener ~ selectedUser: ', selectedUser);
      sessionStorage.setItem('currentUser', selectedUser); // 세션 스토리지에 저장
    });
  }
}
