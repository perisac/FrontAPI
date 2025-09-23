import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { MunicipioList } from './features/municipios/municipio-list/municipio-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MunicipiosForm } from './features/municipios/municipios-form/municipios-form/municipios-form';
import { MatSelectModule  } from '@angular/material/select';
import { MunicipioDetail } from './features/municipios/municipio-detail/municipio-detail/municipio-detail';
import { MatCard, MatCardTitle, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle } from '@angular/material/card';
import { BairrosList } from './features/bairros/bairros-list/bairros-list';
import { BairrosDetail } from './features/bairros/bairros-detail/bairros-detail';
import { BairrosForm } from './features/bairros/bairros-form/bairros-form';
import { MatListModule } from '@angular/material/list';
import { Navbar } from './shared/components/navbar/navbar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbar } from '@angular/material/toolbar';
import { AreasDetail } from './features/areas/areas-detail/areas-detail';
import { AreasList } from './features/areas/areas-list/areas-list';
import { AreasForm } from './features/areas/areas-form/areas-form';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LotesDetail } from './features/lotes/lotes-detail/lotes-detail';
import { LotesList } from './features/lotes/lotes-list/lotes-list';
import { LotesForm } from './features/lotes/lotes-form/lotes-form';
import { MapsComponent } from './features/maps/maps-component/maps-component';


@NgModule({
  declarations: [
    App,
    MunicipioList,
    MunicipiosForm,
    MunicipioDetail,
    BairrosList,
    BairrosDetail,
    BairrosForm,
    Navbar,
    AreasDetail,
    AreasList,
    AreasForm,
    LotesDetail,
    LotesList,
    LotesForm,
    MapsComponent
  ],
  imports: [

    MatSlideToggle,
    MatSlideToggleModule,
    MatCheckbox,
    MatCheckboxModule,
    MatToolbar,
    MatMenuTrigger,
    MatMenu,
    MatCardHeader,
    MatCardSubtitle,
    MatListModule,
    MatCardTitle, 
    MatCardActions, 
    MatCardContent,
    MatCard,
    MatSelectModule,
    ReactiveFormsModule,
    MatIcon,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
