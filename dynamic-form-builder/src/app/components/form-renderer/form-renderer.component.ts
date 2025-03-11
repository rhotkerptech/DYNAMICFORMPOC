import { Component, Signal, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatInputModule,MatButtonModule,MatCheckboxModule,MatRadioModule],
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css']
})
export class FormRendererComponent {
  private fb = new FormBuilder();
  formId = signal<string | null>(null);
  formSchema = signal<{ name: string;id:string,questions: any[] } | null>(null);
  formGroup!: FormGroup;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.formId.set(id);
        this.loadForm(id);
      }
    });

    effect(() => {
      if (this.formSchema()) {
        this.buildForm();
      }
    });
  }

  loadForm(id: string) {
    this.http.get<{ name: string;id:string,formSchema: string }>(`http://localhost:5052/api/forms/${id}`)
      .subscribe(data => {
        console.log(data)
        var questions=JSON.parse(data.formSchema).questions;
        console.log(questions)
        this.formSchema.set({ name: data.name,id:data.id, questions: questions });
      });
  }

  buildForm() {
    const schema = this.formSchema();
    if (!schema) return;

    const group: any = {};
    schema.questions.forEach(q => {
      if (q.type === 'text') {
        group[q.label] = new FormControl('',Validators.required);
      } else if (q.type === 'checkbox') {
        const controls: any = {};
        q.options.forEach((option: any) => {
          controls[option.value] = new FormControl(false);
        });
        group[q.label] = new FormGroup(controls, this.atLeastOneCheckboxCheckedValidator as ValidatorFn);
      } else if (q.type === 'radio') {
        group[q.label] = new FormControl(false, Validators.required);
      }
    });
    
    console.log(group)
    this.formGroup = this.fb.group(group);
  }
  atLeastOneCheckboxCheckedValidator(formGroup: FormGroup) {
    return Object.values(formGroup.controls).some(control => control.value)
      ? null
      : { required: true };
  }
  submitForm() {
    console.log(this.formGroup.status);
    if(this.formGroup.status==="INVALID")
    {
      alert("Fill required fields");
      return;
    }
    const response = {
      formId: this.formId(),
      ResponseData: JSON.stringify(this.formGroup.value)
    };
    console.log(this.formGroup.value)
    this.http.post('http://localhost:5052/api/forms/submit', response)
      .subscribe(()=>alert("Form Submitted Successfully!"));
  }
}
