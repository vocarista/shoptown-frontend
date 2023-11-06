import NavigationBar from "../components/NavigationBar";
import Bg from "../assets/home-bg.jpg";
import useGeneral from "../store/general";
import { Flex, ScrollArea } from "@radix-ui/themes";
import SideBar from "../components/SideBar";
import ProductPage from "../components/ProductPage";

const backgroundImageStyle = {
  backgroundImage: `url(${Bg})`,
  backgroundSize: 'cover',
  backGroundPosition: 'center',
  backgroundRepeat: "repeat",
  // Other background properties (position, repeat, etc.) can be added here
};

const Home = () => {
  const isMobile = useGeneral((state) => state.isMobile);

  return (
<Flex style={backgroundImageStyle} className={`w-[100vw]`} gap="2" direction="column">
      <NavigationBar />
      <div style={backgroundImageStyle} className={`flex ${isMobile ? "place-items-center flex-col h-[120vh]" : "place-items-start p-2 flex-row"} gap-4 pl-4`}>
        <SideBar />
        <ScrollArea size={"2"} className = {`place-items-center w-auto`} scrollbars="vertical" type="auto"><ProductPage /></ScrollArea>
      </div>
    </Flex>
  );
};

export default Home;
