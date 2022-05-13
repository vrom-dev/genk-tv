import { Router } from '@vaadin/router';
import './pages/home.page';
import './pages/movies.page';
import './pages/movie-detail.page';
import './pages/tv-detail.page';
import './pages/search.page';

const outlet = document.querySelector('#outlet');
export const router = new Router(outlet);

router.setRoutes([
  { path: '/', component: 'tmdb-home' },
  { path: '/movie/:id/:slug', component: 'tmdb-movie-details-page' },
  { path: '/movie', component: 'tmdb-movies' },
  { path: '/tv/:id/:slug', component: 'tmdb-tv-details-page' },
  { path: '/search', component: 'tmdb-search' },
  { path: '(.*)', redirect: '/' }
]);
