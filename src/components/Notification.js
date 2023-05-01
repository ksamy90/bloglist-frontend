const Notification = ({ message, errorMessage }) => {
  if (errorMessage === null) {
    return null;
  }
  if (errorMessage) {
    return <div className="error">{errorMessage}</div>;
  }
};

export default Notification;
