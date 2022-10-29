import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOptionsComponent } from './table-options.component';
import { SillyDatatableModule } from './../../../../../projects/silly-datatable2/src/lib/silly-datatable2.module';


describe('TableOptionsComponent', () => {
  let component: TableOptionsComponent;
  let fixture: ComponentFixture<TableOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SillyDatatableModule,
      ],
      declarations: [TableOptionsComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
