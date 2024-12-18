import { DataSource } from "typeorm";

export const datasource = new DataSource ({
    type: "postgres",
    host: "db", //correspond à ce qu'on a mis dans compose.yml comme nom de service pour la bdd
    port: 5432,
    username: "thegoodcorner",
    password: "mdpsecret",
    database: "thegoodcorner",
    entities: ["./src/entities/*.ts"],
    synchronize: true,
    logging: true, //permet de voir passer toutes les requête SQL dans le terminal
});



