import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statName',
})
export class StatNamePipe implements PipeTransform {
  transform(value: string): string {
    const mapping: { [key: string]: string } = {
      hp: 'HP',
      attack: 'ATQ',
      defense: 'DEF',
      'special-attack': 'SPA', // Enclose keys with hyphens in quotes
      'special-defense': 'SPD', // Enclose keys with hyphens in quotes
      speed: 'SPE',
    };

    return mapping[value.toLowerCase()] || value; // Default to the original value if no match
  }
}
