import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, map, of, switchMap, tap } from 'rxjs';
import { AuthUser, LoginRequest, LoginResponse, LogoutResponse, RefreshResponse } from './auth.models';
import { AUTH_API_URL } from './auth.tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = inject(AUTH_API_URL);

  // In-memory signals (token is never stored in localStorage / sessionStorage)
  private readonly _currentUser = signal<AuthUser | null>(null);
  private readonly _accessToken = signal<string | null>(null);
  private readonly _isLoading = signal<boolean>(false);
  private readonly _isInitialized = signal<boolean>(false);

  readonly currentUser = this._currentUser.asReadonly();
  readonly accessToken = this._accessToken.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly isInitialized = this._isInitialized.asReadonly();
  readonly isAuthenticated = computed(() => !!this._accessToken() && !!this._currentUser());

  login(credentials: LoginRequest): Observable<LoginResponse> {
    this._isLoading.set(true);
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/auth/login`, credentials, {
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          this._accessToken.set(res.accessToken);
          this._currentUser.set(res.user);
          this._isInitialized.set(true);
        }),
        finalize(() => this._isLoading.set(false)),
      );
  }

  logout(): Observable<void> {
    this._isLoading.set(true);
    return this.http
      .post<LogoutResponse>(`${this.apiUrl}/auth/logout`, {}, { withCredentials: true })
      .pipe(
        catchError(() => of({ message: 'Logged out' })),
        tap(() => {
          this._clearSession();
          this.router.navigate(['/login']);
        }),
        map(() => void 0),
        finalize(() => this._isLoading.set(false)),
      );
  }

  refresh(): Observable<string> {
    return this.http
      .post<RefreshResponse>(`${this.apiUrl}/auth/refresh`, {}, { withCredentials: true })
      .pipe(
        tap((res) => {
          this._accessToken.set(res.accessToken);
        }),
        map((res) => res.accessToken),
      );
  }

  getMe(): Observable<AuthUser> {
    return this.http
      .get<AuthUser>(`${this.apiUrl}/auth/me`, { withCredentials: true })
      .pipe(
        tap((user) => {
          this._currentUser.set(user);
        }),
      );
  }

  initAuth(): Observable<boolean> {
    if (this._isInitialized()) {
      return of(this.isAuthenticated());
    }

    this._isLoading.set(true);
    return this.refresh().pipe(
      switchMap(() => this.getMe()),
      map(() => {
        this._isInitialized.set(true);
        return true;
      }),
      catchError(() => {
        this._clearSession();
        this._isInitialized.set(true);
        return of(false);
      }),
      finalize(() => this._isLoading.set(false)),
    );
  }

  private _clearSession(): void {
    this._accessToken.set(null);
    this._currentUser.set(null);
  }
}
