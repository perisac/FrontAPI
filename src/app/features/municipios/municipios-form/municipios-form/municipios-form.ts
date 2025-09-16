import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MunicipioService } from '../../../../shared/services/municipio/municipio-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from '../../../../shared/models/municipio.model';
import { PossuiPlanoDiretor } from '../../../../shared/models/municipio.model';

@Component({
  selector: 'app-municipios-form',
  standalone: false,
  templateUrl: './municipios-form.html',
  styleUrl: './municipios-form.css'
})
export class MunicipiosForm implements OnInit {

  form!: FormGroup;
  id!: number | null;
  titulo = 'Novo Município';

  PossuiPlanoDiretor = PossuiPlanoDiretor; // <- referencia o enum para usar no template

  constructor(
    private fb: FormBuilder,
    private municipioService: MunicipioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

    planoDiretorOptions = [
    { value: 'SIM', label: 'Sim' },
    { value: 'NAO', label: 'Não' },
    { value: 'SEM_INFORMACAO', label: 'Sem Informação' }
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      possui_plano_diretor: [false, Validators.required],
      prefeito: [''],
      assessor_responsavel: ['']
    });

    // Verifica se está em edição
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.titulo = 'Editar Município';
      this.municipioService.buscarPorIdIbge(this.id).subscribe(municipio => {
        this.form.patchValue(municipio);
      });
    }
  }

  salvar() {
    if (this.form.invalid) return;

    const municipio: Municipio = this.form.value;

    if (this.id) {
      // edição
      this.municipioService.atualizar(this.id, municipio).subscribe(() => {
        alert('Município atualizado com sucesso!');
        this.router.navigate(['/municipios']);
      });
    } else {
      // criação
      this.municipioService.criar(municipio).subscribe(() => {
        alert('Município criado com sucesso!');
        this.router.navigate(['/municipios']);
      });
    }
  }
}