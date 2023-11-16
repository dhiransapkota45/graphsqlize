import { User } from "../../models/user.js";
import { todo } from "../../models/todo.js";

export const resolvers = {
  Query: {
    users: async () => {
      const users = await User.findAll();
      return users;
    },
    todos: async () => {
      return await todo.findAll();
    },
  },
};
