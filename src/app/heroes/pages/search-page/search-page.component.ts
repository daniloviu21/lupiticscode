import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Hero} from '../../interfaces/hero.interface';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {HeoresService} from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  standalone: false,

  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  constructor(private HeroesService: HeoresService) {}
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  searchHero() {
     const value: string = this.searchInput.value || '';
    this.HeroesService.getSuggestions(value).subscribe( heroes => this.heroes = heroes );
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ): void{
    if (!event.option.value){
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue(hero.superhero);

    this.HeroesService.getHeroById(hero.id!)
      .subscribe(hero => this.selectedHero = hero);

  }

}
