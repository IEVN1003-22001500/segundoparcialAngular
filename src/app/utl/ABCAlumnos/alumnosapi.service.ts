import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Alumnosutl } from "./alumnosUTL"; // <-- Corregido: 'Alumnosutl' en lugar de 'AlumnosUTL'
import { Observable } from "rxjs";
 
@Injectable({
    providedIn: 'root'
})
export class ProyectoapiService {
    constructor(private http: HttpClient) { }
 
    public getAlumnos(): Observable<any> {
        return this.http.get<any>('http://127.0.0.1:5000/api/alumnos');
    }
 
    agregarNuevoAlumno(datos: Alumnosutl) {
        return this.http.post('http://127.0.0.1:5000/api/alumnos', datos);
    }
}