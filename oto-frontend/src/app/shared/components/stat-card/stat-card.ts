import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: false,
  templateUrl: './stat-card.html',
  styleUrls: ['./stat-card.scss'],
})
export class StatCard {
  @Input() title = '';
  @Input() value: string | number = 0;
  @Input() icon = 'info';
  @Input() color: 'sky' | 'green' | 'orange' | 'purple' | 'indigo' = 'sky';
  @Input() subtitle = '';
}