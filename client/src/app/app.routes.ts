import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadChildren: () => import('./web/web.routes').then(m => m.WEB_ROUTES)
    },
    { path: 'admin', loadComponent: () => import('./admin/admin').then(m => m.Admin) },
    { path: 'client', loadComponent: () => import('./client/client').then(m => m.Client) },
];
