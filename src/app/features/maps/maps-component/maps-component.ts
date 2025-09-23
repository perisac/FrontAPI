import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-maps-component',
  standalone: false,
  templateUrl: './maps-component.html',
  styleUrl: './maps-component.css'
})
export class MapsComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const map = L.map('map').setView([-10.25, -48.33], 6); // Tocantins

    // Camada do estado
    fetch('assets/data/LimiteEstadual_AGM_TO_2022_A.json')
      .then(res => res.json())
      .then(data => {
        L.geoJSON(data, {
          style: { color: '#444', weight: 2, fillOpacity: 0 }
        }).addTo(map);
      });

    // Camada dos municípios
    fetch('assets/data/LimiteMunicipal_AGM_TO_2022_A.json')
      .then(res => res.json())
      .then(data => {
        L.geoJSON(data, {
          style: { color: '#03658C', weight: 1, fillOpacity: 0.3 },
          onEachFeature: (feature, layer) => {
            layer.bindPopup(`<b>${feature.properties.nome}</b>`);
          }
        }).addTo(map);
      });

  }
}
