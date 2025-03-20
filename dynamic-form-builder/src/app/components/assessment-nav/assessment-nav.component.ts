import {data, section} from '../../../../assessmentSchema/assessment';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnDestroy, inject, signal} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
/** @title Responsive sidenav */
@Component({
  selector: 'sidenav-responsive-example',
  templateUrl: 'assessment-nav.component.html',
  styleUrl: 'assessment-nav.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatRadioGroup,
    MatRadioButton,
    MatCheckbox,
    MatInputModule
  ],
})
export class SidenavResponsiveExample implements OnDestroy {
  formGroups:FormGroup[]=[];
  protected readonly fillerNav = Array.from(
    data.assessment.sections,
    (section):any => section.title
  );
  protected readonly fillerContent = {
    sections:data.assessment.sections,
  };
  ngOnInit() {
    // console.log(data.assessment.sections);
    data.assessment.sections.forEach((section: section): void => {
      this.formGroups.push(new FormGroup({}));
      section.questions.forEach((question): void => {
        this.formGroups[section.order - 1].addControl(question.questionId, new FormControl(''));
      });
    });
  }
  
  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  scrollTo(index: number) {
    var id = 'content-' + index;
    const element = document.getElementById(id);
    console.log(element);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
