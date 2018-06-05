import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { AngularFireModule } from 'angularfire2';
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

import { ItemComponent } from './item.component';
import { MatCheckboxGridModule } from '../grid-custom-components/mat-checkbox-grid/mat-checkbox-grid.module';
import { MatButtonGridRenderModule } from '../grid-custom-components/mat-button-grid-render/mat-button-grid-render.module';
import { environment } from '../../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';

@NgModule({
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
        AgGridModule.withComponents([]),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule
    ],
    declarations: [ItemComponent]
})
export class ItemModule { }
