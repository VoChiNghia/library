const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express()
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const userRouter = require('./router/authRouter')
const borrowRouter = require('./router/borrowRouter')
const productRouter = require('./router/productRouter')
const categoryRouter = require('./router/categoryRouter')
const requestBookRouter = require('./router/requestBookRouter')
const favoriteBookRouter = require('./router/favoriteBooksRouter')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')
const {notFound,errorHandler} = require("./middleware/errorHandler")
const {redisConnections} = require('./config/redisConnect')

const PORT = 5000
const {version} = require('./package.json')
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
dbConnect()
redisConnections()
const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Api Documents',
        version: version,
      },
      servers: [
        {
          url: process.env.SWAGGER_URL,
        },
      ],
      security: [
        {
          Authorization: [],
        },
      ],
      components: {
        securitySchemes: {
            Authorization: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
    apis: ["./router/*.js"],
  };
  const specs = swaggerJsdoc(options);

  app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs))

app.use('/public',express.static('public'));
app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/borrow', borrowRouter)
app.use('/api/category', categoryRouter)
app.use('/api/request', requestBookRouter)
app.use('/api/favorite', favoriteBookRouter)
app.use(notFound);
app.use(errorHandler);


app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`)
})

