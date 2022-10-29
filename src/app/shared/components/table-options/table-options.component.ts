import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { OptionsSettings } from './../../../../../projects/silly-datatable2/src/lib/shared/models/options-settings.model';


@Component({
  selector: 'app-table-options',
  templateUrl: './table-options.component.html',
  styleUrls: ['./table-options.component.scss'],
})
export class TableOptionsComponent implements OnInit {

  @ViewChild('tableOptions', { static: true }) public tableOptions: any;

  public optionsSettings: OptionsSettings = {
    containerClass: 'containerClass',
    columnsSectionClass: 'columnsSectionClass',
    columnsTitleClass: 'columnsTitleClass',
    columnsTitle: 'Columns:',
    checkboxContainerClass: 'checkboxContainerClass',
    checkboxClass: 'checkboxClass',
    labelCheckboxContainerClass: 'labelCheckboxContainerClass',
    labelCheckboxClass: 'labelCheckboxClass',
    itemsPerPageSectionClass: 'itemsPerPageSectionClass',
    labelSelectClass: 'labelSelectClass',
    itemsPerPageTitle: 'Items Per Page',
    selectClass: 'selectClass',
  };

  @Output() public options = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.options.emit(this.tableOptions);
  }
}
