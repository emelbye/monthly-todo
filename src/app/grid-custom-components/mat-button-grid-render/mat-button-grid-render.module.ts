import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonGridRenderComponent } from './mat-button-grid-render.component';
import { MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule
    ],
    entryComponents: [MatButtonGridRenderComponent],
    declarations: [MatButtonGridRenderComponent]
})
export class MatButtonGridRenderModule { }
