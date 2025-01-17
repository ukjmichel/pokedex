import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  EvolutionChain,
  Pokemon,
  PokemonListResponse,
  PokemonResult,
  PokemonSpeciesDetails,
} from '../models/pokemon.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = ' https://pokeapi.co/api/v2';
  http = inject(HttpClient);

  constructor() {}

  async getPokemonList(
    url: string = 'https://pokeapi.co/api/v2/pokemon'
  ): Promise<PokemonListResponse> {
    try {
      const data = await firstValueFrom(
        this.http.get<PokemonListResponse>(url)
      );
      return data;
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 404) {
        console.warn('Pokémon list not found:');
      }
      console.error('Error fetching Pokémon list:', error);
      throw error; // Re-throw other errors
    }
  }

  async getPokemon(pokemon: string | number): Promise<Pokemon | 'Not Found'> {
    try {
      const url = [this.url, 'pokemon', pokemon].join('/');
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

  async getPokemonArtwork(pokemon: string | number): Promise<string> {
    try {
      // Construct the URL dynamically
      const url = `${this.url}/pokemon/${pokemon}`;

      // Fetch Pokémon data
      const data = await firstValueFrom(this.http.get<Pokemon>(url));

      // Return the artwork URL if available
      return data.sprites.other?.['official-artwork'].front_default || '';
    } catch (error) {
      // Handle 404 error (Pokémon not found)
      if (error instanceof HttpErrorResponse && error.status === 404) {
        console.warn('Pokémon not found:', pokemon);
        return 'Not Found';
      }

      // Log other errors and re-throw for upstream handling
      console.error('Error fetching Pokémon:', error);
      throw error;
    }
  }

  async getPokemonName(pokemon: string | number): Promise<string> {
    try {
      // Construct the URL dynamically
      const url = `${this.url}/pokemon/${pokemon}`;

      // Fetch Pokémon data
      const data = await firstValueFrom(this.http.get<Pokemon>(url));

      // Return the artwork URL if available
      return data.species.name || '';
    } catch (error) {
      // Handle 404 error (Pokémon not found)
      if (error instanceof HttpErrorResponse && error.status === 404) {
        console.warn('Pokémon not found:', pokemon);
        return 'Not Found';
      }

      // Log other errors and re-throw for upstream handling
      console.error('Error fetching Pokémon:', error);
      throw error;
    }
  }

  async getPokemonId(pokemon: string | number): Promise<number> {
    try {
      // Construct the URL dynamically
      const url = `${this.url}/pokemon/${pokemon}`;

      // Fetch Pokémon data
      const data = await firstValueFrom(this.http.get<Pokemon>(url));

      // Return the artwork URL if available
      return data.id || 0;
    } catch (error) {
      // Handle 404 error (Pokémon not found)
      if (error instanceof HttpErrorResponse && error.status === 404) {
        console.warn('Pokémon not found:', pokemon);
      }

      // Log other errors and re-throw for upstream handling
      console.error('Error fetching Pokémon:', error);
      throw error;
    }
  }

  async getPokemonSprite(pokemon: string | number): Promise<string> {
    try {
      // Construct the URL dynamically
      const url = `${this.url}/pokemon/${pokemon}`;

      // Fetch Pokémon data
      const data = await firstValueFrom(this.http.get<Pokemon>(url));

      // Return the artwork URL if available
      return data.sprites.front_default || '';
    } catch (error) {
      // Handle 404 error (Pokémon not found)
      if (error instanceof HttpErrorResponse && error.status === 404) {
        console.warn('Pokémon not found:', pokemon);
        return 'Not Found';
      }

      // Log other errors and re-throw for upstream handling
      console.error('Error fetching Pokémon:', error);
      throw error;
    }
  }

  async getPokemonSpecies(
    pokemon: string | number
  ): Promise<PokemonSpeciesDetails | 'Not Found'> {
    try {
      const url = [this.url, 'pokemon-species', pokemon].join('/');
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
