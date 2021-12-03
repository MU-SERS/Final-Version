import { ChangeDetectionStrategy } from '@angular/compiler/src/compiler_facade_interface';
import { ChangeDetectorRef, Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';






const SESSION_COOKIE_MINUTES = 5;
const SESSION_COOKIE_IDENTIFIER = 'name=session';

var firebase;
// // var firebase = require('firebase');
// // var firebaseui = require('firebaseui');
// import firebase from 'firebase/compat/app';
// import * as firebaseui from 'firebaseui'
// import 'firebaseui/dist/firebaseui.css'

// // Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     // List of OAuth providers supported.
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ],
//   // Other config options...
// });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SERS';
  isLogin = true;
  usernameValue = '';
  passwordValue = '';
  faComments = faComments;
  faLocationArrow = faLocationArrow;
  faFolder = faFolder;
  faSignOutAlt = faSignOutAlt;
  hide = true;

  constructor(private auth: AngularFireAuth, private router: Router,private _changeDetectorRef: ChangeDetectorRef) {

  }


  ngAfterViewInit(): void {
    
    const hasSession = document.cookie
    .split('; ')
    .find((piece: string) => piece === SESSION_COOKIE_IDENTIFIER);

    if (hasSession) {
      this.isLogin = false;
      this._enablePopovers();
    }
  }

  logout(): void {
    this.isLogin = true;
    this.auth.signOut().then(response=>{
      // this.router.navigate(['home'])
      document.cookie = `${SESSION_COOKIE_IDENTIFIER}; max-age=0`;

    })
    // this.usernameValue = '';
    // this.passwordValue = '';

    // Remove session cookie
    document.cookie = `${SESSION_COOKIE_IDENTIFIER}; max-age=0`;
  }

//https://www.lawinsider.com/clause/sensitive-information

  login(): void {
    if (this.usernameValue && this.passwordValue) {
      this.auth.signInWithEmailAndPassword(
        this.usernameValue,this.passwordValue
      ).then(
        response=>{
          alert("By clicking 'Ok' you are accepting the terms and conditions. \n \n *Sensitive Information* \n Police department Employee's recognizes that they occupy a position of trust with respect to emergency information of a highly sensitive and confidential nature, including but not limited to: names, phone numbers, anonmous tips, location data, and confidencial chat logs.");
          this._loginSuccess();
        }
      ).catch(e => alert("Your username or password is incorrect."));

    } else {

        alert("You forgot to add a username or password.");
    }
  }

  private _loginSuccess(): void {
    this.isLogin = false;
    this._enablePopovers();
    const seconds = SESSION_COOKIE_MINUTES * 60; 
    document.cookie = `${SESSION_COOKIE_IDENTIFIER}; max-age=${seconds}`;
  }

  private _enablePopovers(): void {
    this._changeDetectorRef.detectChanges();
  }

  

  

}

