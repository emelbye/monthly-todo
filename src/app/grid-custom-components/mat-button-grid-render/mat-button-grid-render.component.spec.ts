import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonGridRenderComponent } from './mat-button-grid-render.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

describe('MatButtonGridRenderComponent', () => {
  let component: MatButtonGridRenderComponent;
  let fixture: ComponentFixture<MatButtonGridRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatButtonGridRenderComponent ],
      imports : [ MatIconModule, MatButtonModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatButtonGridRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
