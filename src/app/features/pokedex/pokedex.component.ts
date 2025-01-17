import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PokemonListResponse } from '../../models/pokemon.models';
import { UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokedex',
  imports: [RouterLink], // Add necessary modules if standalone
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'], // Fixed typo
})
export class PokedexComponent implements OnInit {
  // Signal for managing state
  data = signal<PokemonListResponse | undefined>(undefined);
  currentPage = 1;
  maxPage = 52;
  pokemonList: { name: string; url: string }[] = [];

  // Dependency injection
  apiService = inject(ApiService);

  async ngOnInit(): Promise<void> {
    await this.fetchPokemonList();
    await this.updatePokemonList();
  }

  // Fetch initial Pokémon list
  private async fetchPokemonList(): Promise<void> {
    try {
      const response = await this.apiService.getPokemonList();
      this.data.set(response);
      console.log('Initial Pokémon List:', this.data()?.results);
    } catch (error) {
      console.error('Failed to fetch Pokémon list:', error);
    }
  }

  // Navigate to next or previous page
  async getPageData(direction: 'next' | 'previous'): Promise<void> {
    const url = this.data()?.[direction]; // Dynamically access next/previous
    if (!url) {
      console.warn(`No ${direction} page available.`);
      return;
    }
    if (this.currentPage < this.maxPage || direction === 'previous') {
      try {
        const response = await this.apiService.getPokemonList(url);
        this.data.set(response);
        console.log(
          `${
            direction.charAt(0).toUpperCase() + direction.slice(1)
          } Page Data:`,
          this.data()?.results
        );
        direction === 'next' ? this.currentPage++ : this.currentPage--;
        this.updatePokemonList();
      } catch (error) {
        console.error(`Failed to fetch ${direction} page data:`, error);
      }
    }
  }

  async updatePokemonList(): Promise<void> {
    try {
      // Map results to promises for fetching artwork URLs in parallel
      const newList = await Promise.all(
        this.data()!.results.map(async (result) => ({
          name: result.name,
          url: await this.apiService.getPokemonSprite(result.name),
        }))
      );

      // Update the pokemonList after all promises resolve
      this.pokemonList = newList;
    } catch (error) {
      console.error('Failed to update Pokémon list:', error);
    }
  }
}
