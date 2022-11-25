import { gql } from "@apollo/client";

const GET_OWNER = gql`
  query Query($ownerId: ID!) {
    owner(id: $ownerId) {
      email
      firstName
      id
      lastName
      password
      userName
    }
  }
`;
const GET_OWNER_PLANT_IDS = gql`
  query Query($ownerId: ID!) {
    owner(id: $ownerId) {
      id
      plants {
        id
      }
    }
  }
`;

const GET_OWNERS = gql`
  query {
    owners {
      id
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
      id
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
export { GET_OWNERS, GET_OWNER_PLANT_IDS, GET_OWNER_PLANTS, GET_OWNER };
