import { useQuery } from "@apollo/client";

import { GET_PLANTS } from "../graphql/queries/plantQueries";
import AddPlant from "./AddPlant";

export default function Plants() {
  const { data, loading, error, refetch } = useQuery(GET_PLANTS);
  if (loading) return <h1>... Loading</h1>;
  if (error) return <p>... Error loading clients: {error.message} ...</p>;

  return (
    <>
      <AddPlant refetch={refetch} />
      {data.plants.map((plant) => (
        <div>
          <a href="#">{plant.commonName}</a>
        </div>
      ))}
    </>
  );
}
