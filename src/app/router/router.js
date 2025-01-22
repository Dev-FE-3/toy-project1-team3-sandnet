import ListingPage from '@/pages/listing/listing';
import NoticePage from '@/pages/notice/notice';
import ProfilePage from '@/pages/profile/profile';
import MyPage from '@/pages/mypage/mypage';
import { renderController } from '@/libs/renderController';

const app = document.querySelector('#page-container');

const routes = {
  '/': () => new ListingPage(app),
  '/profile': () => new ProfilePage(app),
  '/listing': () => new ListingPage(app),
  '/notice': () => new NoticePage(app),
  '/mypage': () => new MyPage(app),
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