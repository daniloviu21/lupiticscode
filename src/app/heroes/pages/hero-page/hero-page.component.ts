import { Component } from '@angular/core';
import {Hero} from '../../interfaces/hero.interface';
import {HeoresService} from '../../services/heroes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs';
@Component({
  selector: 'app-hero-page',
  standalone: false,
  
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent {

  public hero?: Hero;
  //Declarar variable
  constructor(
    private HeroesService: HeoresService, private activatedRoute: ActivatedRoute,
    private router: Router) {}
  //Inyectar el servicio

  ngOnInit(): void {
    //Metodo que se ejecuta automaticamente cuando el componente es inicializado
   this.activatedRoute.params.pipe(
     switchMap(({id}) => this.HeroesService.getHeroById(id)),
   ).subscribe( hero => {
     if (!hero) return this.router.navigate(['/heroes/list']);
     // si el heroe no existe redirije a la lista de heroes
     this.hero = hero;
     // almacena la informacion del heroe en la variable hero
     console.log(hero);
     return;
     })
  }

}
