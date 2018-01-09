import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { IAfterGuiAttachedParams, ICellRendererParams } from "ag-grid";

@Component({
    selector: 'checkbox-cell',
    templateUrl: './mat-checkbox-grid.html'
})
export class MatCheckboxGridComponent implements ICellRendererAngularComp {
    
    private params: any;
    public checked: boolean = false;

    agInit(params: ICellRendererParams): void {
        this.params = params;
        this.checked = this.params.value;
    }

    refresh(params: any): boolean {
        return false;
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
        
    }

    onChange(checked: boolean) {
        this.checked = checked;
        this.params.node.setDataValue(this.params.colDef, this.checked);

        let key = this.params.data.key;
        this.params.context.componentParent.updateFromComponent(key, checked);
    }
}