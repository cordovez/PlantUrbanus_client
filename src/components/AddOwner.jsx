import { useMutation } from "@apollo/client";
import { useState } from "react";

import { ADD_OWNER } from "../graphql/mutations/ownerMutations";

export default function AddOwner({ refetch }) {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [addOwner] = useMutation(ADD_OWNER);

  const HandleSubmit = () => {};

  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label htmlFor=""> Your User Name </label>
        <input
          type="text"
          placeholder="username"
          value={userName}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor=""> Your email </label>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </form>
      <button
        onClick={() => {
          addOwner({
            variables: {
              newOwner: { userName, email },
            },
          });
          refetch();
        }}
      >
        Add Owner
      </button>
    </div>
  );
}
