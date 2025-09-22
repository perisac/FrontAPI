import { Component, OnInit } from '@angular/core';
import { AreaService } from '../../../shared/services/area/area-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoteService } from '../../../shared/services/lote/lote-service';
import { CustomValidators } from '../../../shared/validators/CustomValidators';
import { Lote } from '../../../shared/models/lote.model';

@Component({
  selector: 'app-lotes-form',
  standalone: false,
  templateUrl: './lotes-form.html',
  styleUrl: './lotes-form.css'
})
export class LotesForm implements OnInit {

  id!: number;
  area_id!: number;
  titulo = 'Novo Lote'
  form!: FormGroup;

  constructor(private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loteService: LoteService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      numero: [null, [Validators.required]],
      area_Lote: [null, [Validators.required, Validators.min(0)]],
      area_rel: this.fb.group({
        id: ['',
          {
            validators: [Validators.required],
            asyncValidators: [CustomValidators.areaExistente(this.areaService)],
            updateOn: 'blur'
          }
        ],
        nome: ['']
      })
    });

    const areaId = this.route.snapshot.paramMap.get('areaId');
    if (areaId) {
      this.form.patchValue({
        area_rel: { id: Number(areaId) }
      });

      // trava o campo id para não permitir alteração
      this.form.get('area_rel.id')?.disable();

      // 📌 Caso 2: edição de bairro existente
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      if (this.id) {
        this.titulo = 'Editar Lote';
        this.loteService.buscarPorId(this.id).subscribe(lote => {
          this.form.patchValue(lote);

          // se vier com area já definida, trava o campo
          if (lote.area_rel?.id) {
            this.form.get('bairro.id')?.disable();
          }
        });
      }

      this.route.queryParams.subscribe(params => {
        if (params['area_rel_id']) {
          this.form.patchValue({
            area: {
              id: params['area_rel_id'],
            }
          });

          // trava o id, pois já foi definido pela navegação
          this.form.get('area_rel.id')?.disable();
        }
      });
    }
  }

  salvar() {
      if (this.form.invalid) return;
  
      const lote: Lote = this.form.getRawValue();
      this.area_id = lote.area_rel.id;
  
      if (this.id) {
        // edição
        this.loteService.atualizarLote(this.id, lote).subscribe(() => {
          alert('Lote atualizado com sucesso!');
          this.router.navigate(['/areas']);
        }, error => {
          alert('Erro ao atualizar o lote.');
          console.error(error);
        });
      } else {
        // criação
        this.loteService.criarLote(lote, this.area_id).subscribe(() => {
          alert('Lote criado com sucesso!');
          this.router.navigate(['/lotes']);
        },
          error => {
            alert('Erro ao criar o lote.');
            console.error(error);
            console.error.name;
          });
      }
    }
}
