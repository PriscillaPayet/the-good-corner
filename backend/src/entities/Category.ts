import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import { Ad } from "./Ad";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Length(3, 50, { message: "entre 3 et 50 caractères" })
    name!: string;

    @OneToMany(() => Ad, (ad) => ad.category, {
        onDelete: 'SET NULL' // Mettre à NULL les catégories des annonces lors de la suppression de la catégorie
    })
    ads!: Ad[];
}