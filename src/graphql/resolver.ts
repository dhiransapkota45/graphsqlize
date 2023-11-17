import { user } from "../../models/user.js";
// import { todo } from "../../models/todo.js";

export const resolvers = {
  Query: {
    users: async () => {
      const users = await user.findAll();
      return users;
    },
    todos: async () => {
      // return await todo.findAll();
    },
  },
  Mutation: {
    async createUser(_, args) {
      const newUser = await user.create({
        firstName: args.input.firstName,
        lastName: args.input.lastName,
        email: args.input.email,
        password: args.input.password,
        phone: args.input.phone,
        userName: args.input.userName,
      });
      return newUser;
    },
  },
};
