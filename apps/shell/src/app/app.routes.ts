import { inject, Type } from '@angular/core';
import { Routes } from '@angular/router';
import { REMOTE_LOADER } from './federation/remote-loader.token';

// A remote's exposed component type can't be statically known by the shell
// without a shared contract library; Type<unknown> is the closest safe
// typing Angular itself offers for a dynamically resolved component class.
type RemoteComponentModule = { App: Type<unknown> };

export const routes: Routes = [
  {
    path: 'product',
    loadComponent: () =>
      inject(REMOTE_LOADER)<RemoteComponentModule>('product', './Component').then((m) => m.App),
  },
  {
    path: 'purchasing',
    loadComponent: () =>
      inject(REMOTE_LOADER)<RemoteComponentModule>('purchasing', './Component').then(
        (m) => m.App,
      ),
  },
];
