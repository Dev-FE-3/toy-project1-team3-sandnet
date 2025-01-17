import { getRoute } from '@/app/router/router';
import layout from '@/components/layout';

export const renderController = (path, container) => {
  // console.log("renderController ~ container: ", container)
  // 경로에 따른 컴포넌트 가져오기
  const routeHandler = getRoute(path);
  
  // 공통 컴포넌트 렌더링
  layout(container);
  
  // routeHandler가 생성자 함수인지 확인
  if (typeof routeHandler === 'function') {
    console.log("renderController ~ routeHandler: ", routeHandler)
    try {
      // routeHandler를 인스턴스화
      const instance = routeHandler();
      container.insertAdjacentHTML('beforeend', instance.template()); // template 메서드 호출
      
    } catch (error) {
      console.error("인스턴스화 중 오류 발생: ", error);
    }
  } else {
    console.error("생성자 함수가 아닙니다.");
  }
};
