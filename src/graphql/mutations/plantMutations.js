import { gql } from "@apollo/client";

const ADD_PLANT = gql`
  mutation AddPlant($newPlant: PlantInput) {
    addPlant(newPlant: $newPlant) {
      id
      commonName
    }
  }
`;
export { ADD_PLANT };
