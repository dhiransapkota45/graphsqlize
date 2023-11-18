import { todo } from "../../models/todo.js";
import { user } from "../../models/user.js";
import { createUser, login } from "../controllers/User.js";
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
      return createUser(args.input);
    },
    async login(_, args) {
      return login(args.input);
    },
    async createTodo(_, args) {
      return await todo.create({
        title: args.input.title,
        description: args.input.description,
        completed: args.input.completed,
        userid: args.input.userid,
      });
    },
  },
};
