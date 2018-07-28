import Router, { RouteConfig } from 'vue-router';
import { LoginPage } from './pages/login';

const routes: RouteConfig[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
];

export const router = new Router({
  routes
});
