import { useQuery } from "@apollo/client";
import { GET_OWNERS } from "../graphql/queries/ownerQueries";
import AddOwner from "./AddOwner";

export default function Owners() {
  const { data, loading, error, refetch } = useQuery(GET_OWNERS);
  if (loading) return <h1>... Loading</h1>;
  if (error) return <p>... Error loading clients: {error.message} ...</p>;

  return (
    <div>
      <AddOwner refetch={refetch} />
      {data.owners.map((owner) => (
        <p>
          <a href="">{owner.userName}</a>
        </p>
      ))}
    </div>
  );
}
