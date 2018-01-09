import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ItemComponent } from './item.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from './item.service';
import {
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatTooltipModule,
  MatCheckboxModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Item } from './item';
import { ItemServiceMock } from './item.service.mock';
import { AgGridModule } from 'ag-grid-angular';
import { MatCheckboxGridModule } from '../grid-custom-components/mat-checkbox-grid/mat-checkbox-grid.module';
import { MatButtonGridRenderModule } from '../grid-custom-components/mat-button-grid-render/mat-button-grid-render.module';
import { Observable } from 'rxjs/Observable';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatTooltipModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        MatCheckboxGridModule,
        MatButtonGridRenderModule,
        AgGridModule.withComponents([])
      ],
      declarations: [ ItemComponent ],
      providers: [ {provide: ItemService, useClass: ItemServiceMock } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get items', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(component.rowData.length).toBe(4);
  }));

  it('should get an item by key', () => {
    let item = component.getItemByKey('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1');
    expect(item).toBeDefined();
    expect(item.key).toBe("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1");
    expect(item.name).toBe('Item name 1');
  });

  it('should add an item', () => {
    component.item = new Item();
    component.item.name = 'Test item';

    let addedItem = component.addItem();
    expect(addedItem).toBeDefined();
    expect(addedItem.key).toBeDefined();

    let item : Item = component.getItemByKey(addedItem.key);
    expect(item).toBeDefined();
    expect(item.key).toBe(addedItem.key);
    expect(item.name).toBe(addedItem.name);
    expect(item.auto).toBe(addedItem.auto);
  });

  it('should remove the item', () => {
    let lenght = component.rowData.length;
    component.removeItem('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1');
    expect(component.rowData.length).toBe(lenght-1);

    let item = component.getItemByKey('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1');
    expect(item).toBeUndefined();
  });

});
