import Sidebar from '@/components/sidebar.js';
import '../../../reset.css'
import "@/styles/variables.css";
import "@/styles/global.css";
import './home.css';

export const initHome = (app) => {
  const sidebar = new Sidebar('home');
  
  const template = `
    <div class="page-container">
      ${sidebar.template()}
      <div class="content">
        <header>
          <h1>SandNet</h1>
        </header>
        <div class="main-content">
          <h1>SandNet에 오신 것을 환영합니다</h1>
          <div class="dashboard">
            <div class="dashboard-item">
              <h3>전체 직원</h3>
              <p>125명</p>
            </div>
            <div class="dashboard-item">
              <h3>전체 지점</h3>
              <p>15개</p>
            </div>
            <div class="dashboard-item">
              <h3>신규 공지</h3>
              <p>3건</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // 사이드바 이벤트 설정
  setTimeout(() => {
    sidebar.setEvent(app);
  }, 0);

  return template;
}; 