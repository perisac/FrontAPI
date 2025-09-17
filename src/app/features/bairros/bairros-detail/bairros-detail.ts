import { Component, OnInit } from '@angular/core';
import { Bairro, SituacaoReurb, TipoReurb } from '../../../shared/models/bairro.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MunicipioService } from '../../../shared/services/municipio/municipio-service';
import { BairroService } from '../../../shared/services/bairro/bairro-service';

@Component({
  selector: 'app-bairros-detail',
  standalone: false,
  templateUrl: './bairros-detail.html',
  styleUrl: './bairros-detail.css'
})
export class BairrosDetail implements OnInit {

  bairro?: Bairro
  SituacaoReurb = SituacaoReurb; // <- referencia o enum para usar no template
  TipoReurb = TipoReurb; // <- referencia o enum para usar no template
  totalAreas: number =0;

  constructor( 
            private route: ActivatedRoute,
            private municipioService: MunicipioService,
            private bairroService: BairroService,
            private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bairroService.buscarPorId(id).subscribe((data) => {
      this.bairro = data;
    });

    this.bairroService.contarAreas(id).subscribe((res) => {
      this.totalAreas = res;  ;
    });
  }
}
