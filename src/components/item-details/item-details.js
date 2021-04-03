import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";
import ErrorIndicator from "../error-indicator";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

import "./item-details.css";

export default class ItemDetails extends Component {
  swapiService = new SwapiService();

  state = {
    item: {},
    image: null,
    loading: true,
    error: false,
  };

  constructor() {
    super();
  }

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onItemLoaded = (item) => {
    const { getImageUrl } = this.props;
    this.setState({
      item,
      image: getImageUrl(item),
      loading: false,
      error: false,
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateItem = () => {
    const { itemId, getData } = this.props;

    if (!itemId) {
      return;
    }

    getData(itemId).then(this.onItemLoaded).catch(this.onError);
  };

  render() {
    if (!this.state.item) {
      return <span>Select a item from a list</span>;
    }
    const { item, loading, error, image } = this.state;

    const hasData = !(loading || error);

    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <ItemView item={item} image={image} /> : null;

    return (
      <div className="item-details card">
        {errorMessage}
        {spinner}
        {content}
      </div>
    );
  }
}

const ItemView = ({ item, image }) => {
  const { id, name, gender, birthYear, eyeColor } = item;

  return (
    <>
      <img className="item-image" src={image} alt="character" />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </>
  );
};
