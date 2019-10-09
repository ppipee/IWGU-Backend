const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema')

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.IWGU_URI;

app.use(cors())

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('Connect to MongoDB')
    })
    .catch(err => console.log(err));
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error'))
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.use('/', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>IWGU Backend</h1>');
    res.send("Welcome to IWGU Backend")
})
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 
