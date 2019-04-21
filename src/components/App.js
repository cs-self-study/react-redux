import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home/HomePage";
import About from "./about/AboutPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
import CoursesPage from "./courses/CoursesPage";
import ManageCoursesPage from "./courses/ManageCoursePage";

const App = () => (
  <div className="container-fluid">
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/courses" component={CoursesPage} />
      <Route path="/course/:slug" component={ManageCoursesPage} />
      <Route path="/course" component={ManageCoursesPage} />
      <Route path="/about" component={About} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default App;
