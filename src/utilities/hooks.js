import { useQuery } from "@apollo/client";
import { GET_OWNER } from "../graphql/queries/ownerQueries";

// 01 A form to simplify the state of values

import { useState } from "react";

// function takes a callback and creates an empty object "initialState" with whatever key/values passed to it
export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  // onChange sets Values to a duplicate of initialState and adds a 'name' and 'value' for each of these passed to it by the event
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };

  // onSubmit launches whatever callback is passed to useForm
  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

// // 02 get logged in user name
export const useOwnerName = (ownerId) => {
  // Who is the owner:
  const { data, loading, error } = useQuery(GET_OWNER, {
    variables: { ownerId: ownerId },
  });
  if (loading) return <h1>... Loading</h1>;
  if (error) return <p>... Error loading owner name: {error.message} ...</p>;
  const ownerName = data.owner.userName;
  return ownerName;
};
