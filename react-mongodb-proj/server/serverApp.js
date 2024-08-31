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

let userCollection, scheduleCollection;

async function prepareDB() {
    try {
        const client = await MongoClient.connect(uri);
        userCollection = client.db("sample_mflix").collection("users");
        scheduleCollection = client.db("sample_mflix").collection("schedules");
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
            targetUser = await userCollection.findOne({ email: req.body.email });
            if (targetUser && targetUser.password === req.body.password) {
                console.log("login successful");
                req.session.user = {
                    email: targetUser.email,
                    name: targetUser.name,
                    authorized: true
                }
                res.send({ name: targetUser.name, flag: true });
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

router.route("/checkLogOn").get((req, res) => {
    res.send({ flag: !!req.session.user });
})

router.route("/user").post((req, res) => {
    try {
        userCollection.insertOne({...req.body, email:req.session.user.email});
        res.send({ flag: true });
    } catch (err) {
        console.error(e);
        res.status(500).send('Error connecting to MongoDB');
        res.send({ flag: false });
    }
})

const transformDocs = (docs) => docs.map(item => ({
    ...item,
    id: item._id.toString(),
    _id: undefined
}));

router.route("/scheduleAll").get(async (req, res) => {
    try {
        const docs = await scheduleCollection.find({}, { projection: { email: 0, done : 0 } }).toArray(); // Use projection to exclude email
        const transformedDocs = transformDocs(docs);
        res.send({ flag: true, schedules: transformedDocs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to MongoDB');
    }
});

router.route("/schedule").get(async (req, res) => {
    try {
        const docs = await scheduleCollection.find({ email: req.session.user.email }, {projection : {email : 0}}).toArray();
        const transformedDocs = transformDocs(docs);
        res.send({ flag: true, schedules: transformedDocs });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to MongoDB');
        res.send({ flag: false, schedules: [] });
    }
});

router.route("/schedule").post(async (req, res) => {
    try {
        console.log(req.body);
        await scheduleCollection.insertOne({...req.body, email : req.session.user.email, done : false});
        res.send({ flag: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to MongoDB');
    }
});

router.route("/schedule").delete(async (req, res) => {
    try {
        await scheduleCollection.deleteOne({email : req.session.user.email, title : req.body.title});
        res.send({ flag: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to MongoDB');
    }
});

router.route("/schedule").put(async (req, res) => {
    try {


        res.send({ flag: true });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to MongoDB');
    }
});

app.use('/', router);

server.listen(app.get('port'), () => {
    console.log("서버 실행 중 ... http://localhost:" + app.get('port'));
    prepareDB().then(() => console.log('db connection successful'));
});


