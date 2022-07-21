import { EventEmitter, Injectable } from '@angular/core';
import { DataServices } from './data.services';
import { LoggingService } from './LoggingService.service';
import { Persona } from './persona.model';

@Injectable()
export class PersonasService {
  personas: Persona[] = []; 

  saludar = new EventEmitter<number>();

  constructor(private loggingService:LoggingService,
              private dataServices:DataServices
    ){}
  
    setPersonas( personas: Persona[] ){
      this.personas = personas;
    }

  obtenerPersonas(){
    return this.dataServices.cargarPersonas();
  }

  agregarPersona(persona: Persona) {
    this.loggingService.enviaMensajeAConsola('agregamos persona:' + persona.nombre)
    if(this.personas==null){
      this.personas=[];
    }
    this.personas.push(persona);
    this.dataServices.guardarPersonas(this.personas);
  }
  encotrarPersona(index: number){
    let persona: Persona = this.personas[index];
    return persona;
  }
  modificarPersona(index: number, persona: Persona) {
    let persona1= this.personas[index];
    persona1.nombre = persona.nombre;
    persona.apellido=persona.apellido;
    this.dataServices.modificarPersonas(index, persona);
  }
  eliminarPersona(index: number) {
    this.personas.splice(index, 1);
    this.dataServices.eliminarPersonas(index);
    //se vueve a guardar el arreglo para regenerar los indices
  this.modificarPersonas();
  }

  modificarPersonas() {
    if(this.personas!=null){
      this.dataServices.guardarPersonas(this.personas);
      
    }
  }
}
