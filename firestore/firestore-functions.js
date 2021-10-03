const firestoreContext = require('./firestore-context');

const getDocumentsByCollection = async (name) =>{
    try {
        let data = [];
        let documents = await(await firestoreContext.collection(name).get()).docs;
        documents.forEach((doc)=>{
            data.push({
                docId: doc.id,
                fields: doc.data()
            })
        });
        return data;
    }catch(error){
        console.error(error);
        return error;
    }
};


const postDocumentToCollection = async (name, object) =>{
    try {
        const collectionReference = firestoreContext.collection(name);
        const response = await collectionReference.add(object);
        const addedDocument = await response.get()

        return {
            docId: addedDocument.id,
            fields: addedDocument.data()
        }
    }catch (error){
        console.error(error);
        return error;
    }
};


const updateDocumentInCollection = async (name,docId,object) =>{
    try {
        const documentReferece = await firestoreContext.collection(name).doc(docId);
        await documentReferece.update(object);
        return object;
    }catch(error){
        console.error(error);
        return error;
    }
};


const deleteDocumentInCollection = async (name,docId)=>{
    try {
        const documentReferece = await firestoreContext.collection(name).doc(docId);
        await documentReferece.delete();
        return {
            status: 'OK',
            message: `Document ${docId} Deleted`
        }
    }catch(error){
        console.error(error);
        return error;
    }
};


module.exports={
    getDocumentsByCollection,
    postDocumentToCollection,
    updateDocumentInCollection,
    deleteDocumentInCollection
}