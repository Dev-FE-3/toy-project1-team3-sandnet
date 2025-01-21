import { initHome } from '@/pages/home/home.js';
import ListingPage from '@/pages/listing/listing.js';
import NoticePage from '@/pages/notice/notice.js';
import MyPage from '@/pages/mypage/mypage.js';
import { renderController } from '@/libs/renderController';

const app = document.querySelector('#app');

// 라우터 클래스
class Router {
  constructor() {
    this.routes = {
      '/': () => initHome(app),
      '/home': () => initHome(app),
      '/listing': () => new ListingPage(app),
      '/notice': () => new NoticePage(app),
      '/mypage': () => new MyPage(app)
    };
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    handleRouting();
  }
}

// 라우터 인스턴스 생성
const router = new Router();

export const getRoute = (path) => {
  return router.routes[path] || router.routes['/'];  // 없는 경로는 홈으로
};

export const handleRouting = () => {
  const path = window.location.pathname;
  renderController(path, app);
};

export default router; 