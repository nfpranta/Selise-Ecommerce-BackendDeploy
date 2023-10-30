const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const mongoDb = require('./database/db');
mongoose.Promise = global.Promise;
mongoose
    .connect(mongoDb.db)
    .then(() => {
        console.log('Database connection established');
    })
    .catch((err) => {
        console.log(`Error connecting to the database: ${err.message}`);
    });

const productRoute = require('./routes/product.route');
const cartRoute = require('./routes/cart.route');
app.use(express.json());
app.use(cors());
app.use('/api', productRoute);
app.use('/api/cart', cartRoute);
app.get('/', (req, res) => {
    res.status(200).send('Hello server is running').end();
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
