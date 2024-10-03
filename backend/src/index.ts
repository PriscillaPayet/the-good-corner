import express from 'express';
import "reflect-metadata";
import { datasource } from './datasource';
import { CategoriesRouter } from './controllers/categoriesRouter';
import { AdsRouter } from './controllers/adsRouter';
import { TagsRouter } from './controllers/tagsRouter';
import cors from "cors";


const app = express();

// Configuration des options CORS
const corsOptions = {
  origin: "*", // Remplacez par le domaine autorisé si nécessaire
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions));
app.use("/categories", CategoriesRouter);
app.use("/ads", AdsRouter);
app.use("/tags", TagsRouter);


// Démarrage du serveur une fois que la datasource est connectée
async function initialize() {
  await datasource.initialize()
  console.log("Datasource connected")
  app.listen(5000, () => {
  console.log("Server is running on port 5000 🚀");
});
};

initialize();