import { Component, OnInit, ViewChild } from '@angular/core';
import { BairroService } from '../../../shared/services/bairro/bairro-service';
import { MatTableDataSource } from '@angular/material/table';
import { Bairro, SituacaoReurb, TipoReurb } from '../../../shared/models/bairro.model';
import { MunicipioService } from '../../../shared/services/municipio/municipio-service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bairros-list',
  standalone: false,
  templateUrl: './bairros-list.html',
  styleUrl: './bairros-list.css'
})
export class BairrosList implements OnInit {


  SituacaoReurb = SituacaoReurb; // <- referencia o enum para usar no template
  TipoReurb = TipoReurb; // <- referencia o enum para usar no template
  totalRegistros = 0;
  busca = '';
  pageSize = 10;
  pageIndex = 0;
  dataSource = new MatTableDataSource<Bairro>([]);
  displayedColumns: string[] = ['id', 'nome', 'municipio', 'situacao_reurb', 'tipo_reurb', 'acoes'];
  municipiosId!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private bairroService: BairroService, municipioService: MunicipioService,
    private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(): void {
    this.municipiosId = Number(this.route.snapshot.paramMap.get('municipioId'));
    this.carregarBairros(this.pageIndex, this.pageSize);
  }

  carregarBairros(pageIndex = 0, pageSize = 10) {
  const skip = pageIndex * pageSize;
  const limit = pageSize;

  // Se tiver municipioId definido, lista os bairros daquele município
  const observable = this.municipiosId
    ? this.bairroService.listarBairrosDoMunicipio(this.municipiosId, skip, limit, this.busca)
    : this.bairroService.listar(skip, limit, this.busca); // caso geral, lista todos os bairros

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

  buscar() {
    this.pageIndex = 0;
    this.carregarBairros(this.pageIndex, this.pageSize);
  }

  excluirBairro(id: number) {
    if (confirm('Tem certeza que deseja excluir este bairro?')) {
      this.bairroService.deletarBairro(id).subscribe(() => {
        this.carregarBairros(); // Recarrega a lista após exclusão
      });
    }
  }

  onPageChange(event: PageEvent) {
    console.log('Page change event:', event); // Para debug
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarBairros(this.pageIndex, this.pageSize);
  }
}