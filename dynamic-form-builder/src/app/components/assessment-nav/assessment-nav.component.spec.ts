import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNavComponent } from './assessment-nav.component';

describe('AssessmentNavComponent', () => {
  let component: AssessmentNavComponent;
  let fixture: ComponentFixture<AssessmentNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssessmentNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
