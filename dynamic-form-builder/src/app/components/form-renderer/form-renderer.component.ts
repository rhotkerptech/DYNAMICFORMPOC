import { Component, Signal, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-renderer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      group[q.label] = q.type === 'checkbox' ? [false] : [''];
    });

    this.formGroup = this.fb.group(group);
  }

  submitForm() {
    const response = {
      formId: this.formId(),
      ResponseData: JSON.stringify(this.formGroup.value)
    };

    this.http.post('http://localhost:5052/api/forms/submit', response)
      .subscribe(() => alert('Form submitted successfully!'));
  }
}
