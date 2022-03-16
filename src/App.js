import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import UserList from "./components/UserList";
import Header from "./components/Header/index";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Route path="/" exact component={UserList} />
        <Route path="/user/:username" component={UserProfile} />
      </BrowserRouter>
    </div>
  );
}

export default App;
