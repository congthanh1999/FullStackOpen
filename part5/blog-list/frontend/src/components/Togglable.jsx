import { forwardRef, useState, useImperativeHandle } from "react";

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
    <div>
      <div style={visibleOffStyle}>
        <button onClick={handleToggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={visibleOnStyle}>
        {props.children}
        <button onClick={handleToggleVisible}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;
