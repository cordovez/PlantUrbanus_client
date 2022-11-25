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

const GET_PLANT = gql`
  query Plant($plantId: ID!) {
    plant(id: $plantId) {
      commonName
      datePurchased
      familyName
      healthRating
      createdAt
      owner {
        id
        userName
      }
      public_id
      scientificName
      substrate
      notes
    }
  }
`;
export { GET_PLANTS, GET_PLANT };
