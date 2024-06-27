import { Button, styled } from "@mui/material";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  ReactNode,
  SyntheticEvent,
} from "react";

const ButtonsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: 72,
});

interface TogglableProps {
  children: ReactNode;
  label: string;
  handleAddEntry: (event: SyntheticEvent) => Promise<void>;
}

export interface TogglableHandle {
  handleToggleVisible: () => void;
}

const Togglable = forwardRef<TogglableHandle, TogglableProps>(
  (props, refs): React.ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);

    const styleWhenVisibleOn = { display: visible ? "" : "none" };
    const styleWhenVisibleOff = { display: visible ? "none" : "" };

    const handleToggleVisible = () => {
      setVisible(!visible);
    };

    useImperativeHandle<TogglableHandle, TogglableHandle>(refs, () => {
      return { handleToggleVisible };
    });

    return (
      <div>
        <div style={styleWhenVisibleOff}>
          <Button variant="contained" onClick={handleToggleVisible}>
            {props.label}
          </Button>
        </div>
        <div style={styleWhenVisibleOn}>
          <div>{props.children}</div>
          <ButtonsContainer>
            <Button variant="contained" onClick={props.handleAddEntry}>
              Add
            </Button>
            <Button variant="contained" onClick={handleToggleVisible}>
              Cancel
            </Button>
          </ButtonsContainer>
        </div>
      </div>
    );
  }
);

export default Togglable;
