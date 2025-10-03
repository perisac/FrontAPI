import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTab } from '@angular/material/tabs';
import { Municipio } from '../../../shared/models/municipio.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MunicipioService } from '../../../shared/services/municipio/municipio-service';
import { PossuiPlanoDiretor } from '../../../shared/models/municipio.model';

@Component({
  selector: 'app-municipio-list',
  standalone: false,
  templateUrl: './municipio-list.html',
  styleUrl: './municipio-list.css'
})
export class MunicipioList implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'possui_plano_diretor', 'prefeito','assessores' ,'acoes'];
  dataSource = new MatTableDataSource<Municipio>([]);
  totalRegistros = 0;
  busca = '';
  buscaAssessor = '';
  pageSize = 10;
  pageIndex = 0;

  PlanoDiretorEnum = PossuiPlanoDiretor; // <- referencia o enum para usar no template

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private municipioService: MunicipioService) { }

  ngOnInit(): void {
    this.carregarMunicipios();
  }

  ngAfterViewInit(): void {
    // REMOVA esta linha - ela conflita com a paginação server-side
    // this.dataSource.paginator = this.paginator;
    
    // Configure o paginator com os valores iniciais
    if (this.paginator) {
      this.paginator.pageIndex = this.pageIndex;
      this.paginator.pageSize = this.pageSize;
      this.paginator.length = this.totalRegistros;
    }
  }

  carregarMunicipios(pageIndex = 0, pageSize = 10) {
    const skip = pageIndex * pageSize;
    const limit = pageSize;

    this.municipioService.listar(skip, limit, this.busca, this.buscaAssessor)
      .subscribe(res => {
        this.dataSource.data = res.data;
        this.totalRegistros = res.total;

        if (this.paginator) {
          this.paginator.length = this.totalRegistros;
          this.paginator.pageIndex = pageIndex;
          this.paginator.pageSize = pageSize;
        }

        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
      });
  }

  buscar() {
    this.pageIndex = 0;
    this.carregarMunicipios(this.pageIndex, this.pageSize);
  }

  buscarAssessor(){
    this.pageIndex =0;
    this.carregarMunicipios(this.pageIndex, this.pageSize)
  }

  deletar(id_ibge: number) {
    if (confirm('Tem certeza que deseja deletar este município? Todos os bairros, áreas e lotes relacionados a ele também serão excluídos!')) {
      this.municipioService.deletar(id_ibge).subscribe(() => {
        // Após deletar, verifique se precisa voltar uma página
        const totalPaginas = Math.ceil(this.totalRegistros / this.pageSize);
        if (this.pageIndex >= totalPaginas && this.pageIndex > 0) {
          this.pageIndex = totalPaginas - 1;
        }
        this.carregarMunicipios(this.pageIndex, this.pageSize);
      });
    }
  }

  onPageChange(event: PageEvent) {
    console.log('Page change event:', event); // Para debug
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarMunicipios(this.pageIndex, this.pageSize);
  }
}