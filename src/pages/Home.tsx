import NavigationBar from "../components/NavigationBar";
import Bg from "../assets/home-bg.jpg";
import useGeneral from "../store/general";
import SideBar from "../components/SideBar";
import ProductPage from "../components/ProductPage";
import Footer from "../components/Footer";

const backgroundImageStyle = {
  backgroundImage: `url(${Bg})`,
  backgroundSize: 'cover',
  backGroundPosition: 'center',
};

const Home = () => {
  const isMobile = useGeneral((state) => state.isMobile);

  return (
    <div style={backgroundImageStyle} className={`${isMobile ? `w-screen` : ``} pb-5 h-auto min-h-screen gap-2 flex flex-col`}>
      <NavigationBar />
      <div className={`flex ${isMobile ? "place-items-center flex-col h-auto" : "place-items-start p-2 flex-row"} gap-4 pl-4 mb-24`}>
        <SideBar />
        <ProductPage />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
