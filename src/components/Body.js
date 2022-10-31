import TopNav from "./Header";
import Menu from "./Menu";
import "./components.css";
import Main from "../pages/project-portal/projectPortal";
import Dashboard from "../pages/dashboard/dashboard";
import Calendar from "../pages/calendar/calendar";
import { useState } from "react";

const Body = () => {
  const [pages, setPages] = useState([<Main />, <Dashboard />, <Calendar />]);
  const [curPage, setCurPage] = useState(0);

 

  return (
    <div>
      <TopNav />
      {pages[curPage]}
      <Menu
        pages={pages}
        curPage={curPage}
        setCurPage={setCurPage} />
    </div>
  );
};

export default Body;
