import styles from './home.module.css';

export default class Home {
  constructor(target) {
    this.target = target;
  }

  template() {
    return `
      <main class="main-content">
        <header>
          <h1>SandNet</h1>
        </header>
        <section class="my-content green-border">
          <div class="${styles.content}">
            <h2 class="${styles.welcomeTitle}">SandNet에 오신 것을 환영합니다</h2>
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
            <div class="role-selection-container">
              <div class="role-selection">
                <button class="${styles.roleButton}" data-role="admin">Admin</button>
                <button class="${styles.roleButton}" data-role="user">User</button>
              </div>
              <div class="user-selection">
                <select class="${styles.userSelect}">
                  <option value="user1">유저 1</option>
                  <option value="user2">유저 2</option>
                  <option value="user3">유저 3</option>
                  <option value="user4">유저 4</option>
                </select>
              </div>
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
