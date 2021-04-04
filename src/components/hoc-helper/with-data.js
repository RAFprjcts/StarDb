import React, { Component } from "react";
import Spinner from "../spinner";

const withData = (View, getData) => {
  return class extends Component {
    state = {
      data: null,
    };

    componentDidMount() {
      getData().then((data) => {
        this.setState({
          data,
        });
      });
    }

    render() {
      const { data } = this.state;

      if (!data) {
        return <Spinner />;
      }

      return <View data={data} {...this.props} />;
    }
  };
};

export default withData;
