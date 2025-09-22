// src/app/shared/validators/custom-validators.ts
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, catchError, of } from 'rxjs';
import { MunicipioService } from '../services/municipio/municipio-service';
import { BairroService } from '../services/bairro/bairro-service';
import { AreaService } from '../services/area/area-service';

export class CustomValidators {

  // 🔹 Valida se o município existe pelo id_ibge
  static municipioExistente(municipioService: MunicipioService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null); // campo vazio → não valida aqui
      }
      return municipioService.buscarPorIdIbge(control.value).pipe(
        map(() => null), // encontrado → válido
        catchError(() => of({ municipioInvalido: true })) // não encontrado → inválido
      );
    };
  }

  static naoVazio(control: AbstractControl) {
    return control.value?.trim() ? null : { vazio: true };
  }

  static bairroExistente(bairroService : BairroService): AsyncValidatorFn{
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null); // campo vazio → não valida aqui
      }
      return bairroService.buscarPorId(control.value).pipe(
        map(() => null), // encontrado → válido
        catchError(() => of({ bairroInvalido: true })) // não encontrado → inválido
      );
    };
  }

  static areaExistente(areaService : AreaService): AsyncValidatorFn{
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null); // campo vazio → não valida aqui
      }
      return areaService.buscarPorId(control.value).pipe(
        map(() => null), // encontrado → válido
        catchError(() => of({ areaInvalida: true })) // não encontrado → inválido
      );
    };
  }
}
