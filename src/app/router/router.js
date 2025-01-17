import ListingPage from '@/pages/listing/listing';
import ProfilePage from '@/pages/profile/profile';

const app = document.querySelector('#app');

const routes = {
  '/': () => new ListingPage(app),
  '/profile': () => new ProfilePage(app),
  // '/contact': () => <Contact />,
  // '/counter': () => <Counter />,
  // '/profile': () => <Profile />,
};

export const getRoute = (path) => {
  // routes[/contact]
  console.log("getRoute ~ path: ", path, typeof routes[path]);
  return routes[path];
};