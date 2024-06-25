import { forwardRef, useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button, styled } from "@mui/material";

const Buttons = styled(`div`)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: 72,
});

const StyledForm = styled(`div`)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);
  const visibleOnStyle = {
    display: visible ? "" : "none",
  };
  const visibleOffStyle = {
    display: visible ? "none" : "",
  };

  const handleToggleVisible = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return { handleToggleVisible };
  });

  return (
    <div className="togglable">
      <div style={visibleOffStyle}>
        <Button onClick={handleToggleVisible} variant="contained">
          {props.buttonLabel}
        </Button>
      </div>
      <StyledForm style={visibleOnStyle}>
        {props.children}
        <Buttons>
          <Button
            data-testid="create-button"
            variant="contained"
            onClick={props.onClick}
          >
            create
          </Button>
          <Button onClick={handleToggleVisible} variant="contained">
            cancel
          </Button>
        </Buttons>
      </StyledForm>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
