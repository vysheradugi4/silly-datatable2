import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { PaginationSettings } from 'projects/silly-datatable2/src/public-api';


@Component({
  selector: 'app-table-paging',
  templateUrl: './table-paging.component.html',
  styleUrls: ['./table-paging.component.scss'],
})
export class TablePagingComponent implements OnInit {

  @ViewChild('tablePaging', { static: true }) public tablePaging: any;

  public paginationSettings: PaginationSettings | null = null;

  @Output() public paging = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.paginationSettings = {
      infoClass: 'info-class',
      containerClass: 'container-class',
      arrowButtonClass: 'arrow-button-class',
      numberButtonClass: 'number-button-class',
      start: '&laquo;',
      prev: '&lsaquo;',
      next: '&rsaquo;',
      last: '&raquo;',
    } as PaginationSettings;

    this.paging.emit(this.tablePaging);
  }
}
