import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginWithEmailComponent } from './pages/login-with-email/login-with-email.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignUpWithEmailComponent } from './pages/sign-up-with-email/sign-up-with-email.component';

export const routes: Routes = [
    {
        path:'',
        component:DashboardComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'login-with-email',
        component: LoginWithEmailComponent
    },
    {
        path:'sign-up',
        component: SignUpComponent
    },
    {
        path:'sign-up-with-email',
        component: SignUpWithEmailComponent
    }
];
