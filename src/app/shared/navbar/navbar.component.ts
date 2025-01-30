import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
})
export class NavbarComponent {
  searchInput: string = '';
  apiService = inject(ApiService);

  router = inject(Router);

  async onSearch() {
    const trimmedInput = this.searchInput.trim();

    if (
      trimmedInput &&
      !isNaN(Number(trimmedInput)) &&
      Number(trimmedInput) <= 1025
    ) {
      this.router.navigate(['pokemon', trimmedInput]);
    } else if (typeof trimmedInput === 'string') {
      const pokemon = await this.apiService.getPokemon(trimmedInput);

      if (pokemon != 'Not Found') {
        this.router.navigate(['pokemon', pokemon.id]);
      }
    }
  }
}
