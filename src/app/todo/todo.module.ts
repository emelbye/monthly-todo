import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DpDatePickerModule } from 'ng2-date-picker';
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
  MatSelectModule,
  MatChipsModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatToolbarModule
} from '@angular/material';

import { TodoComponent } from './todo.component';
import { MatButtonGridRenderModule } from '../grid-custom-components/mat-button-grid-render/mat-button-grid-render.module';
import { CustomDateFilterModule } from '../grid-custom-components/custom-date-filter/custom-date-filter.module';
import { CustomBooleanFilterModule } from '../grid-custom-components/custom-boolean-filter/custom-boolean-filter.module';
import { MatCheckboxGridModule } from '../grid-custom-components/mat-checkbox-grid/mat-checkbox-grid.module';
import { environment } from '../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatTooltipModule,
    MatChipsModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatToolbarModule,
    MatSelectModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    MatCheckboxGridModule,
    MatButtonGridRenderModule,
    CustomDateFilterModule,
    CustomBooleanFilterModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [TodoComponent]
})
export class TodoModule { }
