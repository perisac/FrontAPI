import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AssessorService } from '../../../shared/services/assessor/assessor-service';
import { MatTableDataSource } from '@angular/material/table';
import { Assessor } from '../../../shared/models/assessor.model';

@Component({
  selector: 'app-assessor-list',
  standalone: false,
  templateUrl: './assessor-list.html',
  styleUrl: './assessor-list.css'
})
export class AssessorList implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'quantidadeMunicipios', 'acoes'];
  dataSource = new MatTableDataSource<Assessor>([]);
  totalRegistros = 0;
  busca = '';
  pageSize = 10;
  pageIndex = 0;
  totalMunicipios: number= 0 ;
  assessores: Assessor[] = [];

  constructor(private assessorService: AssessorService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.carregarAssessores();
  }

  carregarAssessores(pageIndex = 0, pageSize = 10) {
    const skip = pageIndex * pageSize;
    const limit = pageSize;
    
    this.assessorService.listar(skip, limit, this.busca)
      .subscribe(res => {
        this.dataSource.data = res.data;
        this.totalRegistros = res.total;
        this.assessores = res.data;

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
    this.carregarAssessores(this.pageIndex, this.pageSize);
  }

  deletar(id: number) {
    if (confirm('Tem certeza que deseja excluir esse assessor?!')) {
      this.assessorService.excluirAssessor(id).subscribe(() => {
        // Após deletar, verifique se precisa voltar uma página
        const totalPaginas = Math.ceil(this.totalRegistros / this.pageSize);
        if (this.pageIndex >= totalPaginas && this.pageIndex > 0) {
          this.pageIndex = totalPaginas - 1;
        }
        this.carregarAssessores(this.pageIndex, this.pageSize);
      });
    }
  }

  onPageChange(event: PageEvent) {
    console.log('Page change event:', event); // Para debug
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarAssessores(this.pageIndex, this.pageSize);
  }
}
