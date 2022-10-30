import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Main from "./pages/project-portal/projectPortal";
import Body from "./components/Body"
import TopNav
  from "./components/Header";
import Menu from "./components/Menu";
import Dashboard from "./pages/dashboard/dashboard";
function App() {
  
  return (
    <div className="App">
      <TopNav/>
      <Main/>
      <Menu />
    </div>
  );
}

export default App;
