import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

@Component({
  imports: [CommonModule],
  selector: 'rh-badge',
  styleUrl: './badge.scss',
  templateUrl: './badge.html',
})
export class Badge {
  readonly variant = input<BadgeVariant>('neutral');
  readonly dot = input<boolean>(true);
}
