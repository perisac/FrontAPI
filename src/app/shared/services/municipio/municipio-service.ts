import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio } from '../../models/municipio.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private apiUrl = `${environment.apiUrl}/municipios`;

  constructor(private http: HttpClient) { }

listar(skip: number, limit: number, nome?: string, assessor?: string): Observable<{ data: Municipio[], total: number }> {
  let params: any = { skip, limit };

  if (nome) params.nome = nome;
  if (assessor) params.assessor = assessor;

  return this.http.get<{ data: Municipio[], total: number }>(this.apiUrl, { params });
}

  buscarPorNome(nome: string): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(`${this.apiUrl}?nome=${nome}`);
  }

  buscarPorIdIbge(id_ibge: number): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.apiUrl}/${id_ibge}`);
  }

  buscarPorAssessor(nome: string): Observable<Municipio[]> {
  const params = new HttpParams().set('assessor', nome);  // nome do param deve bater com o do FastAPI
  return this.http.get<Municipio[]>(`${this.apiUrl}/busca/assessor`, { params });
  }

  contar(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }

  criar(municipio: Municipio): Observable<Municipio> {
    return this.http.post<Municipio>(this.apiUrl, municipio);
  }

  atualizar(id_ibge: number, municipio: Municipio): Observable<Municipio> {
    return this.http.put<Municipio>(`${this.apiUrl}/${id_ibge}`, municipio);
  }

  deletar(id_ibge: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id_ibge}`);
  }

  contarBairros(id_ibge: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${id_ibge}/bairros/count`);
  }
}

