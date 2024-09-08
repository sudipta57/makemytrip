import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setLoading } from "../redux/reducers/user";
import LoadingPage from "../component/BlurLoading";

const HotelPage = () => {
  const { hotelId, checkin, checkout, adult, children } = useParams();
  const [hotel, setHotelData] = useState(null);
  const { selectedHotel } = useSelector((state) => state.hoteldata);
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fetchdata = async () => {
    setLoading(true); // Start loading
    dispatch(setLoading(true));
    const payload = {
      checkin_date: checkin,
      checkout_date: checkout,
      adults_number: adult,
      hotel_id: hotelId,
    };

    // Include children_ages only if it is provided
    if (children) {
      payload.children_ages = children;
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/roomsearch",
        payload,
        { withCredentials: true }
      );
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        setHotelData(res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (!hotel) {
      fetchdata();
    }
  }, [hotel]);

  const handlePayment = async (e, room) => {
    e.preventDefault();
    dispatch(setLoading(true));
    if (!selectedHotel) {
      toast.error("Please go back and select the room again!");
      dispatch(setLoading(false));
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/api/pay/payment",
        {
          name: room.unitId,
          price: selectedHotel.price_per_night,
          hotel_id: room.hotel_id,
          room_id: room.unitId,
          checkin_date: checkin,
          checkout_date: checkout,
          adults_number: adult,
          children_ages: children,
        },
        {
          withCredentials: true,
        }
      );
      if (res && res.data) {
        window.location.href = res.data.payment.links[1].href;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred during payment.");
    } finally {
      dispatch(setLoading(false));
    }
  };
  loading === true && <LoadingPage />;
  return (
    hotel && (
      <>
        <div className="align-items-center">
          <div id="paypal-button-container"></div>
        </div>
        <div className="container mt-4">
          <h2 className="mb-4">Available Rooms</h2>
          <h1 className="mb-4">Hotel Details</h1>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">
                Hotel ID: {selectedHotel?.hotel_id}
              </h5>
              <p className="card-text">
                Price: {selectedHotel?.price_per_night}
              </p>
              <p
                className={`badge ${
                  selectedHotel?.soldOut ? "bg-danger" : "bg-success"
                }`}
              >
                {selectedHotel?.soldOut ? "Sold Out" : "Available"}
              </p>
            </div>
          </div>
          {hotel.map((room) => {
            room.gallery =
              typeof room.gallery === "string"
                ? JSON.parse(room.gallery)
                : room.gallery;
            room.highlightedMessages =
              typeof room.highlightedMessages === "string"
                ? JSON.parse(room.highlightedMessages)
                : room.highlightedMessages;
            return (
              <div className="card mb-4" key={room.unitId}>
                <div className="card-header">
                  <div className="row">
                    <div className="col-6">
                      <h5 className="card-title">Room ID: {room.unitId}</h5>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handlePayment(e, room)}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="mb-3">
                    <strong>Highlights:</strong>
                    <ul>
                      {room.highlightedMessages &&
                        room.highlightedMessages.map((message, index) => (
                          <li key={index}>{message}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="mb-3">
                    <strong>Person-capacity - </strong>
                    {room.capacity}
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: room.description }}
                  ></div>
                  <div className="mb-3">
                    <strong>Photo Description:</strong> {room.photoDescription}
                  </div>
                  <div className="row">
                    {room.gallery.map((image, index) => (
                      <div className="col-md-4 mb-3" key={index}>
                        <img
                          src={image.image}
                          className="img-fluid rounded"
                          alt="Room"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </>
    )
  );
};

export default HotelPage;
