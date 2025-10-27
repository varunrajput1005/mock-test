import { Routes } from '@angular/router';
import { Web } from './web';
import { Home } from './home/home';

export const WEB_ROUTES: Routes = [
    {
        path: '',
        component: Web,
        children: [
            {
                path: '',
                component: Home
            }
        ],
    },

];
