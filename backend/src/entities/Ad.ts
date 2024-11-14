// Ad.ts
import { BaseEntity, BeforeInsert, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Length, IsEmail, IsInt } from "class-validator";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, ID, InputType, Int, ObjectType } from "type-graphql";
import { IdInput } from "./Id";

@Entity()
@ObjectType() //pour la lecture d'une ad
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id!: number;

    @Column()
    @Field()
    @Length(3, 50, { message: "entre 3 et 50 caractères" })
    title!: string;

    @Column({nullable: true})
    @Field({nullable: true})
    @Length(3, 100, { message: "entre 3 et 100 caractères" })
    description!: string;

    @Column()
    @Field()
    @IsEmail()
    ownerEmail!: string;

    @Column()
    @Field()
    owner!: string;

    @Column()
    @Field(() => Int)
    @IsInt()
    price!: number;

    @Column()
    @Field()
    picture!: string;

    @Column()
    @Field()
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
    @Field(() => Category, { nullable: true })
    category!: Category;

    @ManyToMany(() => Tag, (tag) => tag.ads, {nullable: true})
    @JoinTable()
    @Field(() => [Tag], { nullable: true }) 
    tags!: Tag[];
}

@InputType() // pour l'écriture: servira à décrire tout ce qui sera accepté en argument pour la création d'une ad
export class AdCreateInput {
    @Field()
    @Length(3, 50, { message: "entre 3 et 50 caractères" })
    title!: string;
 
    @Field({nullable: true})
    @Length(3, 100, { message: "entre 3 et 100 caractères" })
    description!: string;
   
    @Field()
    @IsEmail()
    ownerEmail!: string;

    @Field()
    owner!: string;

    @Field(() => Int)
    price!: number;

    @Field()
    picture!: string;
   
    @Field()
    @Length(3, 50, { message: "entre 3 et 50 caractères" })
    location!: string;

    @Field(() => IdInput, {nullable: true})
    category!: IdInput;

    @Field(() => [IdInput], {nullable: true})
    tags!: IdInput[];
}


@InputType() // pour l'écriture: servira à décrire tout ce qui sera accepté en argument pour la modif d'une ad
export class AdUpdateInput {
    @Field({nullable: true})
    @Length(3, 50, { message: "entre 3 et 50 caractères" })
    title!: string;
 
    @Field({nullable: true})
    @Length(3, 100, { message: "entre 3 et 100 caractères" })
    description!: string;
   
    @Field({nullable: true})
    @IsEmail()
    ownerEmail!: string;

    @Field({nullable: true})
    owner!: string;

    @Field(() => Int, {nullable: true})
    price!: number;

    @Field({nullable: true})
    picture!: string;
   
    @Field({nullable: true})
    @Length(3, 50, { message: "entre 3 et 50 caractères" })
    location!: string;

    @Field(() => IdInput, {nullable: true})
    category!: IdInput;

    @Field(() => [IdInput], {nullable: true})
    tags!: IdInput[];
}

