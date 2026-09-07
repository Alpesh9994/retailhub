import { bootstrapApplication } from '@angular/platform-browser';
import type { NativeFederationResult } from '@angular-architects/native-federation';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { REMOTE_LOADER } from './app/federation/remote-loader.token';

export function bootstrap(loadRemoteModule?: NativeFederationResult['loadRemoteModule']) {
  return bootstrapApplication(App, {
    ...appConfig,
    providers: [
      ...appConfig.providers,
      ...(loadRemoteModule ? [{ provide: REMOTE_LOADER, useValue: loadRemoteModule }] : []),
    ],
  }).catch((err) => console.error(err));
}
