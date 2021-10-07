const {
    getDocumentsByCollection,
    postDocumentToCollection,
    deleteDocumentInCollection,
    updateDocumentInCollection
} = require('../firestore/firestore-functions');

const schema = require('../schemas/appointment');
const mokupData = require('./data/test-data.json');

const deleteAllDocuments = async () =>{
    let elements = await getDocumentsByCollection('TDD');
    for(let items of elements){
        await deleteDocumentInCollection('TDD',items.docId);
    }
};

const addTestData = async ()=>{
    for(let data of mokupData){
        await postDocumentToCollection('TDD',data);
    }
};


beforeAll( async()=>{
    await deleteAllDocuments();
    await addTestData();
});

test('Get Endopoint Test of Appointments', async ()=>{
    const documents = await getDocumentsByCollection('TDD');
    expect(documents.length).toBe(mokupData.length);
});

test('Post Endpoint Test', async()=>{
    const addedDocument = await postDocumentToCollection('TDD',mokupData[0]);
    const documents = await getDocumentsByCollection('TDD');
    expect(documents.find((element=> element.docId === addedDocument.docId))).toBeDefined();
    //Note: Find() returns undefine if not exists on array
});

test('Put Endpoint Test', async()=>{
    let documents = await getDocumentsByCollection('TDD');
    documents[0].fields.title= "Testing Title for TDD";
    await updateDocumentInCollection('TDD',documents[0].docId,documents[0].fields);
    documents = await getDocumentsByCollection('TDD');
    expect(documents.find((element=> element.fields.title === "Testing Title for TDD"))).toBeDefined();
});

test('Delete Endpoint Test', async ()=>{
    let documents = await getDocumentsByCollection('TDD');
    const finalLength = documents.length - 1;
    await deleteDocumentInCollection('TDD',documents[0].docId);
    documents = await getDocumentsByCollection('TDD');
    expect(documents.length).toBe(finalLength);
});

describe('General Middleware Test',()=>{
    test('Validation Schema Middleware Test Succes', ()=>{
        const result = schema.validate(mokupData[0]);
        expect(result.error).toBeUndefined();
    });

    test('Validation Schema Middleware Test Failed',()=>{
        let badData = mokupData[0];
        badData.title = 1;
        const result = schema.validate(badData);
        expect(result.error).toBeDefined();
    });
});


afterAll( async ()=>{
    await deleteAllDocuments();
});