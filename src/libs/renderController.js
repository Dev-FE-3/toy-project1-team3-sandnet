import { getRoute } from '@/app/router/router';
import layout from '@/components/layout';

export const renderController = (path, container) => {
  // console.log("renderController ~ container: ", container)
  // 경로에 따른 컴포넌트 가져오기
  const routeHandler = getRoute(path);
  console.log("renderController ~ routeHandler: ", routeHandler)
  
  // 공통 컴포넌트 렌더링
  layout(container);
  
  // Main 컴포넌트 렌더링
  if (typeof routeHandler === 'function') {
    try {
      const instance = routeHandler();
      console.log("renderController ~ instance: ", instance)
    
      container.insertAdjacentHTML('beforeend', instance.template()); // 컴포넌트 템플릿 렌더링
      instance.setEvent(); // setEvent 호출
      
      
    } catch (error) {
      console.error("인스턴스화 중 오류 발생: ", error);
    }
  } else {
    console.error("생성자 함수가 아닙니다.", routeHandler);
  }
};
