import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBooleanFilterComponent } from './custom-boolean-filter.component';
import { MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomBooleanFilterComponent', () => {
  let component: CustomBooleanFilterComponent;
  let fixture: ComponentFixture<CustomBooleanFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBooleanFilterComponent ],
      imports : [ 
        FormsModule,
        MatCheckboxModule,
        BrowserAnimationsModule
      ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBooleanFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
