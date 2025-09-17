import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../../../shared/services/area/area-service';
import { Area } from '../../../shared/models/area.model';

@Component({
  selector: 'app-areas-detail',
  standalone: false,
  templateUrl: './areas-detail.html',
  styleUrl: './areas-detail.css'
})
export class AreasDetail implements OnInit{

  area?: Area;
  assessor? : string;

  constructor(private route :ActivatedRoute, private areaService: AreaService, ){}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.areaService.buscarPorId(id).subscribe((data) => {
      this.area = data;
    });
  }

}
