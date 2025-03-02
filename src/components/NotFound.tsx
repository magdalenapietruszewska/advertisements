import React from "react";
import { Link } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";

const NotFound: React.FC = () => {
  return (
    <div className="nothing-container">
      <Typography variant="h5" className="nothing-container__info">
        Nothing is here!
      </Typography>
      <Button component={Link} to="/" color="primary">
        Click to try again!
      </Button>
    </div>
  );
};

export default NotFound;
