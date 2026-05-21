import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  get(key: string): string | null {
    return sessionStorage.getItem(key)
  }

  remove(key: string): void {
    sessionStorage.removeItem(key)
  }

  set(key: string, value: string): void {
    sessionStorage.setItem(key, value)
  }
}
