import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'details/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'specificCategory/:id',
    renderMode: RenderMode.Client
  },
  {
    path: 'checkout/:cartId',
    renderMode: RenderMode.Client
  }
];
