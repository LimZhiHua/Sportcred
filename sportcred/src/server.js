const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

function connect() {
  if (process.env.NODE_ENV === 'test') {
    console.log("THIS IS MOCKGOOSE BLOCKKK")
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage()
      .then(() => {
        mongoose.connect(
          process.env.DB_CONNECT,
          { useNewUrlParser: true }
        );
      })
  } else {
    mongoose.connect(
      process.env.DB_CONNECT,
      { useNewUrlParser: true },
      () => console.log('connected to db')
    );
  }

}

connect();

// // Middleware
// app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const testAPI = require('./routes/testAPI')

const authRoutes = require('./routes/auth')
const survey = require('./routes/survey')
const post = require("./routes/post")
const postComment = require("./routes/postComment")
const search = require('./routes/search')
const radar = require('./routes/radarlist')
const debate = require('./routes/debate')
const option = require('./routes/option')
const vote = require('./routes/vote')
const notif = require('./routes/notif')
const picks = require('./routes/picks')
const trivia = require('./routes/trivia')

app.use(cors({ origin: '*' }));

app.use('/testAPI', testAPI);
app.use('/user', authRoutes);
app.use('/survey', survey);
app.use('/post', post);
app.use('/post/:id/postComment', postComment);
app.use('/search', search);
app.use('/debate', debate);
app.use('/option', option);
app.use('/vote', vote);
app.use('/radar', radar);
app.use('/notif', notif);
app.use('/picks', picks);
app.use('/trivia', trivia);

// ----------------------------------- Swagger API Docs ------------------------------------------------
// https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do

// -- Auto convert all mongoDB schemas to swagger schemas 

const m2s = require('mongoose-to-swagger');

let fs = require('fs');
let files = fs.readdirSync('./models/');
let schemas = {};

files.forEach(file => {
  const model = require('./models/' + file);
  let swaggerSchema = m2s(model);
  swaggerSchema["type"] = "object";
  schemas[swaggerSchema.title] = swaggerSchema;
});

// console.log(JSON.stringify(schemas, null, 2));

// -- Setup swagger to generate API docs from doc strings
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: 'Sportscred REST API',
    version: '1.0.0',
  },
};
const options = {
  swaggerDefinition,
  // Paths to files containing API definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
swaggerSpec.components = {
  schemas: schemas 
}; 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// -------------------------- START ---------------------------------

console.log(`Backend starting on port ${port}...\n`);
app.listen(port);
module.exports = ({ connect, app });