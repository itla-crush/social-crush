import app from './config/express';
import path from 'path';

const PORT = process.env.NODE_ENV || 3825;


app.all('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/client/public/views/index.html'));
});



app.listen(PORT, (error) => {
    //if (error) console.log(error);
    console.log(`Server on port: ${PORT}`);
    // console.log(path.join(__dirname, '..', 'client/public/views/index.html'));
    // console.log(path.join(__dirname, '..', '/client/public/views/index.html'));
    // console.log(path.join(__dirname, '../client/public/views/index.html'));
});