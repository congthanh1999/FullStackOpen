const Notification = (props) => {
  return (
    <h1
      className={`notification ${props.message ? `active` : ``} ${
        props.success ? `success` : `unsuccess`
      }`}
    >
      {props.message}
    </h1>
  );
};

export default Notification;
