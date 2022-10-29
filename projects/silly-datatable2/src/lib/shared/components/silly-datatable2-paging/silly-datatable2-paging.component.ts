import { Component, Input, TemplateRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { PaginationSettings } from './../../models/pagination-settings.model';
import { Pagination } from './../../models/pagination.model';


@Component({
  selector: 'ngx-silly-datatable2-paging',
  templateUrl: './silly-datatable2-paging.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SillyDatatable2PagingComponent {

  /**
   * Settings for customization pagination component.
   */
  @Input() public settings: PaginationSettings | null = null;

  @Input() public set pagination(value: Pagination) {
    if (!value) {
      return;
    }

    this._pagination = value;
    this.setPageOfContext();
  }


  /**
   * Template for replace text "Page 5 of 10" to anything else with use page
   * number (use {{ currentPage + 1 }}) and pages count (use {{ numberOfPages }})
   * values.
   */
  @Input() public set pageOf(value: TemplateRef<any> | null) {
    if (!value) {
      return;
    }

    this._pageOf = value;
    this.setPageOfContext();
  }

  public pagingContext: any;

  private _pageUpdated$: Subject<number> = new Subject<number>();
  private _pagination: Pagination | null = null;
  private _pageOf: TemplateRef<any> | null = null

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  public get pageOf(): TemplateRef<any> | null {
    return this._pageOf;
  }


  public get pagination(): Pagination {
    return this._pagination!;
  }


  public get pageUpdated$(): Observable<number> {
    return this._pageUpdated$.asObservable();
  }


  public pageRequest(page: number): void {
    this._pageUpdated$.next(page);
  }


  public get currentPage(): number {
    if (!this.pagination?.pageNumber || !this.numberOfPages) {
      return 0;
    }

    if (this._pagination!.pageNumber! < 0 || (this._pagination!.pageNumber! + 1) > this.numberOfPages) {
      return 0;
    }

    return this._pagination!.pageNumber!;
  }


  public get numberOfPages(): number {
    if (!this.pagination) {
      return 0;
    }

    return this._pagination!.pageCount!;
  }


  /**
   * Start slice pages array.
   * @returns number.
   */
  public get start(): number | null {
    if (!this.currentPage) {
      return null;
    }

    if (this.currentPage < 1 || !this.numberOfPages) {
      return 0;
    }

    if ((this.numberOfPages - this.currentPage) < 3) {

      if (this.numberOfPages === 4) {
        return 0;
      }

      if (this.numberOfPages > 4) {
        return this.numberOfPages - 5;
      }
    }

    if (this.currentPage > 2) {
      return this.currentPage - 2;
    }

    return 0;
  }


  /**
   * End slice pages array.
   * @returns number.
   */
  public get end(): number | null {
    if (!this.currentPage) {
      return null;
    }

    if (this.currentPage < 2) {
      return 5;
    }

    return this.currentPage + 3;
  }


  private setPageOfContext() {

    if (!this._pagination) {
      return;
    }


    /**
     * Create context for Page .. of .. custom template.
     */
    if (this.pageOf) {
      this.pagingContext = {
        currentPage: this.currentPage,
        numberOfPages: this.numberOfPages,
      };
    }

    this._changeDetectorRef.detectChanges();
  }
}
