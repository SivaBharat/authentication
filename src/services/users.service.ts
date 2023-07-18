import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usersData } from 'src/models/users';
import { sessionData } from 'src/models/users';
import { environments } from 'src/environments/environments';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private route: Router) { }
  // for the user status
  public authSubject = new Subject<boolean>();

  //manipulation of the subject
  validateAuth(state: boolean) {
    this.authSubject.next(state);
  }



  usersApi = environments.usersApi;

  postUserData(item: usersData) {
    return this.http.post<usersData>(this.usersApi, item).subscribe((res) => {
      this.route.navigate(['/signin']);
    });
  }

  getUserData() {
    return this.http.get<usersData[]>(this.usersApi);
  }


  updateIsloggedIn(item: any, id: number) {
    const putUrl = this.usersApi + '/' + id;
    item.isLogged = true;
    return this.http.put(putUrl, item).subscribe();  
  }


  sessionApi = environments.sessionUrl;
  postSessionInfo(item: sessionData) {
    return this.http
      .post<sessionData>(this.sessionApi, item)
      .subscribe((data) => {
        console.log('login successfull');
      });
  }

  getSessionInfo(){
    return this.http.get<sessionData[]>(this.sessionApi);
  }



  logout(id:number) {
    var activeUserApi = this.sessionApi + '/1';
    var logoutUser=this.usersApi+'/'+id;
    this.getUserData()
    this.validateAuth(false);
    return this.http.delete(activeUserApi).subscribe();

  }

    // getting the data of the user who is active
    getActiveUser() {
      const activeUrl = this.usersApi + '?isLogged=true'
      return this.http.get<usersData>(activeUrl);
    }
  
    activeUser: any//data of active user
  
    // to put back the updated data
    logOutUser() {
      this.getActiveUser().subscribe((res) => {
        this.activeUser = res
        const activeUrl = this.usersApi + '/' + this.activeUser[0].id;
        this.activeUser[0].isLogged = false;
        this.route.navigate(['/']);
        return this.http.put(activeUrl, this.activeUser[0]).subscribe();
  
      })
}

getUserId(firstName:string){
  const url=this.usersApi+'/?firstName='+firstName;
  return this.http.get<usersData[]>(url);
}
}