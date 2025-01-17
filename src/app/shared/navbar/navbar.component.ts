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

  router = inject(Router);

  async OnSearch() {
    if (this.searchInput.trim() && Number(this.searchInput) <= 1025) {
      this.router.navigate(['pokemon', this.searchInput]);
    }
  }
}
