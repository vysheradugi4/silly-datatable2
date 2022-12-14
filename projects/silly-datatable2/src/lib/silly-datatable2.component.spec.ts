import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormArray } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { skip } from 'rxjs/operators';

import { SillyDatatable2Component } from './silly-datatable2.component';
import { ComponentsModule } from './shared/components/components.module';
import { TableParams } from './shared/models/table-params.model';
import { PipesModule } from './shared/pipes/pipes.module';
import { SillyDatatable2SearchComponent } from './shared/components/silly-datatable2-search/silly-datatable2-search.component';
import { Pagination } from 'projects/silly-datatable2/src/lib/shared/models/pagination.model';
import { SillyDatatable2FilterComponent } from './shared/components/silly-datatable2-filter/silly-datatable2-filter.component';
import { FilterFormField } from './shared/models/filter-form-field.model';
import { SillyDatatable2PagingComponent } from './shared/components/silly-datatable2-paging/silly-datatable2-paging.component';
import { StoreService } from './shared/services/store.service';
import { Column } from './shared/models/column.model';
import { SillyDatatable2OptionsComponent } from './shared/components/silly-datatable2-options/silly-datatable2-options.component';
import { TableSettings } from './shared/models/table-settings.model';
import { DirectivesModule } from './shared/directives/directives.module';


describe('SillyDatatable2Component', () => {
  let component: SillyDatatable2Component;
  let fixture: ComponentFixture<SillyDatatable2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        PipesModule,
        ReactiveFormsModule,
        DirectivesModule,
      ],
      declarations: [SillyDatatable2Component],
      providers: [
        StoreService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatable2Component);
    component = fixture.componentInstance;
    component.id = 'sole';
    const tableParams = {
      pagination: new Pagination(),
    } as TableParams;
    (component as SillyDatatable2Component).tableParams = tableParams;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });


  /**
   * ngOnInit
   */

  it('onInit should return throw when id not defined', () => {
    const fixture2 = TestBed.createComponent(SillyDatatable2Component);
    component = fixture2.componentInstance;
    expect(() => fixture2.detectChanges()).toThrow(new Error('Table id required.'));
  });

  it('onInit should return throw when tableParams not defined', () => {
    const fixture2 = TestBed.createComponent(SillyDatatable2Component);
    component = fixture2.componentInstance;
    component.id = 'sole';
    expect(() => fixture2.detectChanges()).toThrow(new Error('Table params required.'));
  });


  /**
   * Sort.
   */

  it('sortEnable should add sort param with columnName `name` in tableParams object', fakeAsync(() => {
    let tableParams: TableParams;

    component.tableParamsChange.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    tick();
    expect(tableParams.sort.columnName).toBe('name');
  }));

  it('sortEnable should add sort param with isDesc param equal false in tableParams object', fakeAsync(() => {
    let tableParams: TableParams;

    component.tableParamsChange.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    tick();
    expect(tableParams.sort.isDesc).toBeFalsy();
  }));

  it('sortEnable should add sort param with isDesc param equal true in tableParams object after second click', fakeAsync(() => {
    let tableParams: TableParams;

    component.tableParamsChange.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    component.sortEnable('name');
    tick();
    expect(tableParams.sort.isDesc).toBeTruthy();
  }));

  it('sortEnable should add sort param with isDesc param equal false in tableParams object after third click', fakeAsync(() => {
    let tableParams: TableParams;

    component.tableParamsChange.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    component.sortEnable('name');
    component.sortEnable('name');
    tick();
    expect(tableParams.sort.isDesc).toBeFalsy();
  }));

  it('sortEnable should change column name to `age`', fakeAsync(() => {
    let tableParams: TableParams;

    component.tableParamsChange.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    component.sortEnable('age');
    tick();
    expect(tableParams.sort.columnName).toBe('age');
  }));

  it('sortEnable should change isDesc to false when change name to `age`', fakeAsync(() => {
    let tableParams: TableParams;

    component.tableParamsChange.subscribe((request) => {
      tableParams = request;
    });

    component.sortEnable('name');
    component.sortEnable('name');
    component.sortEnable('age');
    tick();
    expect(tableParams.sort.isDesc).toBeFalsy();
  }));


  /**
   * Click by row.
   */

  it('should call rowClicked', (done) => {
    component.rowClicked.subscribe((clickedRow) => {
      expect(clickedRow).toEqual({ id: 1 });
      done();
    });

    component.clicked({ id: 1 });
  });

  it('should return undefined when row is not defined', () => {
    expect(component.clicked(undefined)).toBeUndefined();
  });


  it('should not emit rowClicked if double click', fakeAsync(() => {
    let row: any;

    component.rowClicked.subscribe((clickedRow) => {
      row = clickedRow;
    });

    component.clicked({ id: 1 });
    component.doubleClicked({ id: 1 });

    tick(500);

    fixture.whenStable().then(() => {
      expect(row).toBeUndefined();
    });
  }));

  it('should emit rowDoubleClicked event emitter', () => {
    let row: any;

    component.rowDoubleClicked.subscribe((clickedRow) => {
      row = clickedRow;
    });

    component.doubleClicked({ id: 1 });
    expect(row).toEqual({ id: 1 });
  });

  /**
   * Custom component cell event emit.
   */

  it('should emit componentCellEvent', () => {
    let row: any;

    component.componentCellEvent.subscribe((event) => {
      row = event;
    });
    component.onComponentCellEvent({ edit: 5 });
    expect(row).toEqual({ edit: 5 });
  });

  /**
   * Search component.
   */
  it('should request new data with search string in table params', (done) => {
    component.searchComponent = new SillyDatatableSearchComponent();
    (component as any)._searchComponent.ngOnInit();
    component.ngOnInit();

    component.tableParamsChange.subscribe((tableParams: TableParams) => {
      expect(tableParams.searchText).toBe('search string');
      done();
    });

    (component as any)._searchComponent.search.setValue('search string');
  });

  /**
   * Filter component.
   */
  it('should request new data with filter value in table params', (done) => {
    const filterComponent = new SillyDatatable2FilterComponent();
    filterComponent.formFields = [
      { id: 'name', name: 'name' } as FilterFormField,
    ];
    component.filterComponent = filterComponent;
    ((component as any)._filterComponent as any).initFormFieldsLogic();

    component.tableParamsChange.subscribe((tableParams: TableParams) => {
      expect(tableParams.filters[0].value).toBe('test');
      done();
    });
    (component as any)._filterComponent.filterForm.controls.filters.controls[0].setValue('test');
    (component as any)._filterComponent.applyFilters();
  });

  /**
   * Pagination component.
   */
  it('should request new data for new page', (done) => {
    component.tableParams = {
      pagination: {
        pageNumber: 0,
        pageCount: 10,
        itemsPerPage: 10,
      },
    } as any;

    let fixture2: ComponentFixture<SillyDatatable2PagingComponent>;
    fixture2 = TestBed.createComponent(SillyDatatable2PagingComponent);
    const pagingComponent = fixture2.componentInstance;

    component.pagingComponent = pagingComponent;

    component.ngOnInit();

    component.tableParamsChange.subscribe((tableParams: TableParams) => {
      expect(tableParams.pagination.pageNumber).toBe(1);
      done();
    });

    (component as any)._pagingComponent.pageRequest(1);
  });

  /**
   * Set itemsPerPage.
   */
  it('should set itemsPerPage as 1 (first element of itemsPerPageList)', () => {

    const settings = {
      itemsPerPageList: [1, 3, 5],
    } as any;

    component.settings = settings;
    component.ngOnInit();
    expect(component.tableParams.pagination.itemsPerPage).toBe(1);
  });

  it('should set value in option itemsPerPage same in stored in localStorage', () => {
    const service: StoreService = TestBed.get(StoreService);
    service.storeState('itemsPerPage', 'Object_sole', 3);

    component.columns = [
      { id: 'id', name: 'name' } as Column,
    ];

    component.settings = {
      itemsPerPageList: [1, 3, 5],
    };

    component.tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 1,
      },
    } as any;

    component.ngOnInit();

    const cdRefMock = {
      markForCheck: () => null,
    } as any;

    component.optionsComponent = new SillyDatatable2OptionsComponent(cdRefMock);

    ((component as any)._optionsComponent as any).initItemsPerPageLogic();

    expect((component as any)._optionsComponent.itemsPerPageControl.value).toBe(3);
    localStorage.clear();
  });

  /**
   * Batch select
   */
  it('should add th element into DOM when batchSelect enabled.', () => {
    const settings = {
      batchSelect: true,
      selectAllThClass: 'selectAllThClass',
    } as TableSettings;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 1 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    fixture.detectChanges();

    const th = fixture.debugElement.query(By.css('.selectAllThClass'));
    expect(th).toBeTruthy();
  });

  it('should\'t add th element into DOM when batchSelect enabled.', () => {
    const settings = {
      batchSelect: false,
      selectAllThClass: 'selectAllThClass',
    } as TableSettings;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 1 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    fixture.detectChanges();

    const th = fixture.debugElement.query(By.css('.selectAllThClass'));
    expect(th).toBeFalsy();
  });

  it('should emit first row when first checkbox is selected', (done) => {
    const settings = {
      batchSelect: true,
    } as TableSettings;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    component.batchSelectedChange.subscribe((rows: Array<any>) => {
      expect(rows[0]).toEqual(tableParams.source[0]);
      done();
    });

    (component.batchSelectFormGroup.controls.checkboxes as FormArray).controls[0].setValue(true);
  });

  it('should emit second row when second checkbox is selected', (done) => {
    const settings = {
      batchSelect: true,
    } as TableSettings;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    component.batchSelectedChange.subscribe((rows: Array<any>) => {
      expect(rows[0]).toEqual(tableParams.source[1]);
      done();
    });

    (component.batchSelectFormGroup.controls.checkboxes as FormArray).controls[1].setValue(true);
  });

  it('should emit one row when checkbox is selected', (done) => {
    const settings = {
      batchSelect: true,
    } as TableSettings;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    component.batchSelectedChange.subscribe((rows: Array<any>) => {
      expect(rows.length).toEqual(1);
      done();
    });

    (component.batchSelectFormGroup.controls.checkboxes as FormArray).controls[1].setValue(true);
  });

  it('should emit two rows when two checkboxes is selected', (done) => {
    const settings = {
      batchSelect: true,
    } as TableSettings;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    component.batchSelectedChange.subscribe((rows: Array<any>) => {
      expect(rows.length).toEqual(2);
      done();
    });

    component.batchSelectFormGroup.controls.checkboxes.setValue([true, true, false]);
  });

  it('should emit three rows when all checkboxes is selected', (done) => {
    const settings = {
      batchSelect: true,
    } as TableSettings;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    component.batchSelectedChange.subscribe((rows: Array<any>) => {
      expect(rows.length).toEqual(3);
      done();
    });

    component.selectAll.setValue(true);
  });

  it('should emit empty array rows when all checkboxes is selected and when unselected', (done) => {
    const settings = {
      batchSelect: true,
    } as TableSettings;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 1 },
        { id: 2 },
        { id: 3 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    component.batchSelectedChange.pipe(
      skip(1)
    )
      .subscribe((rows: Array<any>) => {
        expect(rows.length).toEqual(0);
        done();
      });

    component.selectAll.setValue(true);
    component.selectAll.setValue(false);
  });

  it('should disable select all controller when table.source undefined', () => {
    const settings = {
      batchSelect: true,
      selectAllCheckboxClass: 'select-all',
    } as TableSettings;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: undefined,
    } as TableParams;

    component.tableParams = tableParams;

    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('.select-all'));
    expect(checkbox.nativeElement.disabled).toBeTruthy();
  });

  it('should disable select all controller when table.source length equal zero', () => {
    const settings = {
      batchSelect: true,
      selectAllCheckboxClass: 'select-all',
    } as TableSettings;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [],
    } as TableParams;

    component.tableParams = tableParams;

    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('.select-all'));
    expect(checkbox.nativeElement.disabled).toBeTruthy();
  });

  it('should enable select all controller when table.source length equal 1', () => {
    const settings = {
      batchSelect: true,
      selectAllCheckboxClass: 'select-all',
    } as TableSettings;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 1 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    fixture.detectChanges();

    const checkbox = fixture.debugElement.query(By.css('.select-all'));
    expect(checkbox.nativeElement.disabled).toBeFalsy();
  });


  /**
   * Path in id string.
   */
  it('should ', () => {
    const settings = {
      batchSelect: true,
      selectAllCheckboxClass: 'select-all',
    } as TableSettings;

    const columns = [
      { id: 'contact.address', cellClass: 'cell' } as Column,
    ];

    component.columns = columns;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 1, contact: { address: 'test' } },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    fixture.detectChanges();

    const cell = fixture.debugElement.query(By.css('.cell'));
    expect(cell.nativeElement.innerText).toEqual('test');
  });

  it('should return value by path', () => {
    const settings = {
      batchSelect: true,
      selectAllCheckboxClass: 'select-all',
    } as TableSettings;

    const columns = [
      { id: 'contact["address"]', cellClass: 'cell' } as Column,
    ];

    component.columns = columns;

    component.settings = settings;

    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 1, contact: { address: 'test' } },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    fixture.detectChanges();

    const cell = fixture.debugElement.query(By.css('.cell'));
    expect(cell.nativeElement.innerText).toEqual('test');
  });


  /**
   * Perpare cell function.
   */
  it('should pass value in prepare cell function', () => {
    let recivedValue: number;

    const columns = [
      {
        id: 'id',
        prepareCellFunction: (value, row) => {
          recivedValue = value;
        },
      } as Column,
    ];

    component.columns = columns;


    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 111 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    fixture.detectChanges();

    expect(recivedValue).toEqual(111);
  });

  it('should pass raw in prepare cell function', () => {
    let recivedRow: any;

    const columns = [
      {
        id: 'id',
        prepareCellFunction: (_, row) => {
          recivedRow = row;
        },
      } as Column,
    ];

    component.columns = columns;


    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 111 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    fixture.detectChanges();

    expect(recivedRow).toEqual({ id: 111 });
  });


  it('should pass second raw in prepare cell function', () => {
    let recivedRow: any;

    const columns = [
      {
        id: 'id',
        prepareCellFunction: (_, row) => {
          recivedRow = row;
        },
      } as Column,
    ];

    component.columns = columns;


    const tableParams = {
      pagination: {
        pageNumber: 0,
        itemsPerPage: 10,
      } as Pagination,
      source: [
        { id: 111 },
        { id: 222 },
      ],
    } as TableParams;

    component.tableParams = tableParams;

    fixture.detectChanges();

    expect(recivedRow).toEqual({ id: 222 });
  });
});
