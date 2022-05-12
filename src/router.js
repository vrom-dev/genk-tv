import { Router } from '@vaadin/router';
import './pages/home.page';
import './pages/movies.page';
import './pages/search.page';

const outlet = document.querySelector('#outlet');
const router = new Router(outlet);

router.setRoutes([
  { path: '/', component: 'tmdb-home' },
  { path: '/trending', component: 'tmdb-home' },
  { path: '/tv', component: 'tmdb-home' },
  { path: '/search', component: 'tmdb-search' },
  { path: '(.*)', redirect: '/' }
]);
