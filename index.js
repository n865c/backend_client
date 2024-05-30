const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const router=require("./routes/router")
require("dotenv").config();
const app = express();
connectDB();
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }));
app.use(express.json());

app.use('/api/auth', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
