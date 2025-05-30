import Hero from "@/components/Hero.jsx";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import FeaturedProperties from "@/components/FeaturedProperties";
//import { connectDB } from "@/config/database";
function HomePage() {
  //console.log(process.env.MONGODB_URI);
 // connectDB();

  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
}

export default HomePage;


// To test loading page
//export default async function Page() {
 // await new Promise(resolve => setTimeout(resolve, 2000)); // 2-second delay
 // return <div>Your page content</div>;
//}
