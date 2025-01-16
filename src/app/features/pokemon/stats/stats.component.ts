import { Component, input, OnInit } from '@angular/core';
import { StatNamePipe } from '../../../pipes/stat-name.pipe';

@Component({
  selector: 'app-stats',
  imports: [StatNamePipe],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css',
})
export class StatsComponent implements OnInit {
  statName = input<string>('');
  statValue = input<number>(0);
  statRatio = 0;
  color = input<string>('');
  statBar = Array.from({ length: 20 }, (_, index) => index + 1);

  ngOnInit(): void {
    this.statRatio = Math.round(this.statValue() / (255 / 20));
  }
}
