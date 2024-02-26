import { gql } from "@apollo/client";

export const GETALLTODO = gql`
query Todos {
    todos {
      title
    }
  }
`