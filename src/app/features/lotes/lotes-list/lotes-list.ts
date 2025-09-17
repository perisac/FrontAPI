import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Lote } from '../../../shared/models/lote.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AreaService } from '../../../shared/services/area/area-service';
import { LoteService } from '../../../shared/services/lote/lote-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lotes-list',
  standalone: false,
  templateUrl: './lotes-list.html',
  styleUrl: './lotes-list.css'
})
export class LotesList implements OnInit {

  totalRegistros = 0;
  areaId!: number;
  buscaBairro = '';
  numeroLote!: number;
  pageSize = 10;
  pageIndex = 0;
  dataSource = new MatTableDataSource<Lote>([]);
  displayedColumns: string[] = ['id', 'numeroLote', 'tamanhoLote', 'acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private areaService: AreaService, private loteService: LoteService,
    private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(): void {

  }

  carregarLotes(pageIndex = 0, pageSize = 10) {
    const skip = pageIndex * pageSize;
    const limit = pageSize;


    // Se tiver Área definido, lista os bairros daquele município
    const observable = this.areaId
      ? this.loteService.listarLotesDaArea(this.areaId, skip, limit)
      : this.loteService.listar(skip, limit); // caso geral, lista todos os bairros

    observable.subscribe(res => {
      this.dataSource.data = res.data;
      this.totalRegistros = res.total;

      // Atualize o paginator após receber os dados
      if (this.paginator) {
        this.paginator.length = this.totalRegistros;
        this.paginator.pageIndex = pageIndex;
        this.paginator.pageSize = pageSize;
      }

      // Atualize as propriedades do componente
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
    });
  }

  buscarPorNumero() {
    this.pageIndex = 0;
    this.carregarLotes(this.pageIndex, this.pageSize);
  }

  excluirLote(id: number) {
    if (confirm('Tem certeza que deseja excluir esse Lote?')) {
      this.loteService.deletarLote(id).subscribe(() => {
        this.carregarLotes(); // Recarrega a lista após exclusão
      });
    }
  }

  onPageChange(event: PageEvent) {
    console.log('Page change event:', event); // Para debug
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarLotes(this.pageIndex, this.pageSize);
  }


}
