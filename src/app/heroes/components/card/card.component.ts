import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../../heroes/interfaces/hero.interface';

@Component({
  selector: 'heroes-hero-card',
  standalone: false,
  
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit {

  @Input()
    //Permite que el componente padre pase un valor a esta propiedad
  
    public hero!: Hero;
    //Define la propiedad hero, que representa un héroe y debe ser recibida como entrada
  
    ngOnInit(): void {
      //Metodo que se ejecuta automaticamente cuando el componente es inicializado
      if (!this.hero) throw Error ('Hero property is requiered')
      //Lanza un error si no se recibe un héroe válido
    }

}
