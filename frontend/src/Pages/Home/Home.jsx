import React from "react";
import HomepageContent from "../../components/HomePageContent/HomePageContent";

import News from "../../components/News/News";
import SideBar from "../../components/Sidebar/Sidebar";
import PreferencesDashboard from "../PreferencesDashboard/PreferencesDashboard";
// import React, { useEffect } from "react";
/* import BannerTiles from "../BannerTiles/BannerTiles"; */
/* import Footer from "../Footer/Footer"; */

function Home() {
  return (
    <div>
      <div>
        {/* <News /> */}
        <PreferencesDashboard />
        {/* <BannerTiles /> */}
        {/*   <HomepageContent /> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Home;
