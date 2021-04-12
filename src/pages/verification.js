import { Component } from "react";
import { checkIfNumeric } from "../utils/number";

import history from "../utils/browserHistory";
import VerificationInput from "../components/VerificationInput/VerificationInput";
import Button from "../components/Button/Button";

import http from "../services/httpService";

const VERIFICATION_ENDPOINT = "http://127.0.0.1:8848/api/verify";

class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finalCode: "",
      formSubmitted: false,
      errorMessage: "",
    };
  }

  handleInputChange = (value) => {
    this.setState({ finalCode: value, errorMessage: "" });
  };

  validateInputData = (data) => checkIfNumeric(data) && data.length === 6;

  handleFormSubmit = (event) => {
    debugger;
    event.preventDefault();
    const { finalCode } = this.state;
    const isInputValid = this.validateInputData(finalCode);
    this.setState({ formSubmitted: true });

    if (isInputValid) {
      http
        .post(VERIFICATION_ENDPOINT, { code: finalCode })
        .then((response) => {
          debugger;
          if (response && response.data) {
            const { isValid, message } = response.data;
            if (isValid) return history.push("/success");

            return this.setState({ errorMessage: message });
          }
        })
        .catch((err) => {
          this.setState({ errorMessage: "Unexpected Error Occured!!!" });
        });
    } else {
      this.setState({ errorMessage: "Please input valid digits!!!" });
    }
  };

  render() {
    const displayError = this.state.errorMessage.length > 0;
    return (
      <div style={{ margin: "auto", width: "50%", padding: "200px", textAlign: "center" }}>
        <form>
          <div style={{ textAlign: "center" }}>Enter the pass code.</div>
          {displayError ? (
            <div style={{ color: "red", fontSize: "20px" }}>{this.state.errorMessage}</div>
          ) : (
            ""
          )}
          <VerificationInput inputSize={6} onInputChange={this.handleInputChange} />
          <Button onButtonClick={this.handleFormSubmit} />
        </form>
      </div>
    );
  }
}

export default Verification;
