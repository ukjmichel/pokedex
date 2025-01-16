import { Routes } from '@angular/router';
import { PokemonComponent } from './features/pokemon/pokemon.component';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home',
    },
  },
  {
    path: 'pokemon/:search_input',
    component: PokemonComponent,
    data: {
      title: 'Pokemon',
    },
  },
];
