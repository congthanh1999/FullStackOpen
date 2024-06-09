import { forwardRef, useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";

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
      <div style={visibleOnStyle}>
        {props.children}
        <button onClick={handleToggleVisible}>cancel</button>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
