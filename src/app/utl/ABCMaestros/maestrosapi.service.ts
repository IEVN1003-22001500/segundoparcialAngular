import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Maestrosutl } from "./maestrosUTL";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MaestrosapiService {
    constructor(private http: HttpClient) { }

    public getMaestros(): Observable<any> {
        return this.http.get<any>('http://127.0.0.1:5000/api/maestros/');
    }

    // Cambiado a string | number para que acepte tanto textos como números sin error
    public getMaestro(id: string | number): Observable<any> {
        return this.http.get<any>(`http://127.0.0.1:5000/api/maestros/${id}`);
    }

    public agregarMaestro(datos: Maestrosutl): Observable<any> {
        return this.http.post('http://127.0.0.1:5000/api/maestros/', datos);
    }

    public modificarMaestro(id: string | number, datos: Maestrosutl): Observable<any> {
        return this.http.put(`http://127.0.0.1:5000/api/maestros/${id}`, datos);
    }

    public eliminarMaestro(id: string | number): Observable<any> {
        return this.http.delete<any>(`http://127.0.0.1:5000/api/maestros/${id}`);
    }
}