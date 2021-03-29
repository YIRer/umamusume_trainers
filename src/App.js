import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Main from "./pages/Main";
import Admin from "pages/Admin";
import UmamusumeList from "./components/UmamusumeList";
import Umamusume from "./components/Umamusume";
import AddUmamusume from "./components/forms/Admin/Umamusume/AddUmamusume";
import EditUmamusume from "./components/forms/Admin/Umamusume/EditUmamusume";

function App() {
  return (
    <Paper elevation={0}>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/umamusume" component={UmamusumeList} />
          <Route exact path="/umamusume/:id" component={Umamusume} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/umamusume" component={UmamusumeList} />
          <Route exact path="/admin/umamusume/new" component={AddUmamusume} />
          <Route
            exact
            path="/admin/umamusume/:id/edit"
            component={EditUmamusume}
          />
        </Switch>
      </Router>
    </Paper>
  );
}

export default App;
