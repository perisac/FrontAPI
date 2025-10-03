import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssessorService } from '../../../shared/services/assessor/assessor-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assessor } from '../../../shared/models/assessor.model';

@Component({
  selector: 'app-assessor-form',
  standalone: false,
  templateUrl: './assessor-form.html',
  styleUrl: './assessor-form.css'
})
export class AssessorForm implements OnInit {

  form!: FormGroup;
  id!: number | null;
  titulo = 'Cadastrar Assessor';
  selectedFile?: File;
  fotoUrl?: string;

  constructor(
    private fb: FormBuilder,
    private assessorService: AssessorService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

ngOnInit(): void {
  this.form = this.fb.group({
    nome: ['', Validators.required]
  });

  // Verifica se está em edição
  this.id = Number(this.route.snapshot.paramMap.get('id'));
  if (this.id) {
    this.titulo = 'Editar Assessor';
    this.assessorService.buscarPorId(this.id).subscribe(assessor => {
      this.form.patchValue(assessor);
      // Carrega foto existente
      if (assessor.foto) {
        this.fotoUrl = assessor.foto;
      }
    });
  }
}

// Seleção de arquivo
onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;
  this.selectedFile = input.files[0];

  // Preview da imagem
  const reader = new FileReader();
  reader.onload = () => this.fotoUrl = reader.result as string;
  reader.readAsDataURL(this.selectedFile);
}

salvar() {
  if (this.form.invalid) return;

  const assessor: Assessor = this.form.value;

  if (this.id) {
    // edição
    this.assessorService.atualizarAssessor(this.id, assessor).subscribe(() => {
      // Se houver foto selecionada, atualiza
      if (this.selectedFile) {
        this.assessorService.atualizarFoto(this.id!, this.selectedFile).subscribe(res => {
          this.fotoUrl = res.url;
          alert('Assessor e foto atualizados com sucesso!');
          this.router.navigate(['/assessores']);
        });
      } else {
        alert('Assessor atualizado com sucesso!');
        this.router.navigate(['/assessores']);
      }
    });
  } else {
    // criação
    this.assessorService.cadastrarAssessor(assessor).subscribe(created => {
      const novoId = created.id; // precisa do ID do assessor criado
      if (this.selectedFile && novoId) {
        this.assessorService.uploadFoto(novoId, this.selectedFile).subscribe(res => {
          this.fotoUrl = res.url;
          alert('Assessor e foto cadastrados com sucesso!');
          this.router.navigate(['/assessores']);
        });
      } else {
        alert('Assessor cadastrado com sucesso!');
        this.router.navigate(['/assessores']);
      }
    });
  }

}
}