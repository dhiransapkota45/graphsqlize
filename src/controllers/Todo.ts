import { todo } from "../../models/todo.js";

export const createTodo = async (body, id) => {
  try {
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

export const getAllTodos = async (userid) => {
  try {
    return await todo.findAll({
      where: {
        userid: userid,
      },
      include: "users",
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTodo = async (id, userid) => {
  try {
    const check = await todo.findOne({
      where: {
        id: id,
        userid: userid,
      },
    });

    if (!check) {
      throw new Error("Todo not found");
    }
    
    await todo.destroy({
      where: {
        id: id,
        userid: userid,
      },
    });
    return {
      success: true,
      message: "Todo deleted successfully",
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTodo = async (id, body, userid) => {
  try {
    await todo.update(
      {
        ...body,
      },
      {
        where: {
          id: id,
          userid: userid,
        },
      }
    );
    return {
      success: true,
      message: "Todo updated successfully",
    };
  } catch (error) {
    throw new Error(error);
  }
};
