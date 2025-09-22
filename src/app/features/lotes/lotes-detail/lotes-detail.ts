import { Component, OnInit } from '@angular/core';
import { Lote } from '../../../shared/models/lote.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LoteService } from '../../../shared/services/lote/lote-service';

@Component({
  selector: 'app-lotes-detail',
  standalone: false,
  templateUrl: './lotes-detail.html',
  styleUrl: './lotes-detail.css'
})
export class LotesDetail implements OnInit{

  lotes?: Lote

  constructor(
    private router : Router,
    private loteService: LoteService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
     const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loteService.buscarPorId(id).subscribe((data) => {
      this.lotes = data;
    });
  }
}
