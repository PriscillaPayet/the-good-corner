import "reflect-metadata";
import { datasource } from './datasource';
import { CategoriesResolver } from './resolvers/Categories';
import { buildSchema } from 'type-graphql';
import {ApolloServer} from "@apollo/server"
import {startStandaloneServer } from "@apollo/server/standalone"
import { AdsResolver } from "./resolvers/Ads";
import { TagsResolver } from "./resolvers/Tags";
import { UsersResolver } from "./resolvers/Users";
import { authChecker } from "./auth";



// Démarrage du serveur une fois que la datasource est connectée
async function initialize() {
  await datasource.initialize()
  console.log("Datasource connected")

  const schema = await buildSchema({
    resolvers: [CategoriesResolver, AdsResolver, TagsResolver, UsersResolver], 
    authChecker,
  })

  const server = new ApolloServer ({schema});

  const { url } = await startStandaloneServer(server, {
    listen: { port: 5000 }, 
    //créer un contexte de résolution et d'y injecter req et res 
    context: async ({req, res}) => {
      return {
        req, 
        res,

      };
    }
  }); 
  
  console.log("Server is running on port 5000 🚀");
}

initialize();