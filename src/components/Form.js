import React from "react";

class Form extends React.Component {
  render() {
    return (
      //when submit is clicked the getWeather function is accessed
      <form onSubmit = {this.props.getWeather}>
        <input type="text" name="city" placeholder="City..."/>
        <input type="text" name="country" placeholder="Country..."/>
        <button>submit</button>
      </form>
    );
  }
};

export default Form;
