import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './users/signup/signup.component';
import { SigninComponent } from './users/signin/signin.component';
import { TasksComponent } from './tasks/tasks.component';
import { authenticateGuard, routingGuardGuard } from 'src/shared/routing-guard.guard';
const routes: Routes = [

  { path:'register', component:SignupComponent },
  {path:'signin',component:SigninComponent},
  {path:'tasks/:id',component:TasksComponent,canActivate:[routingGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }