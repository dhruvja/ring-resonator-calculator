import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
