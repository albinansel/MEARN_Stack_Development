import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const options={
  withCredentials:true
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser="";

  accountDetails: any = {
    1000: { acno: 1000, username: "userone", password: "userone", balance: 50000 },
    1001: { acno: 1001, username: "usertwo", password: "usertwo", balance: 5000 },
    1002: { acno: 1002, username: "userthree", password: "userthree", balance: 10000 },
    1003: { acno: 1003, username: "userfour", password: "userfour", balance: 6000 }
  }



  constructor(private http:HttpClient) {
    this.getDetails()
   }

  saveDetails(){
    localStorage.setItem("accountDetails",JSON.stringify(this.accountDetails));

    if(this.currentUser){
      localStorage.setItem("currentUser",JSON.stringify(this.currentUser));
    }
  }

  getDetails(){
    if(localStorage.getItem("accountDetails")){
      this.accountDetails= JSON.parse(localStorage.getItem("accountDetails") || '')
    }
    if(localStorage.getItem("currentUser")){
      this.currentUser= JSON.parse(localStorage.getItem("currentUser") || '')
    }
  }



  register(uname: any, acno: any, pswd: any) {

    const data={
      uname,
      acno,
      pswd
    }
     return this.http.post(environment.apiUrl+"/register",data)
     
    // let users = this.accountDetails;
    // if (acno in users) {
    //   return false
    // }
    // else {
    //   users[acno] = { acno, username: uname, password: pswd, balance: 0 }
    //   this.saveDetails();
    //   return true
    // }
  }

  login(acno: any, pswd: any) {

    const data={
      acno,
      pswd
    }    
    return this.http.post(environment.apiUrl+"/login",data,options)


    // let users = this.accountDetails;

    // if (acno in users) {
    //   if (pswd == users[acno]["password"]) {
    //     this.currentUser=users[acno]["username"]
    //     this.saveDetails();
    //     return true;
    //   }
    //   else {
    //     alert("Incorrect Pasword")
    //     return false;
    //   }
    // }
    // else {
    //   alert("invalid Account")
    //   return false;
    // }
  }


  deposit(acno: any, pswd: any, amount: any) {

    const data={
      acno,
      pswd,
      amount
    }    
    return this.http.post(environment.apiUrl+"/deposit",data,options )

    // var amount = parseInt(amt);
    // let user = this.accountDetails;

    // if (acno in user) {
    //   if (pswd == user[acno]["password"]) {

    //     user[acno]["balance"] += amount;
    //     this.saveDetails();
    //     return user[acno]["balance"];
    //   }
    //   else {
    //     alert("Incorrect Pasword")
    //     return false;
    //   }
    // }
    // else {
    //   alert("invalid Account")
    //   return false;
    // }
  }


  withdrawal(acno: any, pswd: any, amount: any) {

    const data={
      acno,
      pswd,
      amount
    }    
    return this.http.post(environment.apiUrl+"/withdraw",data,options )



    // var amount = parseInt(amt);
    // let user = this.accountDetails;
    // if (acno in user) {
    //   if (pswd == user[acno]["password"]) {

    //     if (user[acno]["balance"] > amount) {
    //       user[acno]["balance"] -= amount;
    //       this.saveDetails();
    //       return user[acno]["balance"];

    //     }
    //     else {
    //       alert("Insufficient balance")
    //       return false;
    //     }
    //   }
    //   else {
    //     alert("Incorrect Pasword")
    //     return false;
    //   }
    // }
    // else {
    //   alert("invalid Account")
    //   return false;
    // }

  }

  deleteAccDetails(acno:any){
    // console.log(acno);                   for checking
    
    return this.http.delete(environment.apiUrl+"/deleteAccDetails/"+acno,options )
  }

}


