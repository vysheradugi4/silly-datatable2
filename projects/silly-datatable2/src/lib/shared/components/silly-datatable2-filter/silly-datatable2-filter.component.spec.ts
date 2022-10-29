import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormArray } from '@angular/forms';

import { SillyDatatable2FilterComponent } from './silly-datatable2-filter.component';
import { FilterFieldComponent } from './../filter-field/filter-field.component';
import { FilterFormField } from './../../models/filter-form-field.model';
import { FilterSettings } from 'projects/silly-datatable2/src/lib/shared/models/filter-settings.model';


describe('SillyDatatable2FilterComponent', () => {
  let component: SillyDatatable2FilterComponent;
  let fixture: ComponentFixture<SillyDatatable2FilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [
        SillyDatatable2FilterComponent,
        FilterFieldComponent,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SillyDatatable2FilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should emit filter values when apply filters', (done) => {
    const nameFormField = new FilterFormField();
    nameFormField.id = 'name';
    nameFormField.name = 'name';

    component.formFields = [nameFormField];
    (component as any).initFormFieldsLogic();

    component.filtersUpdated$.subscribe((filterValues) => {
      expect(filterValues[0].value).toBe('test');
      done();
    });

    (component.filterForm.controls.filters as FormArray).controls[0].setValue('test');
    component.applyFilters();
  });

  it('should emit filter values', (done) => {
    const nameFormField = new FilterFormField();
    nameFormField.id = 'name';
    nameFormField.name = 'name';

    component.formFields = [nameFormField];
    (component as any).initFormFieldsLogic();

    component.valueChanges.subscribe((filterValues) => {
      expect(filterValues[0].value).toBe('test');
      done();
    });

    (component.filterForm.controls.filters as FormArray).controls[0].setValue('test');
  });

  it('should be emit when call cancel', (done) => {
    component.settings = new FilterSettings();
    component.formFields = [];
    component.settings.cancelButtonClass = 'cancel';
    fixture.detectChanges();
    component.cancel.subscribe((value: null) => {
      expect(value).toBeNull();
      done();
    });

    const cancelButton = fixture.debugElement.nativeElement.querySelector('.cancel');
    cancelButton.click();
  });
});
