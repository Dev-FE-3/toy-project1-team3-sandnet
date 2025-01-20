import Sidebar from '../../components/sidebar.js';
import "../../../reset.css";
import "../../styles/variables.css";
import "../../styles/global.css";
import './home.css';  // 홈 스타일 import 추가

export function initHome() {
  const sidebar = new Sidebar('home');
  
  document.querySelector("#app").innerHTML = `
    <div class="page-container">
      ${sidebar.template()}
      <div class="content">
        <header>
          <h2 class="title">SandNet</h2>
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
  sidebar.setEvent(document.querySelector("#app"));
} 