const express = require('express');
const graphqlHTTP = require('express-graphql');
// const schema = require('./schema/schema')

// require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
// const mongoose = require('mongoose');
// const uri = process.env.IWGU_URI;

// mongoose
//     .connect(uri, {
//         useNewUrlParser: true,
//         useCreateIndex: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => {
//         console.log('Connect to MongoDB')
//     })
//     .catch(err => console.log(err));

// mongoose.connection.once('open', () => {
//     console.log('conneted to database');
// });
// app.use('/graphql', graphqlHTTP({
//     schema,
//     graphiql: true
// }));

app.use(express.json());
app.use((err, req, res, nex) => { res.send(err.message) });
app.get('/', (req, res) => {
    res.json({ 'key': 'value' });
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 