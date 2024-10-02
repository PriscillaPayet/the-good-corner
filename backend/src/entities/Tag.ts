import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Length } from "class-validator";
import { Ad } from "./Ad";



@Entity()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Length(3,50, {message: "entre 3 et 50 caractères"})
    name!: string;

      
    @ManyToMany ( () => Ad, (ad) => ad.tags)
    ads!: Ad[] ;

 
}