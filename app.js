const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const postRoutes = require('./routes/post.routes');

app.use('/api/posts', postRoutes);

const hostname = '127.0.0.1';
const port = 3000;


app.use(require('body-parser').json());
app.use(require('cors')());

app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/products', require('./routes/product.routes'));
app.use('/api/users', require('./routes/user.routes'));


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const MONGO_URI = 'mongodb+srv://drink179531:5AK2vKnUEeqqhANW@cluster0.tdth1os.mongodb.net/myDatabase';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

module.exports = mongoose;