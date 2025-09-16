import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Area } from '../../models/area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private apiUrl = `${environment.apiUrl}/areas`;

  constructor(private http: HttpClient) { }

  listar(skip: number, limit: number, id?: number, bairro?: string): Observable<{ data: Area[], total: number }> {
    let params: any = { skip, limit };

    if (id) params.id = id;
    if (bairro) params.assessor = bairro;

    return this.http.get<{ data: Area[], total: number }>(this.apiUrl, { params });
  }

  criarArea(area: Area, bairroId: number): Observable<Area> {
    return this.http.post<Area>(`${this.apiUrl}/bairros/${bairroId}`, area);
  }

  deletarArea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarArea(id: number, area: Area): Observable<Area> {
    return this.http.put<Area>(`${this.apiUrl}/${id}`, area);
  }

  buscarPorId(id: number): Observable<Area> {
    return this.http.get<Area>(`${this.apiUrl}/${id}`);
  }

  listarAreasDoBairro(bairroId: number, skip: number, limit: number): Observable<{ data: Area[], total: number }> {
    return this.http.get<{ data: Area[], total: number }>(`${this.apiUrl}/bairros/${bairroId}?skip=${skip}&limit=${limit}`);
  }
}
