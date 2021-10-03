const express = require('express');
const router = express.Router();
const {
    getDocumentsByCollection,
    postDocumentToCollection,
    updateDocumentInCollection,
    deleteDocumentInCollection
} = require('../firestore/firestore-functions');

//Note: Only Post and Put Need Schema Validation Middleware
const schemaMiddleware = require('../middlewares/schema-validation');


router.get('/', async (req,res)=>{
    const documents = await getDocumentsByCollection('appointments');
    res.status(200).json(documents);
});


router.delete('/:id', async (req,res)=>{
    const response = await deleteDocumentInCollection('appointments',req.params.id);
    res.status(200).json(response);
});


router.post('/',schemaMiddleware, async (req,res)=>{
    const addedDocument = await postDocumentToCollection('appointments',req.body);
    res.status(200).send(addedDocument);
});


router.put('/:id',schemaMiddleware, async (req,res) =>{
    const response = await updateDocumentInCollection('appointments',req.params.id,req.body);
    res.status(200).json(response);
});


module.exports = router;