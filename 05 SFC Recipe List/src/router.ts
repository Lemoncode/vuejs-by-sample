import Router, { RouteConfig } from 'vue-router';
import { PageContainer } from './pages/login';
import { RecipeListPageContainer } from './pages/recipe/list';

const routes: RouteConfig[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: PageContainer },
  { path: '/recipe', component: RecipeListPageContainer },
];

export const router = new Router({
  routes
});
