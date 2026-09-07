import { Component, input } from '@angular/core';

@Component({
  selector: 'app-remote-fallback',
  standalone: true,
  template: `
    <div class="fallback-card">
      <div class="icon-wrap">
        <span class="warn-icon">⚠️</span>
      </div>
      <h2 class="title">Remote MFE Unavailable</h2>
      <p class="description">
        Unable to load the <strong>{{ remoteName() }}</strong> micro-frontend module.
      </p>
      <div class="command-box">
        <span class="box-label">Run command to start:</span>
        <code>npx ng serve {{ remoteName() }}</code>
      </div>
      <button type="button" class="btn-retry" (click)="retry()">
        ↻ Retry Connection
      </button>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
    }
    .fallback-card {
      max-width: 480px;
      width: 100%;
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 1rem;
      padding: 2.25rem 2rem;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(10px);
    }
    .icon-wrap {
      margin-bottom: 1rem;
      .warn-icon {
        font-size: 2.5rem;
      }
    }
    .title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0 0 0.5rem;
    }
    .description {
      font-size: 0.9rem;
      color: #94a3b8;
      margin: 0 0 1.25rem;
      line-height: 1.5;
      strong {
        color: #f1f5f9;
      }
    }
    .command-box {
      background: rgba(15, 23, 42, 0.8);
      border: 1px dashed rgba(255, 255, 255, 0.12);
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      align-items: center;
      .box-label {
        font-size: 0.75rem;
        color: #64748b;
        font-weight: 500;
      }
      code {
        color: #38bdf8;
        font-size: 0.85rem;
        font-family: ui-monospace, monospace;
      }
    }
    .btn-retry {
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.35);
      color: #a5b4fc;
      border-radius: 0.5rem;
      padding: 0.6rem 1.25rem;
      font-size: 0.875rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background: rgba(99, 102, 241, 0.25);
        color: #ffffff;
      }
    }
  `,
})
export class RemoteFallbackComponent {
  readonly remoteName = input<string>('module');

  retry(): void {
    window.location.reload();
  }
}
