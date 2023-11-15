export const resolvers = {
  Query: {
    users: () => {
      return [
        {
          firstname: "John",
          lastname: "Doe",
          email: "",
          password: "",
          phone: "",
        },
      ];
    },
    todos: () => {
      return [
        {
          id: "1",
          title: "My first todo",
          description: "This is my first todo",
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
    },
  },
};
