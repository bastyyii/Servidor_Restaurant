const express = require('express');
const conectDB = require('./config/db');
const cors = require('cors');

const app = express();

conectDB();

app.use(cors());

app.use(express.json({ extended: true}));

const PORT = process.env.PORT || 4000;

app.use('/api/user', require('./users/routesUser'));
app.use('/api/auth', require('./auth/routesAuth'));
app.use('/api/restaurant', require('./restaurant/routesRestaurant'));
app.use('/api/branch', require('./branches/routesBranches'));
app.listen(PORT, () => {
    //console.log(`El servidor esta corriendo en el puerto ${4000}`);
});

