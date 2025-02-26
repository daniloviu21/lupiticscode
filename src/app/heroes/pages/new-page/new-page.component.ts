import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-page',
  standalone: false,

  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  heroForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder) {
    this.heroForm = this.fb.group({
      name: ['', Validators.required],
      alias: ['', Validators.required],
      powers: [''],
      firstAppearance: ['', Validators.required],
      publisher: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.heroForm.valid) {
      console.log('Datos del héroe:', this.heroForm.value);
      console.log('Imagen seleccionada:', this.selectedFile);
    }
  }

  onReset() {
    this.heroForm.reset();
    this.imagePreview = null;
    this.selectedFile = null;
  }

}
