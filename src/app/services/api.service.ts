import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  EvolutionChain,
  EvolutionDetails,
  Pokemon,
  PokemonSpeciesDetails,
} from '../models/pokemon.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = ' https://pokeapi.co/api/v2';
  http = inject(HttpClient);

  constructor() {}

  async getPokemon(pokemon: string | number): Promise<Pokemon | 'Not Found'> {
    try {
      const url = [this.url, 'pokemon', pokemon].join('/');
      console.log(url);
      const data = await firstValueFrom(this.http.get<Pokemon>(url));
      return data;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        console.warn('Pokémon not found:', pokemon);
        return 'Not Found'; // Return 'Not Found' if the API returns 404
      }
      console.error('Error fetching Pokémon:', error);
      throw error; // Re-throw other errors
    }
  }
  async getPokemonSpecies(
    pokemon: string | number
  ): Promise<PokemonSpeciesDetails | 'Not Found'> {
    try {
      const url = [this.url, 'pokemon-species', pokemon].join('/');
      console.log(url);
      const data = await firstValueFrom(
        this.http.get<PokemonSpeciesDetails>(url)
      );
      return data;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        console.warn('Pokémon not found:', pokemon);
        return 'Not Found'; // Return 'Not Found' if the API returns 404
      }
      console.error('Error fetching Pokémon détails:', error);
      throw error; // Re-throw other errors
    }
  }
  async getEvolutionChain(url: string): Promise<EvolutionChain | 'Not Found'> {
    try {
      const data = await firstValueFrom(this.http.get<EvolutionChain>(url));
      return data;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        console.warn('Evolution chain not found');
        return 'Not Found'; // Return 'Not Found' if the API returns 404
      }
      console.error('Error fetching Pokémon détails:', error);
      throw error; // Re-throw other errors
    }
  }
}
