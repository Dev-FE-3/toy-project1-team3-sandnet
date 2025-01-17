import { renderController } from '@/libs/renderController';

const app = document.querySelector('#app');

// 라우팅 처리
const handleRouting = () => {
  const path = window.location.pathname; // 현재 경로 가져오기
  renderController(path, app); // 현재 경로에 따라 렌더링
};

// handleRouting을 default로 내보내기
export default handleRouting;

window.addEventListener('DOMContentLoaded', handleRouting);
window.addEventListener('popstate', handleRouting);