import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Length, IsEmail, IsDate, IsInt } from "class-validator";
import { Category } from "./Category";
import {Tag } from "./Tag";


@Entity()
export class Ad extends BaseEntity {

    //l'opérateur "!" permet d'assurer à Typescript que l'initialisation que la propriété est gérée 

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Length(3,50, {message: "entre 3 et 50 caractères"})
    title!: string;

    @Column()
    @Length(10,100, {message: "entre 10 et 100 caractères"})
    description!: string;

    @Column()
    @IsEmail()
    owner!: string;

    @Column({nullable: true})
    @IsInt()
    price!: number;

    @Column()
    picture!: string;

    @Column()
    @Length(3,50, {message: "entre 3 et 50 caractères"})
    location!: string;

    @Column()
    created_at!: Date;

    @BeforeInsert()
    private setCreatedAt() {
      this.created_at = new Date();
    }


    // @BeforeUpdate()  // Utilisation de BeforeUpdate pour set updated_at
    // updateUpdatedAt() {
    //     this.updated_at = new Date();
    // }

    @ManyToOne(() => Category, (category) => category.ads, { nullable: true })
    category!: Category;

    @ManyToMany(() => Tag, (tag) => tag.ads)
    tags!: Tag[];
}