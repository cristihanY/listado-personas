
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';
import {Persona} from './persona.model'

@Injectable()

export class DataServices{
    constructor(private httpClient: HttpClient, 
                private loginService: LoginService
        ){}

    cargarPersonas(){
        const token = this.loginService.getIdToken();
        return this.httpClient.get('https://listado-personas-f36be-default-rtdb.firebaseio.com/datos.json?auth='+ token);
    }

    // Guardar Personas

    guardarPersonas(personas:Persona[]){
        const token = this.loginService.getIdToken();
        this.httpClient.put('https://listado-personas-f36be-default-rtdb.firebaseio.com/datos.json?auth='+ token, personas)
        .subscribe(
            response => console.log("Resultado de guardar personas" + response),
    
            error => console.log("Error al guardar personas: " + error)
        )

    }

    modificarPersonas( index:number, personas:Persona){
        const token = this.loginService.getIdToken();
        let url: string;
        url='https://listado-personas-f36be-default-rtdb.firebaseio.com/datos/'+index+ '.json?auth='+ token;
        this.httpClient.put(url, personas)
        .subscribe(
            response=> console.log("Resultado de modificar personas" + response), 
            error => console.log("Error al modificar personas "+ error)
        )
    }

    eliminarPersonas( index:number){
        const token = this.loginService.getIdToken();
        let url: string;
        url='https://listado-personas-f36be-default-rtdb.firebaseio.com/datos/'+index+ '.json?auth='+ token;
        this.httpClient.delete(url)
        .subscribe(
            response=> console.log("Resultado de eliminar personas" + response), 
            error => console.log("Error al eliminar personas "+ error)
        )
    }
}