import { Component, OnInit } from '@angular/core';
import  firebase from 'firebase/compat/app';
import { LoginService } from './login/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  titulo = 'Listado de Personas';


   constructor( private loginService: LoginService) {}


    ngOnInit(): void {
      firebase.initializeApp({
        apiKey: "AIzaSyBnrANeHoj4rer5koPUvM_dAaxiEZipNVk",
        authDomain: "listado-personas-f36be.firebaseapp.com",
      })
      
    }
    isAutenticado(){
     return this.loginService.isAutenticado();
    }
    
    salir(){
      this.loginService.logout();
    }  
}
