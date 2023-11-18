export const typeDefs = `#graphql
    type user {
        firstName: String!
        lastName: String!
        email: String!
        phone: String!
        userName: String!
        id: ID!
        createdAt: String!
        updatedAt: String!
        profilePic: String
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
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        phone: String!
        userName: String!
    }

    input todoInput {
        title: String!
        description: String!
        completed: Boolean!
    }
    input loginInput {
        userName: String!
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
        createUser(input: userInput): AuthPayload
        updateUser(id: ID!, input: userInput): user
        deleteUser(id: ID!): user
        createTodo (input: todoInput): todos
        updateTodo (id: ID!, input: todoInput): todos
        deleteTodo (id: ID!): todos
        login (input: loginInput): AuthPayload
    }
`;
