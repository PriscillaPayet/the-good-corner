// Ads routing
import express from "express";
import { Ad} from "../entities/Ad";
import { validate } from "class-validator";

export const AdsRouter = express.Router();

// Récupération de toutes les annonces
AdsRouter.get("/", async (req, res) => {
    const ads = await Ad.find({
      relations: {
        category: true,
        tags: true
      },
    });
    res.json(ads);
  });
  
  AdsRouter.get("/:id", async (req, res) => {
    // Convertir l'ID en nombre à partir des paramètres de la requête
    try {
      const id = Number(req.params.id);
      
      // Recherche de l'annonce par ID avec ses relations
      const ad = await Ad.findOne({
        where: { id },
        relations: ['category', 'tags'], // Utilisation correcte des relations
      });
  
      if (ad !== null) {
        res.json(ad);
      } else {
        res.status(404).send(); // Annonce non trouvée
      }
    } catch (error) {
      console.error(error); // Journaliser l'erreur pour le débogage
      res.status(500).send(); // Erreur interne du serveur
    }
  });
  
  // Création d'une nouvelle annonce
AdsRouter.post("/", async (req, res) => {
  try{
    const newAd = new Ad();
    Object.assign(newAd, req.body)

    // Valider l'instance avant de la sauvegarder
    const errors = await validate(newAd);
    if (errors.length > 0) {
      return res.status(400).json(errors); // renvoyer les erreurs de validation
    }
    
    await newAd.save();
    res.json(newAd);
   } catch{
    res.status(500).send();
   }
  });
    
  // Suppression d'une annonce
AdsRouter.delete("/:id", async (req, res) => {
    try{
      const id = Number(req.params.id);
      const ad = await Ad.findOneBy( {id} );
      if (ad!== null){
        await  ad.remove();
        res.json (ad)
      } else {
        res.status(404).send();
      }
      } catch {
        res.status(500).send();
      }
    });
  
  
  // Mise à jour d'une annonce
AdsRouter.put("/:id", async (req, res) => {
  try{
    const id = Number(req.params.id);
    const ad = await Ad.findOneBy( {id} );
    if (ad !== null){
      // j'exclus les champs qui ne doivent pas être modifié
      const { created_at, updated_at, id: bodyId, ...updatedData } = req.body;
      //permet de fusionner sur ad 
      Object.assign(ad, updatedData);
      // Valider l'instance avant de la sauvegarder
    const errors = await validate(ad);
    if (errors.length > 0) {
      return res.status(400).json(errors); // renvoyer les erreurs de validation
    }
    // // je mets à jours updated_at avant de sauvegarder
    // ad.updated_at = new Date();
    await  ad.save();
    res.json (ad)
    } else {
      res.status(404).send();
    }
  } catch {
    res.status(500).send();
  }
});

// partial edit
AdsRouter.patch("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const ad = await Ad.findOneBy({ id });
    if (ad !== null) {
      // j'exclus les champs qui ne doivent pas être modifié
      const { created_at, updated_at, id: bodyId, ...updatedData } = req.body;
      Object.assign(ad, updatedData);

      const errors = await validate(ad);
      if (errors.length) {
        res.status(400).json(errors);
      } else {
        //  // je mets à jours updated_at avant de sauvegarder
        // ad.updated_at = new Date();
        await ad.save();
        res.json(ad);
      }
    } else {
      res.status(404).send();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});