// Categories routing

import express from "express";
import { Tag} from "../entities/Tag";
import { validate } from "class-validator";

export const TagsRouter = express.Router();

// Récupération de toutes les catégories
TagsRouter.get("/", async (req, res) => {
    const tags = await Tag.find();
    res.json(tags);
  
  });
  
  // Récupération d'une catégorie
TagsRouter.get("/:id", async (req, res) => {
    // Convertir l'ID en nombre à partir des paramètres de la requête
    try {
        const id = Number(req.params.id);
        const tag = await Tag.findOneBy( {id} );
        if (tag !== null){
        res.json (tag)
        } else {
        res.status(404).send();
        }
    } catch {
        res.status(500).send();
    }
  });
  
  // Création d'un nouveau tag
TagsRouter.post("/", async (req, res) => {
    const newTag = new Tag();
    newTag.name=req.body.name;

    const errors = await validate(newTag);
      if (errors.length > 0) {
        return res.status(400).json(errors); // renvoyer les erreurs de validation
      }
    await newTag.save();
    res.json(newTag);
  
  });
  
  // Mise à jour d'un tag
TagsRouter.put("/:id", async (req, res) => {
    try{
      const id = Number(req.params.id);
      const tag = await Tag.findOneBy( {id} );
      if (tag !== null){
       // j'exclus les champs qui ne doivent pas être modifié
      const { created_at, id: bodyId, ...updatedData } = req.body;
      //permet de fusionner sur ad : req.body
      Object.assign(tag, updatedData);
      // Valider l'instance avant de la sauvegarder

        const errors = await validate(tag);
      if (errors.length > 0) {
        return res.status(400).json(errors); // renvoyer les erreurs de validation
      }
      // // je mets à jours updated_at avant de sauvegarder
      // category.updated_at = new Date();
        await  tag.save();
        res.json (tag)
      } else {
        res.status(404).send();
      }
    } catch {
      res.status(500).send();
    }
  });
  
  // Suppression d'une catégorie
TagsRouter.delete("/:id", async (req, res) => {
    try{
    const id = Number(req.params.id);
    const tag = await Tag.findOneBy( {id} );
    if (tag !== null){
      await  tag.remove();
      res.json (tag)
    } else {
      res.status(404).send();
    }
    } catch {
      res.status(500).send();
    }
  
  });