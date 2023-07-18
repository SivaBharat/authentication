import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { usersData } from 'src/models/users';
import { UsersService } from 'src/services/users.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup!: FormGroup;
  adminForm!: FormGroup;
  firstname!: FormControl;
  lastname!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmpassword!: FormControl
  schenter!: FormControl

  modalToggle: string = 'false';

  obj = new admin();
 

  constructor(private user:UsersService){}


  ngOnInit(): void {
    this.firstname = new FormControl('', [Validators.required,
    Validators.pattern('[a-zA-Z ]*'),
    Validators.maxLength(20),
    Validators.minLength(3)
    ]);
    this.lastname = new FormControl('', [Validators.required,
    Validators.pattern('[a-zA-Z ]*'),
    Validators.maxLength(20),
    Validators.minLength(3)
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email])//pattern
    this.password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$')]),//pattern
      this.confirmpassword = new FormControl('', [Validators.required])
    this.schenter = new FormControl('', [Validators.required]);




    this.signup = new FormGroup({
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      confirmpassword: this.confirmpassword,
      schenter: this.schenter,


    })


  }

  
  userInfo: usersData =
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
      isLogged: false,
      id: 0
    }

    userAssign(){
      this.userInfo.firstName = this.firstname.value;
      this.userInfo.lastName = this.lastname.value;
      this.userInfo.email = this.email.value;
      this.userInfo.role = this.schenter.value;
      this.userInfo.password = this.password.value;
      this.user.postUserData(this.userInfo);
    }


  onSubmit() {

    this.userInfo.role = this.schenter.value;


    if (this.userInfo.role === 'admin') {
      this.modalToggle = 'block';
    }
    else if (this.userInfo.role === 'user') {
      this.userAssign();

      
    }
  }

  adminVerification(){
    if(this.obj.keyword==='ADMIN'){
    this.userAssign();
    }

    else{
      alert("You are not authorized for access")
    }
  }
}


class admin {
  keyword !: string;

}