import { gql } from "@apollo/client";

const REGISTER_OWNER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerOwner(registerInput: $registerInput) {
      email
      userName
      token
    }
  }
`;

const LOGIN_OWNER = gql`
  mutation Mutation($loginInput: LoginInput) {
    loginOwner(loginInput: $loginInput) {
      userName
      email
      token
    }
  }
`;

const UPDATE_OWNER = gql`
  mutation Mutation($updateOwnerInput: UpdateOwnerInput) {
    updateOwner(updateOwnerInput: $updateOwnerInput) {
      id
      userName
      firstName
      lastName
      email
      password
      token
      avatar
    }
  }
`;

// const ADD_OWNER = gql`
//   mutation AddOwner($newOwner: OwnerInput) {
//     addOwner(newOwner: $newOwner) {
//       userName
//       email
//     }
//   }
// `;
export { REGISTER_OWNER, LOGIN_OWNER, UPDATE_OWNER };
