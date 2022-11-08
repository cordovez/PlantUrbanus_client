import { gql } from "@apollo/client";

const GET_PLANTS = gql`
  query {
    plants {
      id
      commonName
      public_id
    }
  }
`;
export { GET_PLANTS };
