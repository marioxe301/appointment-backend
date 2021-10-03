const admin = require('firebase-admin');
const accountCredentials = require('../crendentials/firebaseCredentials.json');

admin.initializeApp({
    credential: admin.credential.cert(accountCredentials)
});

const dbContext = admin.firestore();

module.exports = dbContext;