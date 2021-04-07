require('dotenv').config();
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const app = express();
const usersRoute = require('./routes/users');
const flowRoute = require('./routes/flow');
const authRoute = require('./routes/auth');
const tagRoute = require('./routes/hashtags');

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/users', usersRoute);
app.use('/flow', flowRoute);
app.use('/auth', authRoute);
app.use('/tags', tagRoute);


const port = 3000;
app.listen(port, () => {
    console.log('Server is up and running on port ' + port + '!');
});