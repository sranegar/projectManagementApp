import TopNav from "./Header";
import Menu from "./Menu";
import "./components.css";
import { Outlet } from 'react-router-dom';

const Body = () => {
  return (
    <div>
      <TopNav />
      <Outlet/>
      <Menu/>
    </div>
  );
};

export default Body;
