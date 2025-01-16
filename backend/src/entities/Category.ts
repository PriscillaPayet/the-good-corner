import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { User } from "./User";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => ID) //décoration GraphQL
    id!: number;

    @Column() 
    @Length(3, 50, { message: "Entre 3 et 50 caractères" }) 
    @Field()
    name!: string;

    @OneToMany(() => Ad, (ad) => ad.category, {
        onDelete: 'SET NULL' // Lors de la suppression de la catégorie, les annonces auront une catégorie à NULL
    })
    @Field(() => [Ad], { nullable: true })
    ads!: Ad[];

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    // Champ qui indique qui a créé la catégorie (relation avec l'utilisateur)
    @ManyToOne(() => User)
    @Field(() => User)
    createdBy: User;
}

@InputType()
export class CategoryCreateInput {
    @Field()
    name!: string;
}   

@InputType()
export class CategoryUpdateInput {
    @Field({nullable: true}) 
    name!: string;
}   
