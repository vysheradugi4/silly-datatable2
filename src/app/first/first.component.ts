import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { EditButtonComponent } from 'src/app/shared/components/edit-button/edit-button.component';
import { Parent } from 'src/app/parent';
import { Column, FilterFormField, FilterSettings, Pagination, PaginationSettings, TableParams, TableSettings } from 'projects/silly-datatable2/src/public-api';


@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent extends Parent implements OnInit {

  @ViewChild('customInput', { static: true }) public customInput: TemplateRef<any> | null = null;

  public settings: TableSettings = {
    tableClass: 'table',
    headerRowClass: 'header-row',
    rowClass: 'data-row',
    sortHeaderClass: 'sort',
    itemsPerPageList: [1, 3, 5],
    batchSelect: true,
    disableRowDoubleClicked: true,
  } as TableSettings;



  public paginationSettings: PaginationSettings | null = null;
  public columns: Array<Column> = [
    {
      id: 'id',
      title: 'No.',
      headerClass: 'id',
      cellClass: 'cell',
      sortable: true,
    } as Column,
    {
      id: 'name',
      title: 'Name',
      headerClass: 'name',
      cellClass: 'cell',
      sortable: true,
      prepareCellFunction: (value: string, row: any, td: HTMLElement, tr: HTMLElement) => {
        td.classList.add('tester');
        return value.toUpperCase();
      },
    } as Column,
    {
      id: 'description',
      title: 'Description',
      headerClass: 'description',
      cellClass: 'cell',
      sortable: false,

    } as Column,
    {
      id: 'contact.address',
      title: 'Contact',
      headerClass: 'contact',
      cellClass: 'cell',
      sortable: true,
    } as Column,
    {
      id: 'action',
      title: 'Action',
      headerClass: 'action',
      cellClass: 'cell',
      sortable: false,
      componentCell: EditButtonComponent,
      // prepareCellFunction: (component, row, td, tr) => {
      //   if (!row.action) {
      //     component.disabled = true;
      //   }
      // },
    } as Column,
  ];
  public source: Array<any> | null = null;

  public detailsDropboxFilter: FilterFormField = {
    id: 'details',
    type: 'dropbox',
    name: 'details',
    placeholder: 'Select details ...',
    value: null,
    valueKeyName: 'value',
    controlContainerClass: 'control-container',
    labelContainerClass: 'label-container',
    formControlLabel: 'Dropbox',
  } as FilterFormField;

  public filterFormFields: Array<FilterFormField> = [
    {
      id: 'dateRange',
      type: 'custom',
      name: 'dateRange',
      placeholder: 'custom control',
      controlContainerClass: 'control-container',
      labelContainerClass: 'label-container',
      formControlLabel: 'Textbox',
      customInput: this.customInput,
    } as FilterFormField,
    {
      id: 'name',
      type: 'textbox',
      name: 'name',
      placeholder: 'Enter name...',
      value: 'faster',
      controlContainerClass: 'control-container',
      labelContainerClass: 'label-container',
      formControlLabel: 'Textbox',
    } as FilterFormField,
    {
      id: 'type',
      type: 'dropbox',
      name: 'type',
      value: null,
      placeholder: 'Select type ...',
      valueKeyName: 'value',
      source: [
        { key: 1, value: 'Test value 1' },
        { key: 2, value: 'Test value 2' },
        { key: 3, value: 'Test value 3' },
      ],
      controlContainerClass: 'control-container',
      labelContainerClass: 'label-container',
      formControlLabel: 'Dropbox',
    } as FilterFormField,

    this.detailsDropboxFilter,
  ]


  public filterSettings: FilterSettings = {
    formContainerClass: 'filter-container',
    cancelButtonClass: 'cancel-button-class',
    cancelButtonTitle: 'Close',
    submitButtonClass: 'submit-button-class',
    submitButtonTitle: 'Submit',
  } as FilterSettings;;

  public optionsComponent: any;
  public pagingComponent: any;

  public loading = false;

  private _tableParams: TableParams = new TableParams();

  constructor() {
    super();
  }

  public get tableParams(): TableParams {
    return this._tableParams;
  }


  public set tableParams(value: TableParams) {
    this._tableParams = Object.assign({}, this._tableParams, { source: this.source });
    console.log('Request with table params = ', value);
  }


  ngOnInit(): void {

    this._tableParams.pagination = {
      pageNumber: 0,
      pageCount: 5,
      itemsPerPage: 1,
    } as Pagination;

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


    this.source = [
      { id: 1, name: 'test1', description: 'some description', contact: { address: 'first' }, action: true },
      { id: 2, name: 'test2', description: 'some description', contact: { address: 'second' }, action: true },
      { id: 3, name: 'test3', description: 'some description', contact: { address: 'third' }, action: false },
      { id: 4, name: 'test4', description: 'some description', contact: { address: 'fourth' }, action: true },
      { id: 5, name: 'test5', description: 'some description', contact: { address: 'fifth' }, action: true },
    ];
  }


  public selected(row: any) {
    console.log('Clicked row = ', row);
  }


  public dblClickSelected(row: any) {
    console.log('Double clicked row = ', row);
  }


  public eventInCellComponent(event: any) {
    console.log('event and data from cell component = ', event);
  }


  public batchSelected(rows: Event) {
    console.log('batch selected rows = ', rows);
  }


  public filterValueChanges(filterData: any) {
    if (!this.detailsDropboxFilter) {
      return;
    }

    if (filterData.type && !filterData.details) {
      this.detailsDropboxFilter.source = [
        { key: 1, value: 'Test value 1' },
        { key: 2, value: 'Test value 2' },
        { key: 3, value: 'Test value 3' },
      ];
    }
  }

  public getOptions(component: any) {
    setTimeout(() => {
      this.optionsComponent = component;
    });
  }


  public getPaging(component: any) {
    setTimeout(() => {
      this.pagingComponent = component;
    });
  }
}
