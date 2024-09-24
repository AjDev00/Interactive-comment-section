import { ToastContainer } from "react-toastify";
import "./App.css";
import Comments from "./components/Comments";
import Input from "./components/Input";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";

function App() {
  return (
    <div className="App bg-slate-100 min-h-screen">
      <Router>
        <Switch>
          <Route exact path="/">
            {/* <div>
              <Comments />
            </div> */}
            <div className="">
              <Input />
            </div>
          </Route>
        </Switch>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
