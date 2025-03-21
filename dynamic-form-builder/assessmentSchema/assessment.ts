import { FormControlName, FormGroup } from "@angular/forms";

export interface section
{
  sectionId:string;
  title:string;
  order:number;
  questions:question[];
}
export interface question
{
  questionId:string;
  label:string;
  type:string;
  required:boolean;
  options?: string[];
  min?:number;
  max?:number;
  dependsOn?:string;
}
export interface assessment
{
  assessmentId:string;
  title:string;
  description:string;
  sections:section[]
}

export interface dataSchema
{
  assessment:assessment;
}
export const data:dataSchema = {
  assessment: {
    assessmentId: "unique-assessment-id",
    title: "Comprehensive Medical Assessment",
    description: "A detailed health assessment for new patients.",
    sections: [
      {
        sectionId: "s1",
        title: "Personal Information",
        order: 1,
        questions: [
          {
            questionId: "q1",
            label: "What is your full name?",
            type: "text",
            required: true,
          },
          {
            questionId: "q2",
            label: "What is your date of birth?",
            type: "date",
            required: true
          },
          {
            questionId: "q3",
            label: "What is your gender?",
            type: "radio",
            options: ["Male", "Female", "Other"],
            required: true
          }
        ]
      },
      {
        sectionId: "s2",
        title: "Medical History",
        order: 2,
        questions: [
          {
            questionId: "q4",
            label: "Do you have any allergies?",
            type: "checkbox",
            options: ["Peanuts", "Shellfish", "Dairy", "Pollen", "Other"],
            required: false
          },
          {
            questionId: "q5",
            label: "Please specify any other allergies.",
            type: "text",
            required: false,
            dependsOn: "q4"
          },
          {
            questionId: "q6",
            label: "Do you have a history of chronic illnesses?",
            type: "checkbox",
            options: ["Diabetes", "Hypertension", "Asthma", "Heart Disease", "None"],
            required: false
          }
        ]
      },
      {
        sectionId: "s3",
        title: "Pain Assessment",
        order: 3,
        questions: [
          {
            questionId: "q7",
            label: "On a scale of 1-10, how would you rate your current pain level?",
            type: "number",
            min: 1,
            max: 10,
            required: false
          },
          {
            questionId: "q8",
            label: "Do you experience frequent headaches?",
            type: "radio",
            options: ["Yes", "No"],
            required: false
          },
          {
            questionId: "q9",
            label: "If yes, how often?",
            type: "radio",
            options: ["Daily", "Weekly", "Monthly"],
            required: false,
            dependsOn: "q8"
          }
        ]
      },
      {
        sectionId: "s4",
        title: "Mental Health Assessment",
        order: 4,
        questions: [
          {
            questionId: "q10",
            label: "Have you been feeling anxious or depressed recently?",
            type: "radio",
            options: ["Yes", "No"],
            required: false
          },
          {
            questionId: "q11",
            label: "On a scale of 1-10, how would you rate your stress levels?",
            type: "number",
            min: 1,
            max: 10,
            required: false
          }
        ]
      }
    ]
  }
}
