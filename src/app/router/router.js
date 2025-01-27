import HomePage from '@/pages/home/home';
import ListingPage from '@/pages/listing/listing';
import NoticePage from '@/pages/notice/notice';
import ProfilePage from '@/pages/profile/profile';
import MyPage from '@/pages/mypage/mypage';
import ListingUserPage from '@/pages/listing/listingUser';
import { renderController } from '@/libs/renderController';

const app = document.querySelector('#page-container');

const routes = {
  '/': () => new HomePage(app),
  '/profile': () => new ProfilePage(app),
  '/admin/listing': () => new ListingPage(app),
  '/user/listing': () => new ListingUserPage(app),
  '/notice': () => new NoticePage(app),
  '/mypage': () => new MyPage(app),
};

export const getRoute = (path) => {
  return routes[path];
};

export const handleRouting = () => {
  const path = window.location.pathname;
  renderController(path, app);
};
