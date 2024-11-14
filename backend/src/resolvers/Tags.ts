import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Tag, TagCreateInput, TagUpdateInput } from "../entities/Tag";
import { validate } from "class-validator";

@Resolver()
export class TagsResolver {
    @Query(() => [Tag])
    async tags(): Promise<Tag[]> {
        const tags = await Tag.find({
            relations: {
                ads: true,
            }
        });

        return tags;
    }

    @Query(() => Tag, { nullable: true })
    async tag(@Arg('id', () => ID) id: number): Promise<Tag | null> {
        const tag = await Tag.findOne({
            where: { id },
            relations: {
                ads: {
                    category: true,
                },
            },
        })
        if (tag !== null) {
            return (tag)
        } else {
            return null
        }
    }

    @Mutation(() => Tag)
    async createTag(@Arg('data', () => TagCreateInput) data: TagUpdateInput): Promise<Tag> {
        const newTag = new Tag();
        Object.assign(newTag, data);

        const errors = await validate(newTag)
        if (errors.length > 0) {
            throw new Error("Les données de la catégorie ne sont pas valides");
        }
        await newTag.save();
        return (newTag);
    }

    @Mutation(() => Tag, { nullable: true })
    async deleteTag(@Arg('id', () => ID) id: number): Promise<Tag | null> {
        const tag = await Tag.findOne({
            where: { id }
        })
        if (tag) {
            await tag.remove();
            return tag;
        } else {
            return null
        }

    }

    @Mutation(() => Tag, { nullable: true })
    async updateTag(
        @Arg('id', () => ID) id: number,
        @Arg('data', () => TagUpdateInput, { nullable: true }) data: TagUpdateInput
    ): Promise<Tag | null> {
        // Rechercher la catégorie par ID
        const tag = await Tag.findOne({ where: { id } });

        // Si la catégorie n'existe pas, retourner null
        if (!tag) {
            return null;
        }

        Object.assign(tag, data);
        const errors = await validate(tag)
        if (errors.length > 0) {
            throw new Error("Les données de la catégorie ne sont pas valides");
        }
        // Sauvegarder la catégorie mise à jour
        await tag.save();

        return tag;
    }



}