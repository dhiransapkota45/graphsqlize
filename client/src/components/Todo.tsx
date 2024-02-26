import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { GETALLTODO } from "../grapql/query";
import { CREATETODO } from "../grapql/mutation";

const Todo = () => {
  const [addtodo, setAddtodo] = useState("");
  const { data } = useQuery(GETALLTODO);

  const [createTodo] = useMutation(CREATETODO, {
    refetchQueries: [{ query: GETALLTODO }],
  });
  const submitHandler = async (e: any) => {
    e.preventDefault();
    await createTodo({
      variables: {
        input: {
          title: addtodo,
          completed: true,
          description: "this is description",
        },
      },
    });
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-6xl text-center">Todo App</h1>
        <button
          onClick={() => {
            localStorage.clear();
            location.href = "/login";
          }}
        >
          Logout
        </button>
        <div className="flex justify-center p-4">
          <div className="w-full max-w-lg">
            <form
              onSubmit={submitHandler}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="todo"
                >
                  Todo
                </label>
                <input
                  value={addtodo}
                  onChange={(e) => setAddtodo(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="todo"
                  type="text"
                  placeholder="Todo"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Todo
                </button>
              </div>
            </form>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <ul>
                {data?.todos?.map((todo: any) => (
                  <li className="flex items-center justify-between bg-gray-100 mb-2 py-2 px-4">
                    <span className="text-lg">{todo?.title}</span>
                    <button
                      className="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
                      type="button"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
