import { inject, Type } from '@angular/core';
import { Routes } from '@angular/router';
import { authGuard, guestGuard } from '@retailhub/shared-auth';
import { REMOTE_LOADER } from './federation/remote-loader.token';
import { RemoteFallbackComponent } from './federation/remote-fallback.component';

type RemoteComponentModule = { App: Type<unknown> };

function loadRemoteSafe(remoteName: string, exposedModule = './Component') {
  const loader = inject(REMOTE_LOADER);
  return loader<RemoteComponentModule>(remoteName, exposedModule)
    .then((m) => m.App)
    .catch((err) => {
      console.warn(`[NativeFederation] Remote "${remoteName}" is unreachable:`, err);
      return RemoteFallbackComponent;
    });
}

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layout/shell-layout.component').then((m) => m.ShellLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'product',
      },
      {
        path: 'product',
        loadComponent: () => loadRemoteSafe('product'),
      },
      {
        path: 'purchasing',
        loadComponent: () => loadRemoteSafe('purchasing'),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
