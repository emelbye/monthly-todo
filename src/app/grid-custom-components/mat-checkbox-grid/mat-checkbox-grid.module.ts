import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxGridComponent } from './mat-checkbox-grid.component';
import { MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    FormsModule
  ],
  entryComponents: [MatCheckboxGridComponent],
  declarations: [MatCheckboxGridComponent]
})
export class MatCheckboxGridModule { }
