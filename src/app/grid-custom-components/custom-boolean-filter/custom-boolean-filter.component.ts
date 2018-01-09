import { Component, OnInit } from '@angular/core';
import { AgFilterComponent } from 'ag-grid-angular';
import { IDoesFilterPassParams, IFilterParams, IAfterGuiAttachedParams } from 'ag-grid';

@Component({
  selector: 'app-custom-boolean-filter',
  templateUrl: './custom-boolean-filter.component.html',
  styleUrls: ['./custom-boolean-filter.component.scss']
})
export class CustomBooleanFilterComponent  implements AgFilterComponent {

  private params : IFilterParams;
    private valueGetter : any;
    public checked: boolean = false;
    public indeterminate: boolean = true;

    agInit(params: IFilterParams): void {
        this.params = params;
        this.valueGetter = params.valueGetter;

        this.checked = false;
        this.indeterminate = true;
    }

    onChangeChecked(newValue): void {
      this.checked = newValue;
      this.indeterminate = false;
      this.params.filterChangedCallback();
    }

    clearFilter(){
      this.indeterminate = true;
      this.checked = false;
      this.params.filterChangedCallback();
    }

    onChangeIndeterminate(newValue): void {
      if (this.indeterminate !== newValue) {
          this.indeterminate = newValue;
          this.checked = false;
          this.params.filterChangedCallback();
      }
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {

        let dateCellValue : boolean = this.valueGetter(params.node);

        if(this.indeterminate)
          return true;

        if(this.checked && dateCellValue)
          return true;
        else if(this.checked && !dateCellValue)
          return false;
        else if(!this.checked && dateCellValue)
          return false;
        else if(!this.checked && !dateCellValue)
          return true;
    }

    getModel() {
        return {value: this.checked};
    }

    setModel(model: any): void {
        this.checked = model ? model.value : '';
    }

    isFilterActive(): boolean {
        return this.checked !== null && this.checked !== undefined;
    }

    onNewRowsLoaded?(): void { }
    getFrameworkComponentInstance?() { }
    getModelAsString?(model: any): string { return ''; }
    onFloatingFilterChanged?(change: any): void { }
    afterGuiAttached?(params?: IAfterGuiAttachedParams): void { }

}
