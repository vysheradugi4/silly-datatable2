import { NgModule } from '@angular/core';
import { SillyDatatable2Module } from 'projects/silly-datatable2/src/public-api';

import { EditButtonComponent } from './edit-button/edit-button.component';
import { TableOptionsComponent } from './table-options/table-options.component';
import { TablePagingComponent } from './table-paging/table-paging.component';


@NgModule({
  imports: [
    SillyDatatable2Module,
  ],
  declarations: [
    EditButtonComponent,
    TableOptionsComponent,
    TablePagingComponent,
  ],
  exports: [
    EditButtonComponent,
    TableOptionsComponent,
    TablePagingComponent,
  ],
})
export class ComponentsModule {

}
