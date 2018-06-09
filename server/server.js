import path from 'path';
import app from './config/express';

// const PORT = process.env || 3825;

// app.listen(3825, function(error){
//     console.log('Server on port 3825');
// });

app.listen(3825, (error) => {
    if (error) console.log(error);
    console.log(`Server on port: 3825`);
});