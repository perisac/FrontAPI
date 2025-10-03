import { Component, OnInit } from '@angular/core';
import { Assessor } from '../../../shared/models/assessor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessorService } from '../../../shared/services/assessor/assessor-service';
import { Municipio } from '../../../shared/models/municipio.model';
import { MunicipioService } from '../../../shared/services/municipio/municipio-service';

@Component({
  selector: 'app-assessor-detail',
  standalone: false,
  templateUrl: './assessor-detail.html',
  styleUrl: './assessor-detail.css'
})
export class AssessorDetail implements OnInit {

  assessor?: Assessor;
  assessorId!: number;
  totalMunicipios: number = 0;
  municipios: Municipio[] = [];
  selectedFile?: File;
  fotoUrl?: string;

  constructor(
    private route: ActivatedRoute,
    private assessorService: AssessorService,
    private router: Router,
    private municipioService: MunicipioService
  ) { }

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.assessorId = id;

    this.assessorService.buscarPorId(id).subscribe((data) => {
      this.assessor = data;
      this.carregarFoto();
      this.municipioService.buscarPorAssessor(this.assessor.nome).subscribe({
        next: (municipios) => {
          this.municipios = municipios;
          this.totalMunicipios = municipios.length;
        },
          error: (err) => {
          console.error('Erro ao buscar municípios:', err);
          this.municipios = [];
          this.totalMunicipios = 0;
        }
      })
    });
  }

  carregarFoto() {
  if (this.assessor) {
    this.assessorService.visualizarFoto(this.assessor.id).subscribe(res => {
      this.fotoUrl = res.url;
    });
  }
}
}
