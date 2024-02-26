import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutate($loginInput: loginInput) {
    login(input: $loginInput) {
      token
      refresh_token
      user {
        userName
      }
    }
  }
`;

export const CREATETODO = gql`
  mutation CreateTodo($input: todoInput) {
    createTodo(input: $input) {
      title
    }
  }
`
