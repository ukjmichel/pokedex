import { Injectable } from '@angular/core';
import { PokemonTypeName } from '../models/pokemon.models';

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  colors = {
    normal: '#A8A77A',
    fighting: '#C22E28',
    flying: '#A98FF3',
    poison: '#A33EA1',
    ground: '#E2BF65',
    rock: '#B6A136',
    bug: '#A6B91A',
    ghost: '#735797',
    steel: '#B7B7CE',
    fire: '#EE8130',
    water: '#6390F0',
    grass: '#7AC74C',
    electric: '#F7D02C',
    psychic: '#F95587',
    ice: '#96D9D6',
    dragon: '#6F35FC',
    dark: '#705746',
    fairy: '#D685AD',
    stellar: '#FFD700', 
    '???': '#68A090', 
  };

  getColor(type: PokemonTypeName): string {
    return this.colors[type] || '#000000'; // Default to black if type is not found
  }
}
