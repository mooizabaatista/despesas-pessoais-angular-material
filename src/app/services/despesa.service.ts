import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Despesa } from '../interfaces/Despesa';

@Injectable({
  providedIn: 'root',
})
export class DespesaService {
  constructor(private _httpClient: HttpClient) {}

  baseUrl: string = 'http://localhost:3001/despesas';

  getAll(): Observable<Despesa[]> {
    return this._httpClient.get<Despesa[]>(this.baseUrl);
  }

  getById(id: string): Observable<Despesa> {
    return this._httpClient.get<Despesa>(`${this.baseUrl}/${id}`);
  }

  create(despesa: Despesa): Observable<Despesa> {
    despesa.isPago = false;
    despesa.id = this.generateFakeId();
    return this._httpClient.post<Despesa>(this.baseUrl, despesa);
  }

  update(despesa: Despesa): Observable<Despesa> {
    return this._httpClient.put<Despesa>(
      `${this.baseUrl}/${despesa.id}`,
      despesa
    );
  }

  delete(id: string): Observable<Despesa> {
    return this._httpClient.delete<Despesa>(`${this.baseUrl}/${id}`);
  }

  generateFakeId(): string {
    return '_' + Math.random().toString(36).substr(2, 9);
  }
}
