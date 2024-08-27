const http = require('http');
const express = require('express');
const serverApp = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require("express-session");

const uri = process.env.MONGO_DB_URI;
let targetCollection;
const { MongoClient } = require('mongodb');

async function prepareDB() {
    try {
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        targetCollection = client.db("sample_mflix").collection("users");
        console.log('MongoDB Atlas Connected');
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
serverApp.set('port', 5000);

// static middle ware
serverApp.use('/', express.static("public"));

// this allows other clients to access
serverApp.use(cors());
serverApp.use(bodyParser.urlencoded({ extended: false }));
serverApp.use(bodyParser.json());