const express = require('express');
const mysql = require('mysql');
const contactRoute = require('./api/routes/contactus.route.js')
const userRoute = require('./api/routes/user.route.js');
const blogRoute = require('./api/routes/blog.route.js');
const app = express();
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000


//middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));


app.use('/api/contact-us', contactRoute)
app.use('/api/user', userRoute)
app.use('/api/blog', blogRoute)

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("on port " + port)
    }
})