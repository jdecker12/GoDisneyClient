import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, Scroll } from '@angular/router';
import { CardComponent } from './cards/card/card.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { SelectCardComponent } from './admin/select-card/select-card.component';
import { FullCardComponent } from './cards/full-card/full-card.component';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CmsEmailComponent } from './cms-email/cms-email.component';
import { ManageMessagesComponent } from './manage-messages/manage-messages.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { RegisterUserAdminComponent } from './register-user-admin/register-user-admin.component';
import { RoleGuard } from './role.guard';


const routes: Routes = [   
  { path: 'card', component: CardComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'register-user-admin', component: RegisterUserAdminComponent, canActivate: [RoleGuard], data: {roles: ['Admin']}  },
  { path: 'select-card', component: SelectCardComponent, canActivate: [RoleGuard], data: {roles: ['Admin']} },
  { path: 'manage-messages', component: ManageMessagesComponent, canActivate: [RoleGuard], data: {roles: ['Admin']} },
  { path: 'cms-email', component: CmsEmailComponent },
  { path: ':cardName', component: FullCardComponent }, 
  { path: '**', redirectTo: 'card' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
