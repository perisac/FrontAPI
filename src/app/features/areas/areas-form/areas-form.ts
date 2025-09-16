import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AreaService } from '../../../shared/services/area/area-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BairroService } from '../../../shared/services/bairro/bairro-service';
import { CustomValidators } from '../../../shared/validators/CustomValidators';
import { B } from '@angular/cdk/keycodes';
import { Area } from '../../../shared/models/area.model';

@Component({
  selector: 'app-areas-form',
  standalone: false,
  templateUrl: './areas-form.html',
  styleUrl: './areas-form.css'
})
export class AreasForm implements OnInit {

  form!: FormGroup

  id!: number;
  titulo = 'Nova Área';
  bairro_id!: number;
  constructor(private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private bairroService: BairroService
  ) { }
  
  ngOnInit(): void {
      this.form = this.fb.group({
      area_Total: [null, [Validators.required, Validators.min(0)]],
      area_Regularizada: [null, [Validators.min(0)]],
      area_NaoRegularizada: [null, [Validators.min(0)]],
      area_EmProcessoRegularizacao: [null, [Validators.min(0)]],
      area_Publica: [false],
      area_PreservacaoPermantente: [false],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      bairro: this.fb.group({
      id: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [CustomValidators.bairroExistente(this.bairroService)],
          updateOn: 'blur'
        }
      ],
      nome: ['']
      })
    });

     // 📌 Caso 1: formulário aberto a partir do municipio-detail (rota com municipioId)
  const bairroId = this.route.snapshot.paramMap.get('bairroId');
  if (bairroId) {
    this.form.patchValue({
      bairro: { id: Number(bairroId) }
    });

    // trava o campo id para não permitir alteração
    this.form.get('bairro.id')?.disable();

    // (opcional) preenche nome do município para exibir
    this.bairroService.buscarPorId(Number(bairroId)).subscribe(m => {
      this.form.patchValue({
        bairro: { nome: m.nome }
      });
    });
  }

  // 📌 Caso 2: edição de bairro existente
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  if (this.id) {
    this.titulo = 'Editar Área';
    this.areaService.buscarPorId(this.id).subscribe(area => {
      this.form.patchValue(area);

      // se vier com município já definido, trava o campo
      if (area.bairro?.id) {
        this.form.get('bairro.id')?.disable();
      }
    });
  }

  // 📌 Caso 3: params por querystring (opcional, vindo do router.navigate)
  this.route.queryParams.subscribe(params => {
    if (params['bairro_id'] && params['bairro_nome']) {
      this.form.patchValue({
        bairro: {
          id: params['bairro_id'],
          nome: params['bairro_nome']
        }
      });

      // trava o id, pois já foi definido pela navegação
      this.form.get('bairro.id')?.disable();
    }
  });
}

salvar() {
    if (this.form.invalid) return;

    const area: Area = this.form.getRawValue();
    this.bairro_id = area.bairro.id;

    if (this.id) {
      // edição
      this.areaService.atualizarArea(this.id, area).subscribe(() => {
        alert('Area atualizado com sucesso!');
        this.router.navigate(['/areas']);
      }, error => {
        alert('Erro ao atualizar a area.');
        console.error(error);
      });
    } else {
      // criação
      this.areaService.criarArea(area, this.bairro_id).subscribe(() => {
        alert('Area criado com sucesso!');
        this.router.navigate(['/areas']);
      },
        error => {
          alert('Erro ao criar a area.');
          console.error(error);
          console.error.name;
        });
    }
  }

  



}
