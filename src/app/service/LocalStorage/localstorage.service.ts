import { Injectable } from '@angular/core';
import { StorageObject } from '../../Models/Order';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem(key: string, value: any, maxAge = 20 * 60 * 1000) {
    let result: StorageObject = {
      data: value,
      expiryTime: Date.now() + maxAge,
    };
    if (key === 'roomId') {
      localStorage.clear();
    }
    localStorage.setItem(key, JSON.stringify(result));
  }

  getItem(key: string): any {
    // get the parsed value of the given key
    let data = localStorage.getItem(key);
    if (data === null) {
      return null;
    }

    let result = JSON.parse(data);
    if (Date.now() > result.expiryTime) {
      if (key === 'RoomId') {
        localStorage.clear();
      }
      localStorage.removeItem(key);
      return null;
    }
    return result.data;
  }

  setObject(key: string, value: object, maxAge = 20 * 60 * 1000) {
    let result: StorageObject = {
      data: value,
      expiryTime: Date.now() + maxAge,
    };
    localStorage.setItem(key, JSON.stringify(result));
  }

  getObject(key: string): object {
    // get the parsed value of the given key
    let data = localStorage.getItem(key);
    if (data === null) {
      return [];
    }

    let result = JSON.parse(data);
    if (result.expireTime <= Date.now()) {
      localStorage.removeItem(key);
      return [];
    }
    return result.data;
  }
}
