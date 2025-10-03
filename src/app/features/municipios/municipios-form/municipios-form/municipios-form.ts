import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MunicipioService } from '../../../../shared/services/municipio/municipio-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipio } from '../../../../shared/models/municipio.model';
import { PossuiPlanoDiretor } from '../../../../shared/models/municipio.model';
import { Assessor } from '../../../../shared/models/assessor.model';
import { AssessorService } from '../../../../shared/services/assessor/assessor-service';

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
  assessoresDisponiveis : Assessor[] = [];

  PossuiPlanoDiretor = PossuiPlanoDiretor; // <- referencia o enum para usar no template

  constructor(
    private fb: FormBuilder,
    private municipioService: MunicipioService,
    private route: ActivatedRoute,
    private router: Router,
    private assessorService: AssessorService
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
      assessores: ['']
    });
    
    this.assessorService.listar().subscribe(res => {
      this.assessoresDisponiveis = res.data;
    })
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

    const formValue = this.form.value;

    // Garante que os assessores sejam enviados como array de IDs
    const municipio: Municipio = {
      ...formValue,
      assessores: formValue.assessores?.map((a: any) => a.id) || []
    };

    if (this.id) {
      // Edição
      this.municipioService.atualizar(this.id, municipio).subscribe(() => {
        alert('Município atualizado com sucesso!');
        this.router.navigate(['/municipios']);
      });
    } else {
      // Criação
      this.municipioService.criar(municipio).subscribe(() => {
        alert('Município criado com sucesso!');
        this.router.navigate(['/municipios']);
      });
    }


  }
}