const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');


const app = express();
app.use(bodyParser());
app.use(cors());

const posts = [];

app.get('/posts',(req, res) => {
    res.status(200).send(posts);
});

app.post('/createpost', async (req, res) => {
    const { title } = req.body;
    const id = randomBytes(4).toString('hex');
    const dataMap = { id, title}; 
    posts.push(dataMap);
    // emit event from here to event bus service.
    await axios.post('http://localhost:6000/events',{
        type: 'POST_CREATED',
        payload: { dataMap }
    });
    res.status(201).send(dataMap);
});

app.post('/events', (req, res) => {
    console.log(req.body);
})

app.listen(4000, ()=> {
    console.log('listening on 4000')
});