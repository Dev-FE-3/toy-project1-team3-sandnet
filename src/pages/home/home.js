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
        <div class="my-content green-border">
        <div class="${styles.content}">
          <h2 class="${styles.welcomeTitle}">SandNet에 오신 것을 환영합니다</h2>
          <div class="${styles.dashboard}">
            <div class="${styles.dashboardItem}">
              <i class="fas fa-store"></i>
              <h3>매장 수</h3>
              <p>125개</p>
              <span class="${styles.trend}">전월 대비 +3개 매장</span>
            </div>
            <div class="${styles.dashboardItem}">
              <i class="fas fa-users"></i>
              <h3>전체 직원</h3>
              <p>1,580명</p>
              <span class="${styles.trend}">가맹점 포함</span>
            </div>
            <div class="${styles.dashboardItem}">
              <i class="fas fa-bell"></i>
              <h3>신규 공지</h3>
              <p>3건</p>
            </div>
          </div>
          </div>
        </div>
      </main>
    `;
  }

  render() {
    this.target.innerHTML = this.template();
  }
}
