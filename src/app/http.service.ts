import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAllCakes() {
    return this._http.get("/cakes");
  }
  getOneCake(id: string) {
    return this._http.get(`/cakes/${id}`);
  }
  createCake(new_cake) {
    return this._http.post("/cakes", new_cake);
  }
  updateCake(id: string, cake) {
    return this._http.patch(`/cakes/${id}`, cake);
  }
  deleteCake(id: string) {
    return this._http.delete(`/cakes/${id}`);
  }
  rateCake(id: string, rating) {
    return this._http.post(`/cakes/${id}/rate`, rating);
  }
}
