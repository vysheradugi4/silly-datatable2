import { EventEmitter } from '@angular/core';


export interface ComponentCell {
  row: any;
  columnId: string | null;
  params: any;
  componentCellEvent: EventEmitter<any>;
}
