import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Hero, Publisher} from '../../interfaces/hero.interface';
import {HeoresService} from '../../services/heroes.service';
import {HttpClient} from '@angular/common/http';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
      const heroData = this.heroForm.value;
      const formData = new FormData();
      formData.append('id', heroData.name);
      formData.append('superhero', heroData.alias);
      formData.append('publisher', heroData.publisher);
      formData.append('alter_ego', heroData.powers);
      formData.append('first_appearance', heroData.firstAppearance);
      formData.append('characters', heroData.characters);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.http.post('http://localhost:3000/heroes', formData)
        .subscribe(response => {
          console.log('Héroe creado con éxito:', response);
          this.onReset();
        }, error => {
          console.error('Error al crear héroe:', error);
        });
    }
  }

  onReset() {
    this.heroForm.reset();
    this.imagePreview = null;
    this.selectedFile = null;
  }

}
