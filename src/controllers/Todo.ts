import { todo } from "../../models/todo.js";

export const createTodo = async (body, id) => {
  try {
    console.log(body, id)
    return await todo.create({
      title: body.title,
      description: body.description,
      completed: body.completed,
      userid: id,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllTodos = async () => {
  try {
    return await todo.findAll();
  } catch (error) {
    throw new Error(error);
  }
};
