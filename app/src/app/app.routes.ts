import { Routes } from '@angular/router';
import { SettingsComponent } from 'components/settings/settings.component';
import { ViewComponent } from 'components/view/view.component';

export const routes: Routes = [
    { 
        path: '',
        component: ViewComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    }
];
