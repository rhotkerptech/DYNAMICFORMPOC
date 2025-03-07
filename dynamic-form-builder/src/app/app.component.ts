import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilderComponent } from "./components/form-builder/form-builder.component";
import { FormRendererComponent } from './components/form-renderer/form-renderer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dynamic-form-builder';
}
