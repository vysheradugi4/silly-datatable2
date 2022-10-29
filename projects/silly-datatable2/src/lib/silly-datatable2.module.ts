import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SillyDatatable2Component } from './silly-datatable2.component';
import { ComponentsModule } from './shared/components/components.module';
import { SillyDatatable2SearchComponent } from './shared/components/silly-datatable2-search/silly-datatable2-search.component';
import { SillyDatatable2PagingComponent } from './shared/components/silly-datatable2-paging/silly-datatable2-paging.component';
import { SillyDatatable2FilterComponent } from './shared/components/silly-datatable2-filter/silly-datatable2-filter.component';
import { SillyDatatable2OptionsComponent } from './shared/components/silly-datatable2-options/silly-datatable2-options.component';
import { PipesModule } from './shared/pipes/pipes.module';
import { StoreService } from './shared/services/store.service';
import { DirectivesModule } from './shared/directives/directives.module';


@NgModule({
  declarations: [
    SillyDatatable2Component,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    DirectivesModule,
  ],
  exports: [
    SillyDatatable2Component,
    SillyDatatable2SearchComponent,
    SillyDatatable2PagingComponent,
    SillyDatatable2FilterComponent,
    SillyDatatable2OptionsComponent,
  ],
  providers: [
    StoreService,
  ],
})
export class SillyDatatable2Module { }
