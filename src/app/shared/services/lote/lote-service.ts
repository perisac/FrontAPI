import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lote } from '../../models/lote.model';

@Injectable({
  providedIn: 'root'
})
export class LoteService {

  private apiUrl = `${environment.apiUrl}/lotes`;

  constructor(private http: HttpClient) { }

  listar(skip = 0, limit = 10, id? : number): Observable<{ data: Lote[], total: number }> {
    return this.http.get<{ data: Lote[], total: number }>(`${this.apiUrl}?skip=${skip}&limit=${limit}&id=${id}`);
  }

  criarLote(lote: Lote, areaId: number): Observable<Lote> {
    return this.http.post<Lote>(`${this.apiUrl}/areas/${areaId}`, lote);
  }

  deletarLote(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarLote(id: number, lote: Lote): Observable<Lote> {
    return this.http.put<Lote>(`${this.apiUrl}/${id}`, lote);
  }

  listarLotesDaArea(areaId: number, skip = 0, limit = 10): Observable<{data: Lote[], total: number}> {
    return this.http.get<{data: Lote[], total: number}>(`${this.apiUrl}/areas/${areaId}?skip=${skip}&limit=${limit}`);
  }

  buscarPorId(id: number): Observable<Lote> {
    return this.http.get<Lote>(`${this.apiUrl}/${id}`);
  }
}
