import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Mutate($loginInput: loginInput) {
    login(input: $loginInput) {
      token
      user {
        userName
      }
    }
  }
`;
