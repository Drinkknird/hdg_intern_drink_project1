const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

app.use(express.json());

const postRoutes = require('./routes/post.routes');

app.use('/api', postRoutes);

const hostname = process.env.hostname;
const port = process.env.port;

//testIgnore


app.use(require('body-parser').json());
app.use(require('cors')());

app.use('/api/auths', require('./routes/auth.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/users', require('./routes/user.routes'));


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

module.exports = mongoose;