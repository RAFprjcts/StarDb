import React, { Component } from "react";

import Header from "../header";
import "./app.css";
import ErrorBoundry from "../error-boundry";
import {
  PersonList,
  StarshipList,
  PlanetList,
  PersonDetails,
  PlanetDetails,
  StarshipDetails,
} from "../sw-components";

export default class App extends Component {
  state = {
    showRandomPlanet: true,
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  render() {
    return (
      <ErrorBoundry>
        <div className="stardb-app">
          <Header />
          <PersonDetails itemId={11} />
          <PlanetDetails itemId={5} />
          <StarshipDetails itemId={9} />
          <PersonList>{({ name }) => <span>{name}</span>}</PersonList>
          <StarshipList>{({ name }) => <span>{name}</span>}</StarshipList>
          <PlanetList>{({ name }) => <span>{name}</span>}</PlanetList>
        </div>
      </ErrorBoundry>
    );
  }
}
