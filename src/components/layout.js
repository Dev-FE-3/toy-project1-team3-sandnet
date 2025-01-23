import Sidebar from './navigation/sidebar';

const layout = (container) => {
  const sidebarContainer = new Sidebar(container);
  // console.log('layout!!!!!!');

  // 사이드바 렌더링
  container.innerHTML = sidebarContainer.template();
  // 이벤트 리스너 활성화
  sidebarContainer.setEvent();
};

export default layout;
