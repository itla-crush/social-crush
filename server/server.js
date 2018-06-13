import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
const PORT = process.env.NODE_ENV || 3825;

// Config
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
// End Config

app.all('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'home.html'));
});

app.all('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'home.html'));
});


app.listen(PORT, (error) => {
    //if (error) console.log(error);
    console.log(`Server on port: ${PORT}`);
});