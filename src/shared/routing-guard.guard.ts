import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UsersService } from 'src/services/users.service';
import { sessionData } from 'src/models/users';

export const routingGuardGuard: CanActivateFn = (route, state) => {

  const obj=inject(UsersService);
   
  return true
};

export class authenticateGuard{
  role:string=''
  sessData:sessionData[]=[]
  constructor(public user:UsersService){
    this.user.getSessionInfo().subscribe((res)=>{
      this.sessData=res;
      this.role=this.sessData[0].role;

    })

  }
}
