import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import { DepartmentComponent } from './components/department/department.component';
import { DepartmentformComponent } from './components/departmentform/departmentform.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {path: '', redirectTo:'/home', pathMatch: 'full'},
 // {path:'employee',component:EmployeeComponent},
 // {path:'employeeform',component:EmployeeFormComponent},
 // {path:'home',component:HomeComponent},
 // {path:'department',component:DepartmentComponent},
 // {path:'departmentform',component:DepartmentformComponent},
  {path:'home',component:HomeComponent, canActivate:[AuthGuardService]},
  {path:'departmentform',component:DepartmentformComponent,canActivate:[AuthGuardService]},
  {path:'department',component:DepartmentComponent,canActivate:[AuthGuardService]},
  {path:'employeeform',component:EmployeeFormComponent,canActivate:[AuthGuardService]},
  {path:'employee',component:EmployeeComponent,canActivate:[AuthGuardService]}, 
  {path:'auth-callback',component:AuthCallbackComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
