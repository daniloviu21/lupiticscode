import { Injectable } from "@angular/core";
import { environments } from "../../../environments/environments";
import { HttpClient } from "@angular/common/http";
import {Observable, catchError, of, map} from "rxjs";
import { Hero } from "../interfaces/hero.interface";

@Injectable({ providedIn: 'root' }) //Esta disponible en todas
export class HeoresService {
    private baseUrl: string = environments.baseURL;

    constructor(private http: HttpClient) { } //Permite hacer solicictudes HTTP

    getHeroes():Observable<Hero[]> { //Metodo que obtiene la lista de heroes
        return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
    }

    getHeroById(id: string): Observable<Hero| undefined > { //Metodo que obtiene un/heroe por id
        return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`).pipe(
          catchError(error => of(undefined))
        );
    }

    getSuggestions(query: string): Observable<Hero[]>{
      return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
    }

    //utiliza post para enviar una peticion POST a la api
    addHero (hero: Hero): Observable<Hero> {
      return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero);
    }

    updateHero (hero: Hero): Observable<Hero> {
      if (!hero.id) throw Error ('Hero id is required');
      return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${hero.id}`, hero);
    }

    deleteHeroById(id: string): Observable<boolean>{
      return this.http.delete(`${ this.baseUrl }/heroes/${id}`).pipe(catchError(err => of(false)), map(resp => true));
    }

}
