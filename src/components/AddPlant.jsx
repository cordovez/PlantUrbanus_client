import { useMutation } from "@apollo/client";
import { useState } from "react";

import { ADD_PLANT } from "../graphql/mutations/plantMutations";

export default function AddPlant({ refetch }) {
  const [commonName, setCommonName] = useState("");

  const [addPlant] = useMutation(ADD_PLANT);

  const HandleSubmit = () => {};

  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <label htmlFor=""> Common Name </label>
        <input
          type="text"
          placeholder="common name"
          value={commonName}
          onChange={(e) => {
            setCommonName(e.target.value);
          }}
        />
        {/* <label htmlFor=""> Your email </label>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        /> */}
      </form>
      <button
        onClick={() => {
          addPlant({
            variables: {
              newPlant: { commonName },
            },
          });
          refetch();
        }}
      >
        Add Plant
      </button>
    </div>
  );
}
