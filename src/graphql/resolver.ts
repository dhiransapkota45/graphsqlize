import { todo } from "../../models/todo.js";
import { user } from "../../models/user.js";
import { createUser, login, getAllUsers } from "../controllers/User.js";

export const resolvers = {
  Query: {
    users: async (parent, args, context, info) => {
      if (context?.token?.id) {
        return getAllUsers();
      } else {
        throw new Error("You are not authorized to view this page");
      }
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
