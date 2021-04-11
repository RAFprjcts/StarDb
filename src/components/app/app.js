import React, { Component } from "react";

import Header from "../header";
import ErrorBoundry from "../error-boundry";

import { SwapiServiceProvider } from "../swapi-service-context";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import RandomPlanet from "../random-planet";
import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";

import "./app.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { StarshipDetails } from "../sw-components";

export default class App extends Component {
  state = {
    swapiService: new SwapiService(),
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new service(),
      };
    });
  };

  render() {
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />

              <Route path="/" exact render={() => <h2>Welcome To StarDB</h2>} />
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetsPage} />
              <Route path="/starships" exact component={StarshipsPage} />
              <Route
                path="/starships/:id"
                render={({ match }) => {
                  const { id } = match.params;
                  <StarshipDetails itemId={id} />;
                }}
              />
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
