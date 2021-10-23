const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT;

function connect() {
  if (process.env.NODE_ENV === 'test') {
    console.log("THIS IS MOCKGOOSE BLOCKKK")
    const Mockgoose = require('mockgoose').Mockgoose;
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage()
      .then(() => {
        mongoose.connect(
          process.env.DB_CONNECT,
          { useUnifiedTopology: true, useNewUrlParser: true }
        );
      })
  } else {
    mongoose.connect(
      process.env.DB_CONNECT,
      { useUnifiedTopology: true,  useNewUrlParser: true },
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
const analysis = require('./routes/analysis')
const option = require('./routes/option')
const vote = require('./routes/vote')
const notif = require('./routes/notif')
const picks = require('./routes/picks')
const trivia = require('./routes/trivia')
const profile = require("./routes/profile")
app.use(express.static('../build'));
app.use(cors());
// app.use(cors({ origin: '*' }));

app.use('/testAPI', testAPI);
app.use('/user', authRoutes);
app.use('/survey', survey);
app.use('/post', post);
app.use('/post/:id', postComment);
app.use('/search', search);
app.use('/analysis', analysis);
app.use('/option', option);
app.use('/vote', vote);
app.use('/radar', radar);
app.use('/notif', notif);
app.use('/picks', picks);
app.use('/trivia', trivia);
app.use("/profile", profile) 

// ----------------------------------- Swagger API Docs ------------------------------------------------
// https://dev.to/kabartolo/how-to-document-an-express-api-with-swagger-ui-and-jsdoc-50do

// -- Auto convert all mongoDB schemas to swagger schemas 
if (process.env.GENERATE_SWAGGER_DOCS == "true") {
  console.log("[Docs] Generating documentation...");

  const m2s = require('mongoose-to-swagger');
  
  let fs = require('fs');
  let files = fs.readdirSync('./models/');
  let schemas = {};
  
  console.log("[Docs] Auto generating schemas for exposed db models");
  files.forEach(file => {
    try {
      const model = require('./models/' + file);
      let swaggerSchema = m2s(model);
      swaggerSchema["type"] = "object";
      schemas[swaggerSchema.title] = swaggerSchema;
    } catch (error) {
      console.error("[Docs Error] Cannot find an exposed model in " + '/models/' + file + " skipping...");
    }
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
  console.log("[Docs] Docs generated and avaliable on /api-docs");
}

// -------------------------- START ---------------------------------

console.log(`Backend starting on port ${port}...\n`);
app.listen(port);
module.exports = ({ connect, app });