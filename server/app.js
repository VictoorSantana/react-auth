const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.json({ message: 'any' });
});

app.post('/api/login', (req,res) => {
    
    //first find the data in db
    //get and use it in jwt
    const userMock = {
        user: 'victor',
        pass: 'asd123'
    };

    console.log(req.body);
    
    if(!req.body.user.trim().length > 0 && !req.body.pass.trim() > 0) {
        res.json({
            message: 'No data found!',
            token: token
        });
    }


    if(req.body.user.trim().toString() == userMock.user && req.body.pass.trim().toString() == userMock.pass) {
        jwt.sign({user: userMock}, 'seckit', {expiresIn: '60s'}, (err, token) => {
            res.json({
                message: 'Welcome!',
                token: token
            });
        });
    }else {
        res.json({
            message: 'Your username or password are incorrect',
            token: ''
        });
    }   
});

app.post('/api/consume', verifyToken, (req,res) => {
    jwt.verify(req.token, 'seckit', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'You have auth to consume this api',
                authData
            });
        }
    });
});


function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403); //Forbidden
    }
}

app.listen(5000, () => {
    console.log('Listening localhost nodejs');
});