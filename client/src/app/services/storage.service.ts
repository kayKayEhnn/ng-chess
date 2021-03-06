import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { parseJwt } from '../utilities/parseJwt';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly KEY = 'jwt';

  private token: string;
  private storage = window.localStorage;

  constructor () {
    this.token = this.storage.getItem(this.KEY);
  }

  load (): User {
    const token = this.token;
    return this.parseToken(token);
  }

  save (token: string) {
    this.token = token;
    this.storage.setItem(this.KEY, token);

    return this.parseToken(token);
  }

  getToken (): string {
    return this.token;
  }

  private parseToken (token: string | null): User {
    // checks for null
    return token && parseJwt<User>(token);
  }
}
