import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { IFilterParams, RowNode, IDoesFilterPassParams, IAfterGuiAttachedParams } from 'ag-grid';
import { AgFilterComponent } from 'ag-grid-angular';

@Component({
  selector: 'app-custom-date-filter',
  templateUrl: 'custom-date-filter.component.html'
})
export class CustomDateFilterComponent implements AgFilterComponent {
    
    private params : IFilterParams;
    private valueGetter : any;
    public text: string = '';
    public filterType: FilterType;

    agInit(params: IFilterParams): void {
        this.params = params;
        this.valueGetter = params.valueGetter;
    }

    onChange(newValue){
        this.filter(newValue, FilterType.Contains);
    }

    filter(newValue, filterType){
        this.filterType = filterType;
        this.text = newValue;
        this.params.filterChangedCallback();
    }

    clearFilter(){
        this.text = '';
        this.params.filterChangedCallback();
    }

    doesFilterPass(params: IDoesFilterPassParams): boolean {

        let date : Date = new Date(this.valueGetter(params.node));

        if(this.filterType == FilterType.Contains)
            return this.filterContains(date);
        if(this.filterType == FilterType.Lesser)
            return this.filterLesser(date);
        if(this.filterType == FilterType.Greater)
            return this.filterGreater(date);
        if(this.filterType == FilterType.Equals)
            return this.filterEquals(date);
    }

    filterContains(cellValue : Date){
        let monthFilter = new Number(this.text.split('/')[0]).toString();
        let monthValue = (cellValue.getMonth()+1).toString();

        if(this.text.split('/').length == 1){
            return monthValue == monthFilter;
        }
        else{
            let yearFilter = this.text.split('/')[1];
            let yearValue = cellValue.getFullYear().toString();
            return (monthValue == monthFilter) && (yearValue.indexOf(yearFilter) > -1);
        }
    }

    filterEquals(cellValue : Date){
        let monthFilter = (new Number(this.text.split('/')[0])).toString();
        let monthValue = (cellValue.getMonth()+1).toString();
        let yearFilter = this.text.split('/')[1];
        let yearValue = cellValue.getFullYear().toString();

        return ((yearFilter == yearValue) && (monthFilter == monthValue))
    }

    filterLesser(cellValue : Date){
        let today : Date = new Date();
        if(cellValue.getFullYear() < today.getFullYear())
            return true;
        if(cellValue.getFullYear() > today.getFullYear())
            return false;
        if(cellValue.getMonth() < cellValue.getMonth())
            return true;
    }

    filterGreater(cellValue : Date){
        let today : Date = new Date();
        if(cellValue.getFullYear() > today.getFullYear())
            return true;
        if(cellValue.getFullYear() < today.getFullYear())
            return false;
        if(cellValue.getMonth() > today.getMonth())
            return true;
    }

    getModel() {
        return {value: this.text};
    }

    setModel(model: any): void {
        this.text = model ? model.value : '';
    }

    isFilterActive(): boolean {
        return this.text !== null && this.text !== undefined && this.text !== '';
    }

    onNewRowsLoaded?(): void { }
    getFrameworkComponentInstance?() { }
    getModelAsString?(model: any): string { return ''; }
    onFloatingFilterChanged?(change: any): void { }
    afterGuiAttached?(params?: IAfterGuiAttachedParams): void { }
}

export enum FilterType {
    Contains = 0,
    Lesser = 1,
    Greater = 2,
    Equals = 3
}
