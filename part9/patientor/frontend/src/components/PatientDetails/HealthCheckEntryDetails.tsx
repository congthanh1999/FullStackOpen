import { HealthCheckEntry } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  let healthRating;

  switch (entry.healthCheckRating) {
    case 0:
      healthRating = <FavoriteIcon sx={{ color: "green" }} />;
      break;
    case 1:
      healthRating = <FavoriteIcon sx={{ color: "blue" }} />;
      break;
    case 2:
      healthRating = <FavoriteIcon sx={{ color: "yellow" }} />;
      break;
    case 3:
      healthRating = <FavoriteIcon sx={{ color: "red" }} />;
      break;
    default:
      return;
  }

  return <div>{healthRating}</div>;
};

export default HealthCheckEntryDetails;
