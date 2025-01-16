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
  Variety,
} from '../../models/pokemon.models';
import { CommonModule } from '@angular/common';
import { ImagesService } from '../../services/images.service';
import { ColorsService } from '../../services/colors.service';
import { StatsComponent } from './stats/stats.component';

@Component({
  selector: 'app-pokemon',
  imports: [CommonModule, StatsComponent],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css',
  standalone: true,
})
export class PokemonComponent implements OnChanges {
  search_input = input.required<string | number>();
  apiService = inject(ApiService);
  pokemonData: Pokemon | 'Not Found' | null = null;
  pokemonSpecieData: PokemonSpeciesDetails | 'Not Found' | null = null;
  pokemonEvolutionData: EvolutionChain | 'Not Found' | null = null;
  imagesService = inject(ImagesService);
  colorsService = inject(ColorsService);
  flavourtext: string | undefined = '';
  imagePath: string = '';
  mainColor: string = '';
  evolutionChain: any[] = [];
  pokemonVarieties: Variety[] | undefined = [];

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['search_input'] && this.search_input) {
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
      this.imagePath = this.imagesService.getImagePath(id);
    }
    if (this.pokemonSpecieData != 'Not Found') {
      this.flavourtext =
        this.pokemonSpecieData?.flavor_text_entries[0].flavor_text.replace(
          /\f/g,
          ''
        );
      this.pokemonVarieties = this.pokemonSpecieData?.varieties;
      try {
        this.pokemonEvolutionData = await this.apiService.getEvolutionChain(
          this.pokemonSpecieData!.evolution_chain.url
        );
        console.log(this.pokemonEvolutionData);
      } catch (error) {
        console.error('Error fetching Evolution Details:', error);
      }
    }
    if (
      this.pokemonEvolutionData != 'Not Found' &&
      this.pokemonEvolutionData?.chain
    ) {
      this.evolutionChain = this.collectEvolutionChain(
        this.pokemonEvolutionData!.chain
      );
    }
    console.log(this.evolutionChain);
  }

  collectEvolutionChain(
    chain: EvolutionNode,
    evolutionChain: string[] = []
  ): string[] {
    // Add the current species name to the chain
    evolutionChain.push(chain.species.name);

    // Recursively process all evolutions
    for (const evolution of chain.evolves_to) {
      this.collectEvolutionChain(evolution, evolutionChain);
    }

    // Return the updated evolution chain
    return evolutionChain;
  }
}
