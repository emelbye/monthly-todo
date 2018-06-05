import { Component, OnInit, Inject } from '@angular/core';
import { Item } from './item';
import { ItemService } from './item.service';
import { MatTableDataSource } from '@angular/material';
import { GridApi, GridOptions } from 'ag-grid';
import { CustomBooleanFilterComponent } from '../grid-custom-components/custom-boolean-filter/custom-boolean-filter.component';
import { MatCheckboxGridComponent } from '../grid-custom-components/mat-checkbox-grid/mat-checkbox-grid.component';
import { MatButtonGridRenderComponent } from '../grid-custom-components/mat-button-grid-render/mat-button-grid-render.component';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

    public item: Item = new Item();
    public context;

    gridApi: GridApi;
    gridColumnApi;
    columnDefs;
    rowData;
    gridOptions: GridOptions;

    constructor(private itemService: ItemService) {

        this.context = { componentParent: this };

        this.gridOptions = <GridOptions>{};
        this.gridOptions.enableFilter = true;
        this.gridOptions.enableSorting = true;
        this.gridOptions.rowSelection = 'simple';

        this.columnDefs = [
            { headerName: 'Key', field: 'key', hide: true },
            { headerName: 'Name', field: 'name', filter: 'text' },
            { headerName: 'Amount', field: 'amount', filter: 'number', editable: true, cellRenderer: (params) => this.renderPeso(params) },
            { headerName: 'Auto', field: 'auto', filterFramework: CustomBooleanFilterComponent, cellRendererFramework: MatCheckboxGridComponent, width: 125 },
            { headerName: '', suppressFilter: true, cellRendererFramework: MatButtonGridRenderComponent, width: 75 }
        ];
    }

    ngOnInit(): void {
        this.items.subscribe(itemList =>
            this.rowData = itemList
        );
    }

    get items(): any {
        return this.itemService.getItems();
    }

    getItemByKey(key) {
        return this.itemService.getItemByKey(key);
    }

    removeItem(key) {
        this.itemService.deleteItemByKey(key);
    }

    addItem() {
        let addedItem = this.itemService.addItem(this.item);
        this.item = new Item();
        return addedItem;
    }

    updateItem(key, values) {
        this.itemService.updateItemByKey(key, values);
    }

    // Call from MatCheckboxGridComponent for auto field
    updateFromComponent(key, checked) {
        this.updateItem(key, { auto: checked });
    }

    // Call from MatButtonGridRenderComponent
    removeFromComponent(key) {
        this.removeItem(key);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridColumnApi.autoSizeColumns();
    }

    renderPeso(params: any) {
        if (params.value)
            return '$ ' + params.value;
        else
            return '$ 0';
    }

    onCellValueChanged(params: any) {
        var colId = params.column.getId();
        if (colId === 'amount') {
            this.updateItem(params.data.key, params.data);
        }
    }
}
