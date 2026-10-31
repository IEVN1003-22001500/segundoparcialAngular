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

  agregarNuevoMaestro(datos: Maestrosutl) {
    return this.http.post(
      'http://127.0.0.1:5000/api/maestros/',
      datos
    );
  }

}