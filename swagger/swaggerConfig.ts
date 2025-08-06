// swagger/swaggerConfig.js
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API NintenGames",
    version: "1.0.0",
    description: "Documentación de la API de NintenGames con Swagger",
  },
  servers: [
    {
      url: "http://localhost:3000/api",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/app/api/**/*.js"], // Ajusta según extensión de tus rutas
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
