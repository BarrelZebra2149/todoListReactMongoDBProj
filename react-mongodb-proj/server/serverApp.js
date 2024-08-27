const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const http = require('http');
const server = http.createServer(app);
const uri = process.env.MONGO_DB_URI;

let targetCollection;

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

app.set('port', 5000);

// Middleware setup
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'my key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: uri }),
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        httpOnly: true,
    }
}));

app.use('/', express.static("public"));

const router = express.Router();

router.route("/login").post(async (req, res) => {
    console.log(req.body.email, req.body.password);
    let targetUser;
    if (req.body.email !== "") {
        try {
            targetUser = await targetCollection.findOne({ email: req.body.email });
            if (targetUser && targetUser.password === req.body.password) {
                console.log("login successful");
                req.session.user = {
                    email: targetUser.email,
                    name: targetUser.name,
                    authorized: true
                }
                res.send({ flag: true });
            } else {
                console.log("user doesn't exist or password is incorrect.");
                res.send({ flag: false });
            }
        } catch (e) {
            console.error(e);
            res.status(500).send('Error connecting to MongoDB');
        }
    } else {
        console.log("Id required.");
        res.send({ flag: false });
    }
});

router.route("/logout").get((req, res) => {
    if (!req.session.user) {
        console.log("Not logged in.");
        res.send({ flag: true });
        return;
    }
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send({ flag: false });
        } else {
            console.log("Session destroyed.");
            res.send({ flag: true });
        }
    });
});

app.use('/', router);

server.listen(app.get('port'), () => {
    console.log("서버 실행 중 ... http://localhost:" + app.get('port'));
    prepareDB().then(r => console.log('db connection successful'));
});
