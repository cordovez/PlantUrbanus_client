import { gql } from "@apollo/client";

const GET_OWNERS = gql`
  query {
    owners {
      userName
      firstName
      lastName
      email
    }
  }
`;

export { GET_OWNERS };
