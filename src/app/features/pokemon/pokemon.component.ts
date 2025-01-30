import {
  Component,
  inject,
  input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { ApiService } from '../../services/api.service';
import {
  EvolutionChain,
  EvolutionNode,
  Pokemon,
  PokemonSpeciesDetails,
} from '../../models/pokemon.models';
import { CommonModule } from '@angular/common';
import { ColorsService } from '../../services/colors.service';
import { StatsComponent } from './stats/stats.component';
import { Router, RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { EvolutionChainComponent } from './evolution-chain/evolution-chain.component';
import { VarietyComponent } from './variety/variety.component';

@Component({
  selector: 'app-pokemon',
  imports: [
    CommonModule,
    StatsComponent,
    EvolutionChainComponent,
    VarietyComponent,
  ],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
  standalone: true,
})
export class PokemonComponent implements OnChanges, OnDestroy {
  // Input for the Pokémon ID or search input
  search_input = input.required<number>();

  // Services
  apiService = inject(ApiService);
  colorsService = inject(ColorsService);
  router = inject(Router);

  // Data properties
  pokemonData: Pokemon | 'Not Found' | null = null;
  pokemonSpecieData: PokemonSpeciesDetails | 'Not Found' | null = null;

  // UI-related properties
  flavourtext: string | undefined = '';
  mainColor: string = '';

  // Navigation-related properties
  previousPokemon: { id: number; name: string } = { id: 0, name: '' };
  nextPokemon: { id: number; name: string } = { id: 0, name: '' };

  // Subject to manage cancellation of ongoing requests
  private cancelRequest$ = new Subject<void>();

  // Lifecycle hooks

  /**
   * Triggered when the input property changes.
   * Fetches and updates Pokémon data accordingly.
   */
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.cancelOngoingRequests(); // Cancel any ongoing requests

    if (changes['search_input'] && this.search_input()) {
      await this.fetchPokemonData();
      await this.fetchPokemonSpeciesData();
      await this.updateNavigationData();
    }
  }

  /**
   * Cleanup subscriptions when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.cancelOngoingRequests();
    this.cancelRequest$.complete();
  }

  // Fetching Data

  /**
   * Fetches the main Pokémon data.
   */
  private async fetchPokemonData(): Promise<void> {
    try {
      this.pokemonData = await this.apiService.getPokemon(this.search_input());

      if (this.pokemonData !== 'Not Found') {
        this.mainColor = this.colorsService.getColor(
          this.pokemonData.types[0].type.name
        );
      }
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }

  /**
   * Fetches Pokémon species data and updates varieties.
   */
  private async fetchPokemonSpeciesData(): Promise<void> {
    try {
      this.pokemonSpecieData = await this.apiService.getPokemonSpecies(
        this.search_input()
      );

      if (this.pokemonSpecieData !== 'Not Found') {
        this.flavourtext =
          this.pokemonSpecieData.flavor_text_entries[0].flavor_text.replace(
            /\f/g,
            ''
          );
      }
    } catch (error) {
      console.error('Error fetching Pokémon species data:', error);
    }
  }

  // Updating Navigation Data

  /**
   * Updates the previous and next Pokémon navigation data.
   */
  private async updateNavigationData(): Promise<void> {
    const currentId = Number(this.search_input());

    if (currentId > 1) {
      this.previousPokemon.id = currentId - 1;
      this.previousPokemon.name = await this.apiService.getPokemonName(
        this.previousPokemon.id
      );
    } else {
      this.previousPokemon = { id: 0, name: '' };
    }

    if (currentId < 1025) {
      this.nextPokemon.id = currentId + 1;
      this.nextPokemon.name = await this.apiService.getPokemonName(
        this.nextPokemon.id
      );
    } else {
      this.nextPokemon = { id: 0, name: '' };
    }
  }

  /**
   * Cancels all ongoing requests.
   */
  private cancelOngoingRequests(): void {
    this.cancelRequest$.next();
  }

  // Navigation

  /**
   * Navigates to a specific Pokémon ID.
   */
  navigate(id: number): void {
    this.router.navigate(['pokemon', id]);
  }
}
