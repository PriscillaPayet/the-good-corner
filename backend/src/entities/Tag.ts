import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";



@Entity()
@ObjectType()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => ID)
    id!: number;

    @Column()
    @Field()
    @Length(3,50, {message: "entre 3 et 50 caractères"})
    name!: string;

      
    @ManyToMany ( () => Ad, (ad) => ad.tags)
    @Field(() => [Ad], { nullable: true })
    ads!: Ad[] ;

}

@InputType()
export class TagCreateInput{
    @Field()
    name!: string;
}   

@InputType()
export class TagUpdateInput{
    @Field({nullable: true}) //en true en prévision d'autres champs à venir
    name!: string;
}   
