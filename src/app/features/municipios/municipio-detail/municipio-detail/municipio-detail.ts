import { Component, OnInit } from '@angular/core';
import { Municipio } from '../../../../shared/models/municipio.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PossuiPlanoDiretor } from '../../../../shared/models/municipio.model';
import { MunicipioService } from '../../../../shared/services/municipio/municipio-service';
import { BairroService } from '../../../../shared/services/bairro/bairro-service';
import { Bairro } from '../../../../shared/models/bairro.model';

@Component({
  selector: 'app-municipio-detail',
  standalone: false,
  templateUrl: './municipio-detail.html',
  styleUrl: './municipio-detail.css'
})
export class MunicipioDetail implements OnInit {

    municipio?: Municipio;
    PossuiPlanoDiretor = PossuiPlanoDiretor;
    totalBairros: number = 0;
    mostrarBairros = false;
    municipioId!: number;
    bairros: Bairro[] = [];
    
  constructor(
    private route: ActivatedRoute,
    private municipioService: MunicipioService,
    private bairroService: BairroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.municipioService.buscarPorIdIbge(id).subscribe((data) => {
      this.municipio = data;
    });

    this.municipioService.contarBairros(id).subscribe((res) => {
      this.totalBairros = res;  ;
    });
  }

//   listarBairros() {
//  if (!this.municipio) return;

//   this.bairroService.listarPorMunicipio(this.municipio.id).subscribe(
//     (bairros) => {
//       this.bairros = bairros;
//       this.mostrarBairros = true;
//     },
//     (error) => {
//       console.error('Erro ao carregar bairros:', error);
//       alert('Não foi possível carregar os bairros.');
//     }
//   );
//   }



}
