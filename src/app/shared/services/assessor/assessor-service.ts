import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Assessor } from '../../models/assessor.model';

@Injectable({
  providedIn: 'root'
})
export class AssessorService {

  private apiUrl = `${environment.apiUrl}/assessores`;

  constructor(private http: HttpClient) { }

  buscarPorId(id: number): Observable<Assessor> {
    return this.http.get<Assessor>(`${this.apiUrl}/${id}`)
  }

  listar(skip = 0, limit = 10, nome = ''): Observable<{ data: Assessor[], total: number }> {
    return this.http.get<{ data: Assessor[], total: number }>(`${this.apiUrl}?skip=${skip}&limit=${limit}&nome=${nome}`);
  }

  cadastrarAssessor(assessor: Assessor): Observable<Assessor> {
    return this.http.post<Assessor>(this.apiUrl, assessor)
  }

  atualizarAssessor(id: number, assessor: Assessor): Observable<Assessor> {
    return this.http.put<Assessor>(`${this.apiUrl}/${id}`, assessor);
  }

  excluirAssessor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  contarMunicipios(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${id}/municipios/count`)
  }

  uploadFoto(assessorId: number, file: File): Observable<{ message: string, url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ message: string, url: string }>(
      `${this.apiUrl}/${assessorId}/upload-foto`,
      formData
    );
  }

  atualizarFoto(assessorId: number, file: File): Observable<{ message: string, url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.put<{ message: string, url: string }>(
      `${this.apiUrl}/${assessorId}/foto`,
      formData
    );
  }

  visualizarFoto(assessorId: number): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(
      `${this.apiUrl}/${assessorId}/foto`
    );
  }

}
