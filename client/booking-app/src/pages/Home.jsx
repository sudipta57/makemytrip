import HeroSection from "../component/HeroSection";
import FLightComponent from "../miniComponent/FlightBooking";
const Home = () => {
  return (
    <div
      style={{
        backgroundImage: "url('public/assets/img/bg/bg-5-1.jpg')",
      }}
    >
      <FLightComponent />
      <HeroSection />
    </div>
  );
};

export default Home;
