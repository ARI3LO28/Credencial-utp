import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, browserLocalPersistence, getAuth, initializeAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

import { firebaseConfig } from './config';

export class FirebaseSingleton {
  private static app: FirebaseApp;
  private static auth: Auth;
  private static db: Firestore;
  private static storage: FirebaseStorage;

  static getApp(): FirebaseApp {
    if (!FirebaseSingleton.app) {
      FirebaseSingleton.app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    }

    return FirebaseSingleton.app;
  }

  static getAuth(): Auth {
    if (!FirebaseSingleton.auth) {
      const app = FirebaseSingleton.getApp();

      try {
        FirebaseSingleton.auth = initializeAuth(app, {
          persistence: browserLocalPersistence,
        });
      } catch {
        FirebaseSingleton.auth = getAuth(app);
      }
    }

    return FirebaseSingleton.auth;
  }

  static getDb(): Firestore {
    if (!FirebaseSingleton.db) {
      FirebaseSingleton.db = getFirestore(FirebaseSingleton.getApp());
    }

    return FirebaseSingleton.db;
  }

  static getStorage(): FirebaseStorage {
    if (!FirebaseSingleton.storage) {
      FirebaseSingleton.storage = getStorage(FirebaseSingleton.getApp());
    }

    return FirebaseSingleton.storage;
  }
}
