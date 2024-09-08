import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [payment, setPayment] = useState();
  const urlParams = new URLSearchParams(window.location.search);

  const price = urlParams.get("price");

  const Success = async () => {
    if (localStorage.getItem("apiCalled")) {
      return;
    }

    const payerId = urlParams.get("PayerID");
    const paymentId = urlParams.get("paymentId");
    const checkin_date = urlParams.get("checkin");
    const checkout_date = urlParams.get("checkout");
    const children_ages = urlParams.get("children_ages");
    const adults_number = urlParams.get("adults_number");
    const hotel_id = urlParams.get("hotel_id");
    const room_id = urlParams.get("room_id");
    if (payerId && paymentId) {
      try {
        const response = await fetch("http://localhost:3000/api/pay/success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            payerId,
            paymentId,
            price,
            checkin_date,
            checkout_date,
            children_ages,
            adults_number,
            hotel_id,
            room_id,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setPayment(data);
          localStorage.setItem("apiCalled", true); // Set the flag after the first API call
          // await saveBookingInfo(); // Call saveBookingInfo after successful payment
          console.log(data);
        } else {
          navigate("/payment-failed");
        }
      } catch (error) {
        console.error("Error:", error);
        navigate("/payment-failed");
      }
    }
  };

  const saveBookingInfo = async () => {
    const checkin_date = urlParams.get("checkin");
    const checkout_date = urlParams.get("checkout");
    const children_ages = urlParams.get("children_ages");
    const adults_number = urlParams.get("adults_number");
    const hotel_id = urlParams.get("hotel_id");
    const room_id = urlParams.get("room_id");

    try {
      const response = await fetch("http://localhost:3000/api/pay/bookroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          checkin_date,
          checkout_date,
          children_ages,
          adults_number,
          hotel_id,
          room_id,
          price,
        }),
      });
      const data = await response.json();
      console.log("Booking info saved", data);
    } catch (error) {
      console.error("Error saving booking info:", error);
    }
  };

  useEffect(() => {
    Success();
  }, []); // Empty dependency array to run on mount

  useEffect(() => {
    // Clear the flag when component unmounts
    return () => {
      localStorage.removeItem("apiCalled");
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      {payment ? (
        <div>
          <h3 style={{ color: "#4CAF50", marginBottom: "20px" }}>
            Room Booked Successful!
          </h3>
          <h4 style={{ margin: "10px 0" }}>
            Payment ID:{" "}
            <span style={{ fontWeight: "normal" }}>
              {payment.transactions.related_resources[0].sale.parent_payment}
            </span>
          </h4>
          <h4 style={{ margin: "10px 0" }}>
            Status:{" "}
            <span style={{ fontWeight: "normal" }}>
              {payment.transactions.related_resources[0].sale.state}
            </span>
          </h4>
        </div>
      ) : (
        <h3 style={{ color: "#FF9800" }}>Processing your payment...</h3>
      )}
      <div className="w-50">
        <Link to="/">
          <button
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#2196F3",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
