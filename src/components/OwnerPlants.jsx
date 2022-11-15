import { useQuery } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { GET_OWNER_PLANTS } from "../graphql/queries/ownerQueries";
import Cookies from "js-cookie";

// Cloudinary
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

export default function OwnerPlants() {
  const loggedInOwner = Cookies.get("owner");
  const { data, loading, error } = useQuery(GET_OWNER_PLANTS, {
    variables: { ownerId: loggedInOwner },
  });

  // cloudinary
  const cld = new Cloudinary({
    cloud: {
      cloudName: "cordovez",
    },
  });

  if (loading) return <h1>... Loading</h1>;
  if (error) return <p>... Error loading clients: {error.message} ...</p>;

  const ownerPlants = data.owner.plants;
  const owner = data.owner.userName;

  return (
    <div>
      <h1>{owner}</h1>
      {ownerPlants.map((plant) => (
        <div key={plant.id}>
          <Link to={plant.id}>
            <AdvancedImage
              cldImg={cld
                .image(plant.public_id)
                .resize(fill().width(250).height(250))}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
