const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser());
app.use(cors());

const posts = [];

app.get('/posts',(req, res) => {
    res.status(200).send(posts);
});

app.post('/createpost', (req, res) => {
    const { title } = req.body;
    const id = randomBytes(4).toString('hex');
    const dataMap = { id, title};
    posts.push(dataMap);
    res.status(201).send(dataMap);
})

app.listen(4000, ()=> {
    console.log('listening on 4000')
});