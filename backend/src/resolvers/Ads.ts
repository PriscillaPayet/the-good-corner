import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { In } from "typeorm";
import { Ad, AdCreateInput, AdUpdateInput } from "../entities/Ad";
import { Category } from "../entities/Category";
import { Tag } from "../entities/Tag";
import { validate } from "class-validator";

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
    async createAd(@Arg('data', () => AdCreateInput) data: AdCreateInput): Promise<Ad> {
        const newAd = new Ad();
        Object.assign(newAd, data);

        if (data.category) {
            const category = await Category.findOne({ where: { id: data.category.id } });
            if (category) newAd.category = category;
        }

        if (data.tags) {
            const tags = await Tag.findBy({ id: In(data.tags.map(tag => tag.id)) });
            newAd.tags = tags;
        }
        const errors = await validate(newAd)
        if (errors.length > 0) {
            throw new Error("Les données de la catégorie ne sont pas valides");
        }

        await newAd.save();
        return newAd;
    }

    @Mutation(() => Ad, { nullable: true })
    async updateAd(
        @Arg('id', () => ID) id: number,
        @Arg('data', () => AdUpdateInput) data: AdUpdateInput
    ): Promise<Ad | null> {
        const ad = await Ad.findOne({ where: { id }, relations: { category: true, tags: true } });
        if (!ad) return null;

        Object.assign(ad, data);

        if (data.category) {
            const category = await Category.findOne({ where: { id: data.category.id } });
            ad.category = category || null;
        }

        if (data.tags) {
            const tags = await Tag.findBy({ id: In(data.tags.map(tag => tag.id)) });
            ad.tags = tags;
        }
        const errors = await validate(ad)
        if (errors.length > 0) {
            throw new Error("Les données de la catégorie ne sont pas valides");
        }

        await ad.save();
        return ad;
    }

    @Mutation(() => Ad, { nullable: true })
    async deleteAd(@Arg('id', () => ID) id: number): Promise<Ad | null> {
        const ad = await Ad.findOne({ where: { id }, relations: { category: true, tags: true } });
        if (ad) {
            await ad.remove();
            return ad;
        }
        return null;
    }
}
