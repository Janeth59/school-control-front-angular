import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Students {
  private baseUrl = 'http://localhost:3500';
  private httOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})  //cambio
  };
}
