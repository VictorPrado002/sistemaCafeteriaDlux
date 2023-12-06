import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const buffer = await crypto.subtle.digest('SHA-256', data);
    const hashedArray = Array.from(new Uint8Array(buffer));
    const hashedHex = hashedArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashedHex;
  }
}
