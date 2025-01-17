import { Routes } from '@angular/router';
import { PokemonComponent } from './features/pokemon/pokemon.component';
import { HomeComponent } from './features/home/home.component';
import { PokedexComponent } from './features/pokedex/pokedex.component';
import { LegalNoticeComponent } from './features/legal-notice/legal-notice.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full',
  },
  {
    path: 'pokemon/:search_input',
    component: PokemonComponent,
    data: {
      title: 'Pokemon',
    },
  },
  {
    path: 'pokedex',
    component: PokedexComponent,
    data: {
      title: 'pokedex',
    },
  },
  {
    path: 'legal-notice',
    component: LegalNoticeComponent,
  },
];
