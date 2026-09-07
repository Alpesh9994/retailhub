import { InjectionToken } from '@angular/core';

export const AUTH_API_URL = new InjectionToken<string>('AUTH_API_URL', {
  providedIn: 'root',
  factory: () => 'http://localhost:3000',
});
