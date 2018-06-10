import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use('./client/public',express.static('public'));
app.use(express.static(path.join(__dirname, '..', '/client/public')));

// app.use();

export default app;