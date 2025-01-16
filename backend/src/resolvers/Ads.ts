import { Arg, Authorized, ID, Mutation, Query, Resolver } from "type-graphql";
import { In } from "typeorm";
import { Ad, AdCreateInput, AdUpdateInput } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { validate } from "class-validator";
import { merge } from "../utils/merge";

@Resolver()
export class AdsResolver {
   
    @Query(() => [Ad])
    async ads(): Promise<Ad[]> {
        return await Ad.find({ relations: { category: true, tags: true } });
    }

    @Query(() => Ad, { nullable: true })
    async ad(@Arg('id', () => ID) id: number): Promise<Ad | null> {
        return await Ad.findOne({
            where: { id },
            relations: { category: true, tags: true }
        });
    }

   
    @Mutation(() => Ad)
    async createAd(
      @Arg("data", () => AdCreateInput) data: AdCreateInput
    ): Promise<Ad> {
      const newAd = new Ad();
      Object.assign(newAd, data);
  
      const errors = await validate(newAd);
      if (errors.length > 0) {
        throw new Error(`Validation error: ${JSON.stringify(errors)}`);
      } else {
        await newAd.save();
        return newAd;
      }
    }

    @Mutation(() => Ad, { nullable: true })
    async updateAd(
      @Arg("id", () => ID) id: number,
      @Arg("data", () => AdUpdateInput) data: AdUpdateInput
    ): Promise<Ad | null> {
      const ad = await Ad.findOne({
        where: { id },
        relations: { category: true, tags: true }  
      });
    
      if (ad !== null) {

        // Vérifier si une catégorie est fournie et si elle existe dans la base de données
    if (data.category) {
      const category = await Category.findOne({
        where: { id: data.category.id }, // Recherche par ID de catégorie
      });

      if (!category) {
        throw new Error("Category not found or invalid category");
      }

      // Assurez-vous que la catégorie est valide avant de l'assigner
      data.category = category;
    }

        
        merge(ad, data)
        
   
  
        // bug → ad.tags
        // { id: 1 } → unicity constraint
        // we should should replace this object with a real tag
        // Tag { id: 1 } → no bug here
  
        const errors = await validate(ad);
        if (errors.length > 0) {
          throw new Error(`Validation error: ${JSON.stringify(errors)}`);
        } else {
          await ad.save();
          return ad;
        }
      } else {
        return null;
      }
    }

    @Mutation(() => Ad, { nullable: true })
  async deleteAd(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOneBy({ id });
    if (ad !== null) {
      await ad.remove();
      Object.assign(ad, { id });
      return ad;
    } else {
      return null;
    }
  }
}
