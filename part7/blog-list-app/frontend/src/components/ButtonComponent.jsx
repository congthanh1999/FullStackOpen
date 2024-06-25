import { Button } from "@mui/material";
import { styled } from "@mui/material";

const StyledButton = styled(Button)({
  width: "60px",
});

import React from "react";

const ButtonComponent = ({ label, onClick }) => {
  return (
    <StyledButton onClick={onClick} variant="contained">
      {label}
    </StyledButton>
  );
};

export default ButtonComponent;
