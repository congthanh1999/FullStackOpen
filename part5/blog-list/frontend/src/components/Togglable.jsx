import { forwardRef, useState } from "react";
const [visible, setVisible] = useState(false);

const visibleOnStyle = {
  display: visible ? "" : "none",
};
const visibleOffStyle = {
  display: visible ? "none" : "",
};

const Togglable = forwardRef((props, refs) => {
  const handleToggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div style={visibleOffStyle}>
        <button onClick={handleToggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={visibleOnStyle}>
        {props.children}
        <button onClick={handleToggleVisible}>{props.buttonLabel}</button>
      </div>
    </div>
  );
});

export default Togglable;
