import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Alumnosutl } from "./alumnosUTL";
import { Observable } from "rxjs";
 
@Injectable({
    providedIn: 'root'
})
export class ProyectoapiService {
    constructor(private http: HttpClient) { }
 
    public getAlumnos(): Observable<any> {
        return this.http.get<any>('http://127.0.0.1:5000/api/alumnos/');
    }
 
    agregarNuevoAlumno(datos: Alumnosutl) {
        return this.http.post('http://127.0.0.1:5000/api/alumnos/', datos);
    }

    // Obtener un alumno por matrícula para editar
    public getAlumno(matricula: string): Observable<any> {
        return this.http.get<any>(`http://127.0.0.1:5000/api/alumnos/${matricula}`);
    }

    // Modificar alumno
    public modificarAlumno(matricula: string, datos: Alumnosutl): Observable<any> {
        return this.http.put(`http://127.0.0.1:5000/api/alumnos/${matricula}`, datos);
    }

    // Eliminar alumno (Añadido aquí)
    public EliminaAlumno(mat: number | string): Observable<any> {
        return this.http.delete<any>(`http://127.0.0.1:5000/api/alumnos/${mat}`);
    }
}