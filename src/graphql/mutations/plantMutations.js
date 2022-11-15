import { gql } from "@apollo/client";

const ADD_PLANT = gql`
  mutation Mutation($plantInput: PlantInput) {
    addPlant(plantInput: $plantInput) {
      commonName
      owner {
        userName
      }
      public_id
    }
  }
`;

const UPDATE_PLANT = gql`
  mutation Mutation($updatePlantInput: UpdatePlantInput) {
    updatePlant(updatePlantInput: $updatePlantInput) {
      commonName
      datePurchased
      familyName
      healthRating
      scientificName
      substrate
    }
  }
`;
export { ADD_PLANT, UPDATE_PLANT };
