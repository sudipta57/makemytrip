import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const history = useNavigate();

  useEffect(() => {
    // You can add any additional logic here if needed, such as logging the failure or notifying the user.

    // After a short delay, redirect the user to a different page (optional)
    const timeout = setTimeout(() => {
      history("/"); // Redirect to the homepage or any other route you prefer
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timeout); // Cleanup the timeout if the component unmounts
  }, [history]);

  return (
    <div>
      <h1>Payment Failed</h1>
      <p>We're sorry, but your payment could not be processed at this time.</p>
      <p>You will be redirected to the homepage shortly.</p>
    </div>
  );
};

export default PaymentFailed;
