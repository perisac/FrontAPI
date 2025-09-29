import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts';
import { Municipio, PossuiPlanoDiretor } from '../../../shared/models/municipio.model';
import { MunicipioService } from '../../../shared/services/municipio/municipio-service';

@Component({
  selector: 'app-graphs-component',
  standalone: false,
  templateUrl: './graphs-component.html',
  styleUrl: './graphs-component.css'
})
export class GraphsComponent implements OnInit {

  municipios: Municipio[] = [];

  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#BFBA63', '#BF6375', '#63A5BF']
    }]
  };

pieChartOptions: ChartConfiguration<'pie'>['options'] = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' },
    title: {
      display: true,
      text: 'Distribuição de Municípios por Plano Diretor',
      font: {
        size: 16,
        weight: 'bold'
      },
      color: '#060a0cff'
    }
  }
};

  PossuiPlanoDiretor = PossuiPlanoDiretor;
  constructor(private municipioService: MunicipioService) { }

  ngOnInit(): void {
    // Pegando todos os municípios
    this.municipioService.listar(0, 9999).subscribe(response => {
      this.municipios = response.data;

      // Inicializa o objeto de contagem
      const planoDiretorCount = {
        'Sim': 0,
        'Não': 0,
        'Não informado': 0
      };

      this.municipios.forEach(m => {
        if (m.possui_plano_diretor === PossuiPlanoDiretor.SIM) {
          planoDiretorCount['Sim']++;
        } else if (m.possui_plano_diretor === PossuiPlanoDiretor.NAO) {
          planoDiretorCount['Não']++;
        } else {
          planoDiretorCount['Não informado']++;
        }
      });

      // Atualiza o gráfico
      this.pieChartData.labels = ['Sim', 'Não', 'Não informado'];
      this.pieChartData.datasets[0].data = [
        planoDiretorCount['Sim'],
        planoDiretorCount['Não'],
        planoDiretorCount['Não informado']
      ];
    });
  }
}