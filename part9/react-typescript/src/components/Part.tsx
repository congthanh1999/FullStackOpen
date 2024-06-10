import { CoursePart } from "../App";

interface PartProps {
  courseParts: CoursePart[];
}

const Part = (props: PartProps) => {
  return (
    <>
      {props.courseParts.map((part, idx) => (
        <p key={idx}>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <br />
          {part.kind === "basic" && part.description}
          {part.kind === "group" && `project exercises ${part.exerciseCount}`}
          {part.kind === "background" && (
            <>
              {part.description} <br />
              {`submit to ${part.backgroundMaterial}`}
            </>
          )}
          {part.kind === "special" && (
            <>
              {part.description} <br />
              {`required skills: ${[...part.requirements]}`}
            </>
          )}
        </p>
      ))}
    </>
  );
};

export default Part;
