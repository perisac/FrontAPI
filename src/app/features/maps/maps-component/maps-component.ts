import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { MunicipioService } from '../../../shared/services/municipio/municipio-service';
import { Municipio } from '../../../shared/models/municipio.model';


@Component({
  selector: 'app-maps-component',
  standalone: false,
  templateUrl: './maps-component.html',
  styleUrl: './maps-component.css'
})
export class MapsComponent implements AfterViewInit {

  constructor(private municipioService: MunicipioService) { }

  ngAfterViewInit(): void {
    const map = L.map('map', {
      dragging: false,
      zoomControl: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoom: false
    }).setView([-10.25, -48.33], 6); // Tocantins

    // Camada do estado
    fetch('assets/data/LimiteEstadual_AGM_TO_2022_A.json')
      .then(res => res.json())
      .then(data => {
        L.geoJSON(data, {
          style: { color: '#444', weight: 2, fillOpacity: 0 }
        }).addTo(map);
      });

    this.municipioService.listar(0, 9999).subscribe(response => {
      const municipiosApi: Municipio[] = response.data;

      // Mapa de cores por assessor
      const colorMap: { [key: string]: string } = {};
      const assessorPalette = [
        '#E6194B', '#3CB44B', '#FFE119', '#4363D8', '#F58231', '#911EB4',
         '#42D4F4', '#F032E6', '#BFEF45', '#FABED4', '#469990', '#DCBEFF', '#9A6324', '#FFFAC8',
          '#800000', '#AAFFC3', '#808000', '#FFD8B1', '#000075', '#A9A9A9', '#FFFFFF', '#000000',
           '#C0C0C0', '#8A2BE2', '#FF4500'

      ];

      let assessorIndex = 0;
      municipiosApi.forEach(m => {
        const assessor = m.assessor_responsavel || 'Não cadastrado';
        if (!colorMap[assessor]) {
          colorMap[assessor] = assessorPalette[assessorIndex % assessorPalette.length];
          assessorIndex++;
        }
      });

      // Função para colorir por plano diretor
      function getColorByPlanoDiretor(m: Municipio | undefined) {
        if (!m) return '#ccc';
        if (m.possui_plano_diretor === 'Sim') return '#BFBA63';
        if (m.possui_plano_diretor === 'Não') return '#BF6375';
        return '#63A5BF';
      }

      // Função para colorir por assessor
      function getColorByAssessor(m: Municipio | undefined) {
        if (!m) return '#ccc';
        return colorMap[m.assessor_responsavel || 'Não cadastrado'];
      }

      // Carrega GeoJSON dos municípios
      fetch('assets/data/LimiteMunicipal_AGM_TO_2022_A.json')
        .then(res => res.json())
        .then(geo => {
          // Camada Plano Diretor
          const planoLayer = L.geoJSON(geo, {
            style: (feature) => {
              const codIbge = feature?.properties?.cod_ibge;
              const municipio = municipiosApi.find(m => m.id === codIbge);
              return {
                color: '#03658C',
                weight: 1,
                fillOpacity: 0.6,
                fillColor: getColorByPlanoDiretor(municipio)
              };
            },
            onEachFeature: (feature, layer) => {
              const codIbge = feature.properties.cod_ibge;
              const municipio = municipiosApi.find(m => m.id === codIbge);
              if (municipio) {
                this.municipioService.contarBairros(codIbge).subscribe(bairros => {
                  const popupContent = `
                    <div style="font-family: Roboto, sans-serif; font-size: 14px;">
                      <b style="font-size:16px; color:#03658C;">${municipio.nome}</b><br><br>
                      <span style="color:#888"><b>Prefeito:</b> ${municipio.prefeito || 'Não cadastrado'}</span><br>
                      <span style="color:#888"><b>Assessor:</b> ${municipio.assessor_responsavel || 'Não cadastrado'}</span><br>
                      <span style="color:#888"><b>Plano Diretor:</b> ${municipio.possui_plano_diretor || 'Não informado'}</span><br>
                      <span style="color:#888"><b>Bairros:</b> ${bairros || 0}</span><br>
                    </div>`;
                  layer.bindPopup(popupContent);
                });
              }
            }
          });

          // Camada Assessor
          const assessorLayer = L.geoJSON(geo, {
            style: (feature) => {
              const codIbge = feature?.properties?.cod_ibge;
              const municipio = municipiosApi.find(m => m.id === codIbge);
              return {
                color: '#03658C',
                weight: 1,
                fillOpacity: 0.6,
                fillColor: getColorByAssessor(municipio)
              };
            },
            onEachFeature: (feature, layer) => {
              const codIbge = feature.properties.cod_ibge;
              const municipio = municipiosApi.find(m => m.id === codIbge);
              if (municipio) {
                this.municipioService.contarBairros(codIbge).subscribe(bairros => {
                  const popupContent = `
                    <div style="font-family: Roboto, sans-serif; font-size: 14px;">
                      <b style="font-size:16px; color:#03658C;">${municipio.nome}</b><br><br>
                      <span style="color:#888"><b>Prefeito:</b> ${municipio.prefeito || 'Não cadastrado'}</span><br>
                      <span style="color:#888"><b>Assessor:</b> ${municipio.assessor_responsavel || 'Não cadastrado'}</span><br>
                      <span style="color:#888"><b>Plano Diretor:</b> ${municipio.possui_plano_diretor || 'Não informado'}</span><br>
                      <span style="color:#888"><b>Bairros:</b> ${bairros || 0}</span><br>
                    </div>`;
                  layer.bindPopup(popupContent);
                });
              }
            }
          });

          // Controle de camadas
          const overlays = {
            "Plano Diretor": planoLayer,
            "Assessor Responsável": assessorLayer
          };
          L.control.layers({}, overlays, { collapsed: false }).addTo(map);

          // Adiciona a camada padrão
          planoLayer.addTo(map);

          const legenda = new (L.Control as any)({ position: 'bottomright' });

          legenda.onAdd = function (map: L.Map) {
            const div = L.DomUtil.create('div', 'info legend');
            div.style.backgroundColor = 'white';
            div.style.padding = '10px';
            div.style.borderRadius = '5px';
            div.style.maxHeight = '200px';
            div.style.overflowY = 'auto';
            div.innerHTML = '<b>Assessores</b><br>';

            for (const [assessor, cor] of Object.entries(colorMap)) {
              const line = document.createElement('div');
              line.style.display = 'flex';
              line.style.alignItems = 'center';
              line.style.marginBottom = '4px';

              const colorBox = document.createElement('span');
              colorBox.style.backgroundColor = cor;
              colorBox.style.width = '20px';
              colorBox.style.height = '20px';
              colorBox.style.display = 'inline-block';
              colorBox.style.marginRight = '8px';
              colorBox.style.border = '1px solid #999';

              const label = document.createElement('span');
              label.textContent = assessor || 'Não cadastrado';
              label.style.fontSize = '12px';
              label.style.color = '#333';

              line.appendChild(colorBox);
              line.appendChild(label);
              div.appendChild(line);
            }

            return div;
          };
          legenda.addTo(map);
        });
    });
  }
}
