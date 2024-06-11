import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import path from 'path';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',redirectTo:'register',pathMatch: 'full'},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path: 'home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
