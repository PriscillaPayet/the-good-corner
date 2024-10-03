// Ad.ts
import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Length, IsEmail, IsInt } from "class-validator";
import { Category } from "./Category";
import { Tag } from "./Tag";

@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Length(3, 50, { message: "entre 3 et 50 caractères" })
    title!: string;

    @Column()
    @Length(3, 100, { message: "entre 3 et 100 caractères" })
    description!: string;

    @Column()
    @IsEmail()
    ownerEmail!: string;

    @Column()
    owner!: string;

    @Column({ nullable: true })
    @IsInt()
    price!: number;

    @Column()
    picture!: string;

    @Column()
    @Length(3, 50, { message: "entre 3 et 50 caractères" })
    location!: string;

    @Column()
    created_at!: Date;

    @BeforeInsert()
    private setCreatedAt() {
        this.created_at = new Date();
    }

    // Relation ManyToOne avec Category
    @ManyToOne(() => Category, (category) => category.ads, { nullable: true, onDelete: 'SET NULL' }) // Gérer la suppression
    @JoinColumn({ name: 'category_id' }) // Nom explicite de la colonne
    category!: Category;

    @ManyToMany(() => Tag, (tag) => tag.ads)
    @JoinTable()
    tags!: Tag[];
}