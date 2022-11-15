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

const GET_OWNER_PLANTS = gql`
  query Owner($ownerId: ID!) {
    owner(id: $ownerId) {
      userName
      plants {
        id
        commonName
        datePurchased
        familyName
        healthRating
        scientificName
        substrate
        public_id
      }
    }
  }
`;
export { GET_OWNERS, GET_OWNER_PLANTS };
