const express = require('express');
const dotenv = require('dotenv');
const db = require('./Config/DbConnection')
dotenv.config();
const app = express();
const adminroutes = require('./Routes/Admin');
const bodyParser = require('body-parser');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/admin', adminroutes);

// Routes



app.get('/' , (req,res)=>{
     res.send('Hello World');
});

app.listen(process.env.PORT, ()=>{
     console.log(`Server is running on port ${process.env.PORT}`);
});