const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CRED))
});

const dbContext = admin.firestore();

module.exports = dbContext;