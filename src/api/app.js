const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware')
const server = restify.createServer();

const settings = require('./settings');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = `mongodb://${settings.host}:${settings.port}/${settings.database}`;
const connection = MongoClient.connect(url);

const cors = corsMiddleware({
  origins: ['http://localhost:4200']
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.bodyParser({ mapParams: false }));

server.get('/api/contacts', (req, res) => {
  connection.then(response => {
    const contacts = response.collection('contacts');
    return contacts.find({}).toArray();
  }).then(response => {
    res.json(response);
  });
});

server.post('/api/contacts', (req, res) => {
  connection.then(response => {
    const contacts = response.collection('contacts');
    return contacts.insertOne(req.body);
  }).then(response => {
    console.log(response);
    res.json(response);
  });
});

server.get('/api/contacts/:objectID', (req, res) => {
  const objectID = req.params.objectID;
  connection.then(response => {
    const contacts = response.collection('contacts');
    return contacts.findOne(ObjectID(objectID));
  }).then(response => {
    res.json(response);
  });
});

server.post('/api/contacts/:objectID', (req, res) => {
  const objectID = req.params.objectID;
  connection.then(response => {
    const contacts = response.collection('contacts');
    return contacts.replaceOne({ _id: ObjectID(objectID) }, req.body);
  }).then(response => {
    console.log(response.matchedCount);
    res.json(response);
  });
});

server.del('/api/contacts/:objectID', (req, res) => {
  const objectID = req.params.objectID;
  connection.then(response => {
    const contacts = response.collection('contacts');
    return contacts.deleteOne({ _id: ObjectID(objectID) });
  }).then(response => {
    console.log(response.deletedCount);
    res.json(response);
  });
});
// server.get('/products', (req, res, next) => res.send('Get Products'));
// server.get('/products/:id', (req, res, next) => res.json(`Getting product with ID: ${req.params.id}`));

server.listen(3000, () => console.log('Magic happens on port 3000'));