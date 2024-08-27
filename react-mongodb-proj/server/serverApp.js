const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const expressSession = require("express-session");

require('dotenv').config();

const uri = process.env.MONGO_DB_URI;
let targetCollection;
const { MongoClient } = require('mongodb');

console.log(process.env.MONGO_DB_URI);
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

// static middle ware (moved after router)
app.use('/', express.static("public"));

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// 쿠키 사용 미들웨어 설정
app.use(cookieParser());
// 세션 미들웨어 등록
app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

const router = express.Router();

router.route("/login").post(async (req, res) => {
    console.log(req.body.email, req.body.password);
    let targetUser;
    if (req.body.email !== "") {
        try {
            targetUser = await targetCollection.findOne({email: req.body.email});
            if (targetUser && targetUser.password === req.body.password) {
                console.log("login successful");
                req.session.user = {
                    email: targetUser.email,
                    name: targetUser.name,
                    authorized: true
                }
                res.send({flag : true});
            } else {
                console.log("user doesn't exist or password is incorrect.");
                res.send({flag : false});
            }
        } catch (e) {
            console.error(e);
            res.status(500).send('Error connecting to MongoDB');
        }
    } else {
        console.log("Id required.");
        res.send({flag : false});
    }
});

router.route("/logout").get((req, res)=>{
    console.log(req.session);
    if(!req.session.user) {
        res.send({flag : true});
        return;
    }
    req.session.destroy((err)=>{
        if(err) throw err;
        res.send({flag : false});
    });
});
// Use the router
app.use('/', router);

const server = http.createServer(app);
server.listen(app.get('port'), () => {
    console.log("서버 실행 중 ... http://localhost:" + app.get('port'));
    prepareDB().then(r => console.log('db connection successful'));
});
