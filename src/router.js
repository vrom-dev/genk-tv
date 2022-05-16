import { Router } from '@vaadin/router';
import './pages/home.page';
import './pages/movie-popular.page';
import './pages/movie-detail.page';
import './pages/tv-popular.page';
import './pages/tv-detail.page';
import './pages/search-results.page';

const outlet = document.querySelector('#outlet');
export const router = new Router(outlet);

router.setRoutes([
  { path: '/', component: 'tmdb-home' },
  { path: '/movie/:id/:slug', component: 'tmdb-movie-detail-page' },
  { path: '/movie', component: 'tmdb-movie-popular-page' },
  { path: '/tv/:id/:slug', component: 'tmdb-tv-detail-page' },
  { path: '/tv', component: 'tmdb-tv-popular-page' },
  { path: '/search', component: 'tmdb-search-results-page' },
  { path: '(.*)', redirect: '/' }
]);
