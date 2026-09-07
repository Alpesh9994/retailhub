import { initFederation } from '@angular-architects/native-federation';

// Remote URLs are resolved at runtime from federation.manifest.json
// (served from apps/shell/public/), not baked in at build time.
// This allows the same shell build to be deployed to dev/QA/prod
// with different remote URLs per environment.
initFederation('federation.manifest.json', {
  hostRemoteEntry: { url: './remoteEntry.json' },
})
  .catch((err) => console.error(err))
  .then((result) => import('./bootstrap').then((m) => m.bootstrap(result?.loadRemoteModule)))
  .catch((err) => console.error(err));
