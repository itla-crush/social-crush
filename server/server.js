// import app from 'config/express';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use('./client/public',express.static('public'));
app.use(express.static(path.join(__dirname, 'client/public')));

// const PORT = process.env || 3825;

// app.listen(3825, function(error){
//     console.log('Server on port 3825');
// });

app.listen(3825, (error) => {
    if (error) console.log(error);
    console.log(`Server on port: 3825`);
});