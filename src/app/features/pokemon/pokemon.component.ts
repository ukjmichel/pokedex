import {
  Component,
  inject,
  input,
  OnChanges,
  SimpleChanges,
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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  imports: [CommonModule, StatsComponent,RouterLink],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
  standalone: true,
})
export class PokemonComponent implements OnChanges {
  search_input = input.required<number>();
  apiService = inject(ApiService);
  pokemonData: Pokemon | 'Not Found' | null = null;
  pokemonSpecieData: PokemonSpeciesDetails | 'Not Found' | null = null;
  pokemonEvolutionData: EvolutionChain | 'Not Found' | null = null;

  colorsService = inject(ColorsService);
  flavourtext: string | undefined = '';

  mainColor: string = '';
  evolutionChain: { name: string; url: string }[] = [];
  pokemonVarieties: { name: string; url: string }[] = [];

  previousPokemon: { id: number; name: string } = { id: 0, name: '' };
  nextPokemon: { id: number; name: string } = { id: 0, name: '' };

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.updateNumber();
    if (changes['search_input'] && this.search_input) {
      this.updateNumber();
      try {
        this.pokemonData = await this.apiService.getPokemon(
          this.search_input()
        );
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
      try {
        this.pokemonSpecieData = await this.apiService.getPokemonSpecies(
          this.search_input()
        );
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    }
    if (this.pokemonData != 'Not Found') {
      const id = this.pokemonData?.id;
      this.mainColor = this.colorsService.getColor(
        this.pokemonData!.types[0].type.name
      );
    }
    if (this.pokemonSpecieData != 'Not Found') {
      this.flavourtext =
        this.pokemonSpecieData?.flavor_text_entries[0].flavor_text.replace(
          /\f/g,
          ''
        );
      this.pokemonVarieties = [];
      for (let variety of this.pokemonSpecieData!.varieties) {
        if (
          variety.pokemon.name.toLowerCase().includes('mega') ||
          variety.pokemon.name.toLowerCase().includes('gmax')
        ) {
          // Fetch the artwork URL
          const artworkUrl = await this.apiService.getPokemonArtwork(
            variety.pokemon.name
          );

          // Add the variety with artwork to the array
          this.pokemonVarieties.push({
            name: variety.pokemon.name,
            url: artworkUrl,
          });
        }
      }
      try {
        this.pokemonEvolutionData = await this.apiService.getEvolutionChain(
          this.pokemonSpecieData!.evolution_chain.url
        );
      } catch (error) {
        console.error('Error fetching Evolution Details:', error);
      }
    }
    if (
      this.pokemonEvolutionData != 'Not Found' &&
      this.pokemonEvolutionData?.chain
    ) {
      this.evolutionChain = await this.collectEvolutionChain(
        this.pokemonEvolutionData!.chain
      );
    }
  }

  async collectEvolutionChain(
    chain: EvolutionNode,
    evolutionChain: { name: string; url: string }[] = []
  ): Promise<{ name: string; url: string }[]> {
    // Get the artwork URL for the current species
    const artworkUrl = await this.apiService.getPokemonArtwork(
      chain.species.name
    );

    // Add the current species name and artwork URL to the chain
    evolutionChain.push({ name: chain.species.name, url: artworkUrl });

    // Recursively process all evolutions
    for (const evolution of chain.evolves_to) {
      await this.collectEvolutionChain(evolution, evolutionChain);
    }

    // Return the updated evolution chain
    return evolutionChain;
  }
  async updateNumber() {
    if (this.search_input() > 1) {
      this.previousPokemon!.id = Number(this.search_input()) - 1;
      this.previousPokemon!.name = await this.apiService.getPokemonName(
        this.previousPokemon!.id
      );
    } else {
      this.previousPokemon = { id: 0, name: '' };
    }
    if (this.search_input() < 1025) {
      this.nextPokemon!.id = Number(this.search_input()) + 1;
      this.nextPokemon!.name = await this.apiService.getPokemonName(
        this.nextPokemon!.id
      );
      console.log(this.nextPokemon);
    } else {
      this.nextPokemon = { id: 0, name: '' };
    }
  }
}
