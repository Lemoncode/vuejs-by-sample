import Router, { RouteConfig } from 'vue-router';
import { PageContainer } from './pages/login';
import { RecipeListPageContainer } from './pages/recipe/list';
import { EditRecipePageContainer } from './pages/recipe/edit';

const routes: RouteConfig[] = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: PageContainer },
  { path: '/recipe', component: RecipeListPageContainer },
  { path: '/recipe/:id', component: EditRecipePageContainer, props: true },
];

export const router = new Router({
  routes
});
