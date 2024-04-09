const Header = ({ course }) => <h2>{course.name}</h2>;

const Total = ({ sum }) => <strong>total {sum} exercises</strong>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <div className="content">
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </div>
);

const Course = ({ course }) => {
  return (
    <div className="course">
      <Header course={course} />
      <Content parts={course.parts} />
      <Total
        sum={course.parts.reduce((acc, curr) => acc + curr.exercises, 0)}
      />
    </div>
  );
};

const Courses = ({ courses }) => {
  return (
    <div className="courses">
      {courses.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </div>
  );
};

export default Courses;
