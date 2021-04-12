import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./utils/browserHistory";
import { Success, Verification, NotFound } from "./pages";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path={"/"} component={Verification} />
          <Route exact path={"/success"} component={Success} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
