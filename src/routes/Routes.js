import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Main from "pages/Main";
import Admin from "pages/Admin";
import UmamusumeList from "components/Umamusume/UmamusumeList";
import Umamusume from "components/Umamusume/Umamusume";
import AddUmamusume from "components/forms/Admin/Umamusume/AddUmamusume";
import EditUmamusume from "components/forms/Admin/Umamusume/EditUmamusume";
import AddCard from "components/forms/Admin/Card/AddCard";
import EditCard from "components/forms/Admin/Card/EditCard";
import CardList from "components/Card/Cards";
import CardInfo from "components/Card/CardInfo";
import Skills from "components/Skills/Skills";
import SkillInfo from "components/Skills/SkillInfo";
import AddSkill from "components/forms/Admin/Skills/AddSkill";
import EditSkill from "components/forms/Admin/Skills/EditSkill";
import DeckBuilder from "components/DeckBuilder/DeckBuilder";
import SideButtons from "components/Common/SideButtons";
import AppMainBar from "components/Common/AppMainBar";

import { isDev } from "../constants";

function AppRoutes() {
  return (
    <Router>
      <AppMainBar />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/umamusume" component={UmamusumeList} />
        <Route exact path="/umamusume/:id" component={Umamusume} />
        <Route exact path="/cards" component={CardList} />
        <Route exact path="/cards/:id" component={CardInfo} />
        <Route exact path="/skills" component={Skills} />
        <Route exact path="/skills/:id" component={SkillInfo} />
        <Route exact path="/deck-builder" component={DeckBuilder} />

        {isDev ? (
          <Route>
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/admin/umamusume" component={UmamusumeList} />
            <Route exact path="/admin/umamusume/new" component={AddUmamusume} />
            <Route
              exact
              path="/admin/umamusume/:id/edit"
              component={EditUmamusume}
            />
            <Route exact path="/admin/cards" component={CardList} />
            <Route exact path="/admin/cards/new" component={AddCard} />
            <Route exact path="/admin/cards/:id/edit" component={EditCard} />
            <Route exact path="/admin/skills/new" component={AddSkill} />
            <Route exact path="/admin/skills/:id/edit" component={EditSkill} />
          </Route>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
      <SideButtons isFixed={true} />
    </Router>
  );
}

export default AppRoutes;
