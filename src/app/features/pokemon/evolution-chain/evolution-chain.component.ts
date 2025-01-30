import {
  Component,
  inject,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  EvolutionChain,
  EvolutionNode,
  PokemonSpeciesDetails,
} from '../../../models/pokemon.models';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-evolution-chain',
  imports: [],
  templateUrl: './evolution-chain.component.html',
  styleUrl: './evolution-chain.component.css',
})
export class EvolutionChainComponent implements OnChanges {
  pokemonSpecieData = input<PokemonSpeciesDetails | 'Not Found' | null>(null);
  pokemonEvolutionData: EvolutionChain | 'Not Found' | null = null;
  evolutionChain: {
    id: number;
    name: string;
    url: string | null | undefined;
  }[] = [];
  mainColor = input<string>();

  router = inject(Router);
  apiService = inject(ApiService);

  ngOnChanges(changes: SimpleChanges): void {
    this.updateEvolutionChain();
   
  }

  private async updateEvolutionChain(): Promise<void> {
    const specieData = this.pokemonSpecieData(); // ✅ Get the current value of the signal

    // ✅ Check if specieData is a valid object and contains evolution_chain
    if (
      typeof specieData === 'object' &&
      specieData !== null &&
      'evolution_chain' in specieData &&
      specieData.evolution_chain?.url
    ) {
      try {
        const evolutionData = await this.apiService.getEvolutionChain(
          specieData.evolution_chain.url
        );
        this.pokemonEvolutionData = evolutionData; // ✅ Update signal

        if (evolutionData !== 'Not Found' && evolutionData.chain) {
          const collectedChain = await this.collectEvolutionChain(
            evolutionData.chain
          );
          this.evolutionChain = collectedChain; // ✅ Update signal reactively
        }
      } catch (error) {
        console.error('Error fetching Evolution Details:', error);
      }
    }
  }

  private async collectEvolutionChain(
    chain: EvolutionNode,
    evolutionChain: {
      id: number;
      name: string;
      url: string | null | undefined;
    }[] = []
  ): Promise<{ id: number; name: string; url: string | null | undefined }[]> {
    const pokemon = await this.apiService.getPokemon(chain.species.name);
    if (pokemon != 'Not Found') {
      evolutionChain.push({
        id: pokemon.id,
        name: pokemon.name,
        url: pokemon.sprites.other?.['official-artwork'].front_default,
      });
    }

    for (const evolution of chain.evolves_to) {
      await this.collectEvolutionChain(evolution, evolutionChain);
    }

    return evolutionChain;
  }
  navigate(id: number): void {
    this.router.navigate(['pokemon', id]);
  }
}
