import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
export interface Option
{
  value: string;
}
@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule,MatButtonModule,MatInputModule],
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent {

    constructor(private httpClient:HttpClient) {

   }
  private fb = new FormBuilder();
  formName = signal('');
  questions = signal<{ type: string; label: string; options?:Option[] }[]>([]);
  addQuestion(type: string) {
    this.questions.update(questions => [...questions, { type, label: '', options: type === 'radio' || type === 'checkbox' ? [] : undefined }]);
  }

  updateLabel(index: number, label: Event) {
    const value = (label.target as HTMLInputElement).value;
    this.questions.update(questions => {
      questions[index].label = value;
      return [...questions];
    });
  }

  addOption(index: number) {
    this.questions.update(questions => {
      questions[index].options?.push({ value: ''});
      return [...questions];
    });
  }

  // updateOption(index: number, optionIndex: number, event: Event) {
  //   const value = (event.target as HTMLInputElement).value;
  //   console.log('value', value);
  //   this.questions.update(questions => {
  //     if (questions[index].options) {
  //       questions[index].options![optionIndex] = value;
  //     }
  //     return [...questions];
  //   });
  // }

  removeQuestion(index: number) {
    this.questions.update(questions => questions.filter((_, i) => i !== index));
  }

  submitForm() {
    var formSchema = {
      questions:this.questions(),
    }
    const Payload = {
      Name: this.formName(),
      FormSchema: JSON.stringify(formSchema)
    };
    console.log('Form Data:', formSchema);
    this.httpClient.post('http://localhost:5052/api/forms/create', Payload).subscribe((response) => {
      alert("Form Submitted Successfully!")
      console.log('response', response);
      this.questions.set([]);
      this.formName.set('');
    }, (error) => {
      console.log('error', error);
    });
  }
}
