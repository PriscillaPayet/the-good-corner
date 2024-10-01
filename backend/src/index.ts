import express from 'express';
import "reflect-metadata";
import { datasource } from './datasource';
import { CategoriesRouter } from './controllers/categories';
import { AdsRouter } from './controllers/ads';
import { TagsRouter } from './controllers/tags';


const app = express();

app.use(express.json());
app.use("/categories", CategoriesRouter)
app.use("/ads", AdsRouter)
app.use("/tags", TagsRouter)

// Démarrage du serveur une fois que la datasource est connectée
async function initialize() {
  await datasource.initialize()
  console.log("Datasource connected")
  app.listen(5000, () => {
  console.log("Server is running on port 5000 🚀");
});
};

initialize();