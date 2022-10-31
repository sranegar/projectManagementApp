import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Main from "./pages/project-portal/projectPortal";
import Body from "./components/Body"
import TopNav
  from "./components/Header";
import Menu from "./components/Menu";
import Dashboard from "./pages/dashboard/dashboard";
import Calendar from "./pages/calendar/calendar";
 
function App() {
  
  return (
    <div className="App">
     <Body/>
    </div>
  );
}

export default App;
