import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bairro } from '../../models/bairro.model';

@Injectable({
  providedIn: 'root'
})
export class BairroService {

  private apiUrl = `${environment.apiUrl}/bairros`;

  constructor(private http: HttpClient) { }
  
  listar(skip = 0, limit = 10, nome = ''): Observable<{ data: Bairro[], total: number }> {
    return this.http.get<{ data: Bairro[], total: number }>(`${this.apiUrl}?skip=${skip}&limit=${limit}&nome=${nome}`);
  }

  criarBairro(bairro: Bairro, municipioId: number): Observable<Bairro> {
    return this.http.post<Bairro>(`${this.apiUrl}/municipios/${municipioId}`, bairro);
  }

  deletarBairro(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarBairro(id: number, bairro: Bairro): Observable<Bairro> {
    return this.http.put<Bairro>(`${this.apiUrl}/${id}`, bairro);
  }

  buscarPorNome(nome: string): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(`${this.apiUrl}?nome=${nome}`);
  }

  contarAreas(id_bairro: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${id_bairro}/area/count`);
  }

  buscarPorNomeMunicipio( municipio : string): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(`${this.apiUrl}/municipio?nome=${municipio}`);
  
  }

  buscarPorId(id: number): Observable<Bairro> {
    return this.http.get<Bairro>(`${this.apiUrl}/${id}`);
  }

  listarBairrosDoMunicipio(municipioId: number, skip = 0, limit = 10, busca = ''): Observable<{data: Bairro[], total: number}> {
    return this.http.get<{data: Bairro[], total: number}>(`${this.apiUrl}/municipio/${municipioId}?skip=${skip}&limit=${limit}&nome=${busca}`);
  }
}