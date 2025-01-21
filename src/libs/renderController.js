import { getRoute } from '@/app/router/router';
// import layout from '@/components/layout';

export const renderController = (path, container) => {
  // console.log("renderController ~ container: ", container)
  // 경로에 따른 컴포넌트 가져오기
  const routeHandler = getRoute(path);
  
  // 공통 컴포넌트 렌더링
  // layout(container);
  
  if (typeof routeHandler === 'function') {
    try {
      const instance = routeHandler();
      if (instance && typeof instance.template === 'function') {
        container.innerHTML = instance.template();
        if (typeof instance.setEvent === 'function') {
          instance.setEvent();
        }
      } else {
        // 함수형 컴포넌트의 경우 (예: Home)
        container.innerHTML = instance;
      }
    } catch (error) {
      console.error("렌더링 중 오류 발생: ", error);
      // 오류 발생 시 홈으로 리다이렉트
      const homeHandler = getRoute('/');
      homeHandler();
    }
  } else {
    console.error("생성자 함수가 아닙니다.");
  }
};
