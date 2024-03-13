// app.js
const express = require('express');
const app = express();
const mongoose = require('mongoose'); // เรียกใช้งาน mongoose โดยตรง

app.use(express.json());

app.use('/api/posts', require('./routes/post.routes'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


const MONGO_URI = 'mongodb+srv://drink179531:5AK2vKnUEeqqhANW@cluster0.tdth1os.mongodb.net/myDatabase'; // เพิ่มชื่อฐานข้อมูล myDatabase ต่อท้าย URI

mongoose.connect(MONGO_URI)
    .then(() => console.log('เชื่อมต่อ MongoDB สำเร็จ'))
    .catch(err => console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:', err));