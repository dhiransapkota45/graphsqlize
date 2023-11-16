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
        userId: ID
        user : user
    }

    input userInput {
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        phone: String!
    }

    input todoInput {
        title: String!
        description: String!
        completed: Boolean!
    }
    input loginInput {
        email: String!
        password: String!
    }

    type AuthPayload {
        token: String
        user: user
    }

    type Query {
        users: [user]
        todos: [todos]
        user(id: ID!): user
        todoById(id: ID!): todos
    }

    type Mutation { 
        createUser(input: userInput): user
        updateUser(id: ID!, input: userInput): user
        deleteUser(id: ID!): user
        createTodo (input: todoInput): todos
        updateTodo (id: ID!, input: todoInput): todos
        deleteTodo (id: ID!): todos
        login (input: loginInput): AuthPayload
    }
`;
