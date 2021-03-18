import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar";
import "./App.css";
import Visitors from "./Components/Visitors";
import Adminstrador from "./Components/Administrator";
import Home from "./Components/Home";
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/Home" exact component={Home} />
        <Route path="/services" exact component={Visitors} />
        <Route path="/Administrator" exact component={Adminstrador} />
      </Switch>
    </Router>
  );
}

export default App;
