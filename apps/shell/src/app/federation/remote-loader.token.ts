import { InjectionToken } from '@angular/core';
import type { NativeFederationResult } from '@angular-architects/native-federation';

/**
 * Carries the `loadRemoteModule` function returned by `initFederation()`
 * (see main.ts) so that lazy routes can use it via `inject()` instead of
 * importing the deprecated module-scoped `loadRemoteModule` helper.
 */
export const REMOTE_LOADER = new InjectionToken<NativeFederationResult['loadRemoteModule']>(
  'REMOTE_LOADER',
);
