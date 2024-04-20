
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider, dividerClasses } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Navbar from "./components/user/Navbar";
import Hero from "./components/user/Hero";
import Featured from "./components/user/Featured";
import Packages from "./components/user/Packages";
import Cars from "./components/user/voitures/Cars";
import Car from "./components/user/voitures/Car";
import Restaurants from "./components/user/restaurants/Restaurants";
import Details from "./components/user/restaurants/Details";
import Auth from "./components/Auth";
import Hotels from "./components/user/hotels/Hotels";
import Hotel from "./components/user/hotels/Hotel";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    // <ColorModeContext.Provider value={colorMode}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />
    //     <div className="app">
    //       <Sidebar isSidebar={isSidebar} />
    //       <main className="content">
    //         <Topbar setIsSidebar={setIsSidebar} />
    //         <Routes>
    //           <Route path="/" element={<Dashboard />} />
    //           <Route path="/team" element={<Team />} />
    //           <Route path="/contacts" element={<Contacts />} />
    //           <Route path="/invoices" element={<Invoices />} />
    //           <Route path="/form" element={<Form />} />
    //           <Route path="/bar" element={<Bar />} />
    //           <Route path="/pie" element={<Pie />} />
    //           <Route path="/line" element={<Line />} />
    //           <Route path="/faq" element={<FAQ />} />
    //           <Route path="/calendar" element={<Calendar />} />
    //           <Route path="/geography" element={<Geography />} />
    //         </Routes>
    //       </main>
    //     </div>
    //   </ThemeProvider>
    // </ColorModeContext.Provider>
    // <div>
    //   <Navbar />
    //   <Hero />
    //   <Featured/>
    //   <Packages/>
    // </div>
   
    <div>
      <Routes>
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<Car />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<Details />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/hotels" element={<Hotels/>} />
        <Route path="/hotels/:id" element={<Hotel/>} />
      </Routes>
    </div>
  );
}

export default App;
