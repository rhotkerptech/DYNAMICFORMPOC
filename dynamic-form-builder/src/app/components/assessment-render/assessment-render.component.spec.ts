import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentRenderComponent } from './assessment-render.component';

describe('AssessmentRenderComponent', () => {
  let component: AssessmentRenderComponent;
  let fixture: ComponentFixture<AssessmentRenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentRenderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
