import { gql } from "@apollo/client";

const REGISTER_OWNER = gql`
  mutation Mutation($registerInput: RegisterInput) {
    registerOwner(registerInput: $registerInput) {
      email
      userName
      token
      password
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

// const ADD_OWNER = gql`
//   mutation AddOwner($newOwner: OwnerInput) {
//     addOwner(newOwner: $newOwner) {
//       userName
//       email
//     }
//   }
// `;
export { REGISTER_OWNER, LOGIN_OWNER };
