import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomDateFilterComponent } from './custom-date-filter.component'
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule
  ],
  entryComponents: [CustomDateFilterComponent],
  declarations: [ CustomDateFilterComponent ]
})
export class CustomDateFilterModule { }
