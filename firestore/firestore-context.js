const admin = require('firebase-admin');
if(process.env.NODE_ENV === 'develop'){
    admin.initializeApp({
        credential: admin.credential.cert(require(process.env. FIREBASE_JSON_DIR))
    });
    console.log('Running in Develop Server');
}else{
    admin.initializeApp({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CRED))
    });
}

const dbContext = admin.firestore();

module.exports = dbContext;