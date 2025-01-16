import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";



// Définir l'entité User avec TypeORM et TypeGraphQL
@Entity()
@ObjectType() // Associer cette classe à GraphQL
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field(type => ID)  // Indiquer à GraphQL que c'est un champ ID
    id!: number;

    @Column({ unique: true })
    @IsEmail()
    @Field() // Champ email exposé via GraphQL
    email!: string;

    @Column()
    hashedPassword: string;

    // Changer les rôles pour être un tableau de chaînes de caractères
    @Column("simple-array", { default: ['user'] })  // Utilisation de "simple-array" pour stocker un tableau de chaînes
    @Field(() => [String])
    roles: string[] = ['user'];  // Par défaut, l'utilisateur aura le rôle "user"
}

// Définir l'input pour créer un utilisateur
@InputType()
export class UserCreateInput {
    @IsEmail()
    @Field()  // Exposer ce champ à GraphQL
    email!: string;

    @Field()  // Exposer ce champ à GraphQL
    @IsStrongPassword()
    password!: string;

     // 'roles' est un tableau de chaînes
     @Field(() => [String], { nullable: true })
     roles: string[] = ['user'];  // Valeur par défaut à "user"
}

