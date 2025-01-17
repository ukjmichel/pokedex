import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PokemonListResponse } from '../../models/pokemon.models';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  imports: [RouterLink], // Add necessary modules if standalone
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css'], // Fixed typo
})
export class PokedexComponent implements OnInit {
  data = signal<PokemonListResponse | undefined>(undefined); // Signal for managing state
  currentPage = 1;
  maxPage = 52;
  pokemonList: { name: string; url: string }[] = [];
  isLoading = true;

  private cancelFetch$ = new Subject<void>(); // Subject to cancel ongoing requests

  // Dependency injection
  apiService = inject(ApiService);

  async ngOnInit(): Promise<void> {
    await this.fetchPokemonList();
    await this.updatePokemonList();
    this.isLoading = false;
  }

  // Fetch initial Pokémon list
  private async fetchPokemonList(): Promise<void> {
    this.cancelOngoingRequests();
    try {
      this.isLoading = true;
      const response = await this.apiService.getPokemonList();
      this.data.set(response);
      console.log('Initial Pokémon List:', this.data()?.results);
    } catch (error) {
      console.error('Failed to fetch Pokémon list:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Navigate to next or previous page
  async getPageData(direction: 'next' | 'previous'): Promise<void> {
    const url = this.data()?.[direction];
    if (!url) {
      console.warn(`No ${direction} page available.`);
      return;
    }

    if (this.currentPage < this.maxPage || direction === 'previous') {
      this.cancelOngoingRequests(); // Cancel any ongoing requests
      try {
        this.isLoading = true;
        const response = await this.apiService.getPokemonList(url);
        this.data.set(response);
        console.log(
          `${
            direction.charAt(0).toUpperCase() + direction.slice(1)
          } Page Data:`,
          this.data()?.results
        );
        direction === 'next' ? this.currentPage++ : this.currentPage--;
        await this.updatePokemonList();
      } catch (error) {
        console.error(`Failed to fetch ${direction} page data:`, error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async updatePokemonList(): Promise<void> {
    this.cancelOngoingRequests(); // Cancel previous updates if necessary
    try {
      // Fetch artwork URLs in parallel
      const newList = await Promise.all(
        this.data()!.results.map(async (result) => ({
          name: result.name,
          url: await this.apiService.getPokemonSprite(result.name),
        }))
      );
      this.pokemonList = newList;
    } catch (error) {
      console.error('Failed to update Pokémon list:', error);
    }
  }

  // Cancel ongoing requests
  private cancelOngoingRequests(): void {
    this.cancelFetch$.next(); // Signal to cancel previous requests
  }

  ngOnDestroy(): void {
    this.cancelFetch$.next(); // Ensure all subscriptions are cleaned up
    this.cancelFetch$.complete();
  }
}
