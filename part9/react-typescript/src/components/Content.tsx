import { CoursePart } from "../App";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
  return (
    <>
      <Part courseParts={props.courseParts} />
    </>
  );
};

export default Content;
