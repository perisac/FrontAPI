import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MunicipioList } from './features/municipios/municipio-list/municipio-list';
import { MunicipiosForm } from './features/municipios/municipios-form/municipios-form/municipios-form';
import { MunicipioDetail } from './features/municipios/municipio-detail/municipio-detail/municipio-detail';
import { BairrosList } from './features/bairros/bairros-list/bairros-list';
import { BairrosForm } from './features/bairros/bairros-form/bairros-form';
import { BairrosDetail } from './features/bairros/bairros-detail/bairros-detail';
import { AreasList } from './features/areas/areas-list/areas-list';
import { AreasForm } from './features/areas/areas-form/areas-form';

const routes: Routes = [
  { path: 'municipios', component: MunicipioList },
  { path: 'municipios/novo', component: MunicipiosForm },
  { path: 'municipios/editar/:id', component: MunicipiosForm },
  { path: 'municipios/:id', component: MunicipioDetail},
  { path: 'bairros', component: BairrosList },
  { path: 'bairros/novo/:municipioId', component: BairrosForm },
  { path : 'bairros/novo', component: BairrosForm },
  { path: 'bairros/editar/:id', component: BairrosForm },
  { path: 'bairros/municipio/:municipioId', component: BairrosList },
  { path: 'bairros/:id', component : BairrosDetail },
  { path: 'areas', component: AreasList},
  { path: 'areas/novo', component: AreasForm},
  { path: 'areas/editar/:id', component: AreasForm},
  { path: 'areas/bairros/:bairroId', component: AreasList},
  { path: 'areas/novo/:bairroId', component: AreasForm}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
