import { todo } from "../../models/todo.js";
import { user } from "../../models/user.js";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  updateTodo,
} from "../controllers/Todo.js";
import { createUser, login, getAllUsers, refreshToken } from "../controllers/User.js";

export const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      if (context?.token?.id) {
        return getAllUsers();
      } else {
        throw new Error("You are not authorized to perform this action");
      }
    },
    todos: (parent, args, context, info) => {
      if (context?.token?.id) {
        return getAllTodos(context?.token?.id);
      } else {
        throw new Error("You are not authorized to perform this action");
      }
    },
  },
  Mutation: {
    async createUser(_, args) {
      return createUser(args.input);
    },
    async login(_, args) {
      return login(args.input);
    },
    async createTodo(_, args, context, info) {
      if (context?.token?.id) {
        return createTodo(args.input, context?.token?.id);
      } else {
        throw new Error("You are not authorized to perform this action");
      }
    },
    async updateTodo(_, args, context, info) {
      console.log("im here");
      if (context?.token?.id) {
        return updateTodo(args.id, args.input, context?.token?.id);
      } else {
        throw new Error("You are not authorized to perform this action");
      }
    },
    async deleteTodo(_, args, context, info) {
      if (context?.token?.id) {
        return deleteTodo(args.id, context?.token?.id);
      } else {
        throw new Error("You are not authorized to perform this action");
      }
    },
    async refresh(_, args, context, info) {
      if (context?.token?.id) {
        return refreshToken(args?.input, context?.token?.id);
      } else {
        throw new Error("You are not authorized to perform this action");
      }
    },

  },
};
