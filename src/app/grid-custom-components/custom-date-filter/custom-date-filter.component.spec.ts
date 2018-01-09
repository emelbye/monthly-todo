import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDateFilterComponent } from './custom-date-filter.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomDateFilterComponent', () => {
  let component: CustomDateFilterComponent;
  let fixture: ComponentFixture<CustomDateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatInputModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ],
      declarations: [ CustomDateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
