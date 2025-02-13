export interface Hero {
    id: string;
    superhero: string;
    publisher: Publisher;
    alter_ego: string;
    firts_appearence: string;
    characters: string;
    alt_img?: string;
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics"
}