import ListingPage from '@/pages/listing/listing';
import NoticePage from '@/pages/notice/notice';
import ProfilePage from '@/pages/profile/profile';
import { renderController } from '@/libs/renderController';

const app = document.querySelector('#page-container');

const routes = {
  '/': () => new ListingPage(app),
  '/profile': () => new ProfilePage(app),
  '/listing': () => new ListingPage(app),
  '/notice': () => new NoticePage(app),
};

export const getRoute = (path) => {
  
  // routes[/contact]
  // console.log("getRoute ~ path: ", path, typeof routes[path]);
  return routes[path];
};

export const handleRouting = () => {
  // console.log("handleRouting ~ path: ", path)
  const path = window.location.pathname;
  // const item = getRoute(/admin);
  renderController(path, app);
};

// 라우터 클래스
// class Router {
//   constructor() {
//     this.routes = {
//       '/': () => new ListingPage(app),
//       // '/home': () => initHome(app),
//       '/listing': () => new ListingPage(app),
//       '/notice': () => new NoticePage(app),
//       '/mypage': () => new MyPage(app)
//     };
//   }

//   navigate(path) {
//     window.history.pushState({}, '', path);
//     handleRouting();
//   }
// }

// // 라우터 인스턴스 생성
// const router = new Router();

// export const getRoute = (path) => {
//   return router.routes[path] || router.routes['/'];  // 없는 경로는 홈으로
// };

// export const handleRouting = () => {
//   const path = window.location.pathname;
//   renderController(path, app);
// };

// export default router; 