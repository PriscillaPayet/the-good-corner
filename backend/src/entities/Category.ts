import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => ID) //décoration graphQL
    id!: number;

    @Column() //créer pour type orm pour une conone ds la bdd
    @Length(3, 50, { message: "entre 3 et 50 caractères" }) 
    @Field()
    name!: string;

    @OneToMany(() => Ad, (ad) => ad.category, {
        onDelete: 'SET NULL' // Mettre à NULL les catégories des annonces lors de la suppression de la catégorie
    })
    @Field(() => [Ad], { nullable: true })
    ads!: Ad[];
}

@InputType()
export class CategoryCreateInput{
    @Field()
    name!: string;
}   

@InputType()
export class CategoryUpdateInput{
    @Field({nullable: true}) //en true en prévision d'autres champs à venir
    name!: string;
}   


