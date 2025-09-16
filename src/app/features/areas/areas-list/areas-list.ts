import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Area } from '../../../shared/models/area.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AreaService } from '../../../shared/services/area/area-service';
import { BairroService } from '../../../shared/services/bairro/bairro-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-areas-list',
  standalone: false,
  templateUrl: './areas-list.html',
  styleUrl: './areas-list.css'
})
export class AreasList implements OnInit {

  totalRegistros = 0;
  bairroId!: number;
  buscaBairro = '';
  idArea!: number;
  pageSize = 10;
  pageIndex = 0;
  dataSource = new MatTableDataSource<Area>([]);
  displayedColumns: string[] = ['id','bairro','area_Total', 'area_Regularizada'
                                ,'area_NaoRegularizada','area_Publica','area_PreservacaoPermanente','acoes'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private areaService: AreaService, bairroService: BairroService,
    private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit(){
    this.bairroId = Number(this.route.snapshot.paramMap.get('bairroId'));
    this.carregarAreas();
  }

  carregarAreas(pageIndex = 0, pageSize = 10){
    const skip = pageIndex * pageSize;
    const limit = pageSize;

    
  // Se tiver municipioId definido, lista os bairros daquele município
  const observable = this.bairroId
    ? this.areaService.listarAreasDoBairro(this.bairroId, skip, limit)
    : this.areaService.listar(skip, limit); // caso geral, lista todos os bairros

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

  buscarId() {
    this.pageIndex = 0;
    this.carregarAreas(this.pageIndex, this.pageSize);
  }

  buscarBairro(){
    this.pageIndex =0;
    this.carregarAreas(this.pageIndex, this.pageSize)
  }

  excluirArea(id: number) {
    if (confirm('Tem certeza que deseja excluir essa área?')) {
      this.areaService.deletarArea(id).subscribe(() => {
        this.carregarAreas(); // Recarrega a lista após exclusão
      });
    }
  }

    onPageChange(event: PageEvent) {
    console.log('Page change event:', event); // Para debug
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarAreas(this.pageIndex, this.pageSize);
  }
}
