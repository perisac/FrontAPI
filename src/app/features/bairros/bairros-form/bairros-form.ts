import { Component, OnInit } from '@angular/core';
import { BairroService } from '../../../shared/services/bairro/bairro-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bairro, SituacaoReurb, TipoReurb } from '../../../shared/models/bairro.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from '../../../shared/validators/CustomValidators';
import { MunicipioService } from '../../../shared/services/municipio/municipio-service';

@Component({
  selector: 'app-bairros-form',
  standalone: false,
  templateUrl: './bairros-form.html',
  styleUrl: './bairros-form.css'
})
export class BairrosForm implements OnInit {

  form!: FormGroup
  id!: number;
  titulo = 'Novo Bairro';
  municipio_id!: number;

  SituacaoReurb = SituacaoReurb; // <- referencia o enum para usar no template
  TipoReurb = TipoReurb; // <- referencia o enum para usar no template

  constructor(private bairroService: BairroService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private municipioService: MunicipioService
  ) { }

ngOnInit(): void {
  this.form = this.fb.group({
    nome: ['', Validators.required],
    situacao_reurb: [false, Validators.required],
    tipo_reurb: [false, Validators.required],
    municipio: this.fb.group({
      id: [
        '',
        {
          validators: [Validators.required],
          asyncValidators: [CustomValidators.municipioExistente(this.municipioService)],
          updateOn: 'blur'
        }
      ],
      nome: ['']
    })
  });

  // 📌 Caso 1: formulário aberto a partir do municipio-detail (rota com municipioId)
  const municipioId = this.route.snapshot.paramMap.get('municipioId');
  if (municipioId) {
    this.form.patchValue({
      municipio: { id: Number(municipioId) }
    });

    // trava o campo id para não permitir alteração
    this.form.get('municipio.id')?.disable();

    // (opcional) preenche nome do município para exibir
    this.municipioService.buscarPorIdIbge(Number(municipioId)).subscribe(m => {
      this.form.patchValue({
        municipio: { nome: m.nome }
      });
    });
  }

  // 📌 Caso 2: edição de bairro existente
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  if (this.id) {
    this.titulo = 'Editar Bairro';
    this.bairroService.buscarPorId(this.id).subscribe(bairro => {
      this.form.patchValue(bairro);

      // se vier com município já definido, trava o campo
      if (bairro.municipio?.id) {
        this.form.get('municipio.id')?.disable();
      }
    });
  }

  // 📌 Caso 3: params por querystring (opcional, vindo do router.navigate)
  this.route.queryParams.subscribe(params => {
    if (params['municipio_id'] && params['municipio_nome']) {
      this.form.patchValue({
        municipio: {
          id: params['municipio_id'],
          nome: params['municipio_nome']
        }
      });

      // trava o id, pois já foi definido pela navegação
      this.form.get('municipio.id')?.disable();
    }
  });
}

  salvar() {
    if (this.form.invalid) return;

    const bairro: Bairro = this.form.getRawValue();
    this.municipio_id = bairro.municipio.id;

    if (this.id) {
      // edição
      this.bairroService.atualizarBairro(this.id, bairro).subscribe(() => {
        alert('Bairro atualizado com sucesso!');
        this.router.navigate(['/bairros']);
      }, error => {
        alert('Erro ao atualizar o bairro.');
        console.error(error);
      });
    } else {
      // criação
      this.bairroService.criarBairro(bairro, this.municipio_id).subscribe(() => {
        alert('Bairro criado com sucesso!');
        this.router.navigate(['/bairros']);
      },
        error => {
          alert('Erro ao criar o bairro.');
          console.error(error);
          console.error.name;
        });
    }
  }

}
