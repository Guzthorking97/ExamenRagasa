import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  private elemento:any;
  private editar:any;

  public setElemento(valor:any){
    this.elemento = valor;
  }

  public getElemento(){
    return this.elemento;
  }

  public setEditar(valor:boolean){
    this.editar = valor;
  }

  public getEditar(){
    return this.editar;
  }

  getAll() {
    return this.http.get<any[]>(baseUrl);
  }
  get(id) {
    return this.http.get<any[]>(`${baseUrl}/${id}`);
  }
  create(data) {
    return this.http.post(baseUrl, data);
  }
  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }
  delete(id) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll() {
    return this.http.delete(baseUrl);
  }
  findByTitle(title) {
    return this.http.get<any[]>(`${baseUrl}?titulo=${title}`);
  }
}
