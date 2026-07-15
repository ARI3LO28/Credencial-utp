const admin = require('firebase-admin');

function buildCredential() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    return admin.credential.cert(require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH));
  }

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    return admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON));
  }

  return admin.credential.applicationDefault();
}

function getFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: buildCredential(),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    });
  }

  return admin;
}

module.exports = { getFirebaseAdmin };
