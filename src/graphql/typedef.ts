export const typeDefs = `#graphql
    type user {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        phone: String!
    }

    type todos {
        id: ID!
        title: String!
        description: String!
        completed: Boolean!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        users: [user]
        todos: [todos]
    }
`;
