import { useParams } from "react-router-dom";

// GraphQL
import { useQuery } from "@apollo/client";
import { GET_PLANT } from "../graphql/queries/plantQueries";

// Cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

export default function PlantProfile() {
  let { plantId } = useParams();

  // cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: "cordovez",
    },
  });

  // graphql
  const { data, loading, error } = useQuery(GET_PLANT, {
    variables: {
      plantId: plantId,
    },
  });

  if (loading) return <h1>... Loading</h1>;
  if (error) return <p>... Error loading clients: {error.message} ...</p>;
  return (
    <div>
      <AdvancedImage
        cldImg={cld
          .image(data.plant.public_id)
          .resize(fill().width(250).height(250))}
      />
      <p>Common Name: {data.plant.commonName}</p>
    </div>
  );
}
