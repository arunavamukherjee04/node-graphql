const { GraphQLServer } = require("graphql-yoga");


let links = [{
    id: "001",
    description: "Dummy description for the link of google.com",
    url: "www.google.com"
}];

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => `This is the testing api phase for graphql`,

        feed: () => links
    },

    Mutation: {
        post: (root, args) => {
            const link = {
                id: "00" + (++idCount),
                description: args.description,
                url: args.url
            }

            links.push(link);
            return link;
        },


        getFeed: (root, args) => {
            for(var link of links) {
                if(link.id === args.id) {
                    return link;
                }
            }
        },


        updateLink: (root, args) => {
            for (var link of links) {
                if(link.id === args.id) {
                    link.description = args.description;
                    link.url = args.url;

                    return link;
                }
            }
        },

        deleteLink: (root, args) => {
            for(link of links) {
                if(link.id === args.id) {
                    var indexOfLink = links.indexOf(link);
                    links.splice(indexOfLink, 1);

                    return link;
                }
            }
        }
    }
}

const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers
});

server.start(() => {
    console.log("Server is listening to port 4000");

});