import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomBooleanFilterComponent } from './custom-boolean-filter.component';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule, MatButtonModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  entryComponents: [CustomBooleanFilterComponent],
  declarations: [CustomBooleanFilterComponent]
})
export class CustomBooleanFilterModule { }
