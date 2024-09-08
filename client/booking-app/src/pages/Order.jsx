import { toast } from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
const Cart = () => {
  const [bookings, setBookings] = useState(null);
  const getBookingInfo = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/getbooking", {
        withCredentials: true,
      });
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getBookingInfo();
  }, []);

  const handleCancel = async (e, room) => {
    e.preventDefault();
    const toastId = toast.loading("Cancelling", { id: "cancel" });
    const payload = {
      hotelId: room.Hotel.hotel_id,
      roomId: room.Room.unitId,
      total: room.total_price,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/api/booking/cancel",
        payload,
        {
          withCredentials: true,
        }
      );
      // setBookings(res.data.bookingdata);
      getBookingInfo();
      toast.success(res.data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className="space vs-cart-wrapper">
          {bookings?.length > 0 ? (
            <div className="container">
              <h2>Your orders</h2>
              <form action="#" className="woocommerce-cart-form">
                <div className="table-responsive">
                  <table className="cart_table">
                    <thead>
                      <tr>
                        <th className="cart-col-image">Image</th>
                        <th className="cart-col-hotelname">Hotel Name</th>
                        <th className="cart-col-bookingdate">Booking Date</th>
                        <th className="cart-col-price">Price</th>
                        <th className="cart-col-remove">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings?.map((booking, i) => {
                        return (
                          <tr className="cart_item " key={i}>
                            <td data-title="Product">
                              <a
                                className="cart-productimage"
                                href="shop-details.html"
                              >
                                <img
                                  width="80"
                                  height="80"
                                  src={booking.Hotel.hotelImage}
                                  alt="Image"
                                />
                              </a>
                            </td>
                            <td data-title="Name">
                              <a
                                className="cart-productname"
                                href="shop-details.html"
                              >
                                {booking.Hotel.name}
                              </a>
                            </td>
                            <td data-title="date">
                              <span className="date">
                                {booking.checkin_date} To{" "}
                                {booking.checkout_date}
                              </span>
                            </td>
                            <td data-title="Price">
                              <span className="amount">
                                <bdi>{booking.total_price}</bdi>
                              </span>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={(e) => handleCancel(e, booking)}
                              >
                                Cancel
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          ) : (
            <div className="container text-center">
              <h2>no bookings</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
