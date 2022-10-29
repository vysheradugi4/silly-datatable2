import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SillyDatatable2SearchComponent } from './silly-datatable2-search/silly-datatable2-search.component';
import { SillyDatatable2PagingComponent } from './silly-datatable2-paging/silly-datatable2-paging.component';
import { DirectivesModule } from './../directives/directives.module';
import { SillyDatatable2FilterComponent } from './silly-datatable2-filter/silly-datatable2-filter.component';
import { FilterFieldComponent } from './filter-field/filter-field.component';
import { ComponentCellComponent } from './component-cell/component-cell.component';
import { PipesModule } from './../pipes/pipes.module';
import { SillyDatatable2OptionsComponent } from './silly-datatable2-options/silly-datatable2-options.component';


@NgModule({
  imports: [
    CommonModule,
    DirectivesModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  declarations: [
    SillyDatatable2SearchComponent,
    SillyDatatable2PagingComponent,
    SillyDatatable2FilterComponent,
    SillyDatatable2OptionsComponent,
    FilterFieldComponent,
    ComponentCellComponent,
  ],
  exports: [
    SillyDatatable2SearchComponent,
    SillyDatatable2PagingComponent,
    SillyDatatable2FilterComponent,
    SillyDatatable2OptionsComponent,
    ComponentCellComponent,
  ],
})
export class ComponentsModule {

}
