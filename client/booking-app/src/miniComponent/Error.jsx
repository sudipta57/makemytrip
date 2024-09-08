import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="space">
      <div className="container">
        <div className="error-content text-center">
          <h2 className="text-theme">Error Page</h2>
          <h3 className="error-title">Oops! That Page Can't Be Found.</h3>
          <p className="error-text">
            Unfortunately, something went wrong and this page does not exist.
            Try using the search or return to the previous page.
          </p>
          <Link to={"/"} className="vs-btn style4">
            Back To Home
          </Link>
          <img
            className="error-img"
            src="assets/img/shape/error-1-1.png"
            alt="Error image"
          />
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
