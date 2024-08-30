require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const  authRouter  = require('./routes/auth')
const  jobsRouter  = require('./routes/jobs')
const connectDB = require('./db/connect.js')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authMiddleware = require('./middleware/authentication.js')
app.use(express.json());
// extra packages

// routes


app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authMiddleware,jobsRouter)

app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const dbURI = 'mongodb+srv://Arvind:1234@nodeexpressproject.v40dk2v.mongodb.net/Jobsapi?retryWrites=true&w=majority&appName=NodeExpressproject'
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(dbURI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
