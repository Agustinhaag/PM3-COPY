import { AppDataSource } from "./config/data-source";
import app from "./server";
import "reflect-metadata";
import "dotenv/config";

const port = process.env.port;

AppDataSource.initialize().then((res) => {
  console.log("Conexión a la bd exítosa");
  app.listen(port, () => {
    console.log(`Corriendo en puerto ${port}`);
  });
});
