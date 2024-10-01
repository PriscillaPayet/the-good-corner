// Categories routing

import express from "express";
import { Category} from "../entities/Category";
import { validate } from "class-validator";

export const CategoriesRouter = express.Router();

// Récupération de toutes les catégories
CategoriesRouter.get("/", async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
  
  });
  
  // Récupération d'une catégorie
CategoriesRouter.get("/:id", async (req, res) => {
    // Convertir l'ID en nombre à partir des paramètres de la requête
    try {
        const id = Number(req.params.id);
        const category = await Category.findOneBy( {id} );
        if (category !== null){
        res.json (category)
        } else {
        res.status(404).send();
        }
    } catch {
        res.status(500).send();
    }
  });
  
  // Création d'une nouvelle catégorie
CategoriesRouter.post("/", async (req, res) => {
    const newCategory = new Category();
    newCategory.name=req.body.name;

    const errors = await validate(newCategory);
      if (errors.length > 0) {
        return res.status(400).json(errors); // renvoyer les erreurs de validation
      }
    await newCategory.save();
    res.json(newCategory);
  
  });
  
  // Mise à jour d'une catégorie
CategoriesRouter.put("/:id", async (req, res) => {
    try{
      const id = Number(req.params.id);
      const category = await Category.findOneBy( {id} );
      if (category !== null){
       // j'exclus les champs qui ne doivent pas être modifié
      const { created_at, id: bodyId, ...updatedData } = req.body;
      //permet de fusionner sur ad : req.body
      Object.assign(category, updatedData);
      // Valider l'instance avant de la sauvegarder

        const errors = await validate(category);
      if (errors.length > 0) {
        return res.status(400).json(errors); // renvoyer les erreurs de validation
      }
      // // je mets à jours updated_at avant de sauvegarder
      // category.updated_at = new Date();
        await  category.save();
        res.json (category)
      } else {
        res.status(404).send();
      }
    } catch {
      res.status(500).send();
    }
  });
  
  // Suppression d'une catégorie
CategoriesRouter.delete("/:id", async (req, res) => {
    try{
    const id = Number(req.params.id);
    const category = await Category.findOneBy( {id} );
    if (category !== null){
      await  category.remove();
      res.json (category)
    } else {
      res.status(404).send();
    }
    } catch {
      res.status(500).send();
    }
  
  });