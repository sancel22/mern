import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  const style = {
    width: "4rem",
    height: "4rem",
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner animation="border" style={style} />;
    </div>
  );
};

export default Loader;
