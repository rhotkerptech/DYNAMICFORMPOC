import {data, section} from '../../../../assessmentSchema/assessment';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnDestroy, inject, signal} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  form:FormGroup = new FormGroup({});
  sectionStatus:{[key: string]: boolean} = {};
  protected readonly fillerNav = Array.from(
    data.assessment.sections,
    (section):string => section.title,
  );
  constructor() {
    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () =>
      this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
  protected readonly fillerContent = {
    sections:data.assessment.sections,
  };
  ngOnInit() {
    this.buildForm();
    this.listenToFormChanges();
    // console.log(data.assessment.sections);
    // data.assessment.sections.forEach((section: section): void => {
    //   this.formGroups.push(new FormGroup({}));
    //   section.questions.forEach((question): void => {
    //     this.formGroups[section.order - 1].addControl(question.questionId, new FormControl(''));
    //   });
    // });
  }
  buildForm()
  {
    data.assessment.sections.forEach((section: any,index:number) => {
      section.questions.forEach((question: any) => {
        let validators = [];

        if (question.required) {
          validators.push(Validators.required);
        }
        if (question.min !== undefined) {
          validators.push(Validators.min(question.min));
        }
        if (question.max !== undefined) {
          validators.push(Validators.max(question.max));
        }

        if (question.type === 'checkbox') {
          this.form!.addControl(question.questionId,new FormGroup({}));
          question.options.forEach((option: string) => {
            (this.form!.get(question.questionId) as FormGroup).addControl(
              option,
              new FormControl(false) // Default unchecked
            );
          });
        } else {
          this.form!.addControl(question.questionId, new FormControl('', validators));
        }
      });
      this.sectionStatus[section.title] = false;
    });
  }

  listenToFormChanges()
  {
    this.form!.valueChanges.subscribe((value) => {
      // console.log(value);
      for(let section of data.assessment.sections)
      {
        console.log(section.title,this.sectionStatus[section.title]);
        let sectionComplete = true;
        for(let question of section.questions)
        {
          if(question.required && !value[question.questionId])
          {
            sectionComplete = false;
            break;
          }
        }
        this.sectionStatus[section.title] = sectionComplete;
      }
    });
  }
  submitForm() {
    if(this.form.invalid)
    {
      alert("Please fill out all required fields");
      return;
    }
    console.log(this.form!.value);
  }
  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  

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
