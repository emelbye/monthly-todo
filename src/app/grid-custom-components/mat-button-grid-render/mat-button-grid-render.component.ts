import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid';
import { RowNode } from 'ag-grid/dist/lib/entities/rowNode';

@Component({
    selector: 'app-mat-button-grid-render',
    template: `<button mat-mini-fab color="primary" (click)="remove()">
              <mat-icon>remove</mat-icon>
            </button>`
})
export class MatButtonGridRenderComponent implements ICellRendererAngularComp {

    public params: ICellRendererParams;

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    public remove() {
        let key = this.params.data.key;
        this.params.context.componentParent.removeFromComponent(key);
        this.params.context.componentParent.updateAmount();
    }

    refresh(): boolean {
        return false;
    }
}
