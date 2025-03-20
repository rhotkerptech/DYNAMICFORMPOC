import { Routes } from '@angular/router';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';

export const routes: Routes = [
    // { path: '', redirectTo: 'form-builder', pathMatch: 'full' },
    {path:'form-builder', component: FormBuilderComponent},
    {path:'form-generator/:id', component: FormRendererComponent}
];
