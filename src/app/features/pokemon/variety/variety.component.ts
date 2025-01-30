import {
  Component,
  inject,
  input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PokemonSpeciesDetails } from '../../../models/pokemon.models';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-variety',
  imports: [],
  templateUrl: './variety.component.html',
  styleUrl: './variety.component.css',
})
export class VarietyComponent implements OnChanges {
  pokemonSpecieData = input<PokemonSpeciesDetails | 'Not Found' | null>(null);
  mainColor = input<string>();
  pokemonVarieties: { name: string; url: string }[] = [];

  apiService = inject(ApiService);

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    const specieData = this.pokemonSpecieData();
    if (specieData !== 'Not Found' && specieData !== null) {
      this.pokemonVarieties = await Promise.all(
        specieData.varieties
          .filter(
            (variety) =>
              variety.pokemon.name.toLowerCase().includes('mega') ||
              variety.pokemon.name.toLowerCase().includes('gmax')
          )
          .map(async (variety) => ({
            name: variety.pokemon.name,
            url: await this.apiService.getPokemonArtwork(variety.pokemon.name),
          }))
      );
    }
  }
}
