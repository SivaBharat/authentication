import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/services/users.service';
import { usersData } from 'src/models/users';
import { sessionData } from 'src/models/users';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  obj = new signin_Credentials();
  userInfo!: usersData;
  sessionInfo:sessionData={
    email: '',
    role: '',
    userId: 0
  };

  constructor(private user:UsersService,private route:Router){}
  ngOnInit(): void {

  }


  onSubmit() {
this.user.getUserData().subscribe((res)=>{
  for (const user1 of res) {
    if(this.obj.email==user1.email && this.obj.password==user1.password){
      console.log(user1);
      this.sessionInfo.email=user1.email;
      this.sessionInfo.role=user1.role;
      this.sessionInfo.userId=user1.id
      this.user.updateIsloggedIn(user1,user1.id)
      this.user.postSessionInfo(this.sessionInfo);
      this.user.validateAuth(true);
      this.route.navigate(['/']);

      return
    }    
  }

  alert('login failed')

   




})
  }
}

class signin_Credentials {
  email!: string;
  password!: string;
}

