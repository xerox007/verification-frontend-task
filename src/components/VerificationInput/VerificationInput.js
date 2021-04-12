import { Component } from "react";
import * as keys from "../../constants/keystrokes";
import "./VerificationInput.css";

class VerificationInput extends Component {
  constructor(props) {
    const { inputSize } = props;

    super(props);
    this.state = {
      inputList: Array(inputSize).fill(""),
    };

    this.inputListRef = [];
  }

  handleIndividualInputChange = (e) => {
    const selectedInputIndex = Number(e.target.dataset.id);
    const { inputList } = this.state;
    const latestInputValue = e.target.value.replace(inputList[selectedInputIndex], "");

    const updatedList = [...inputList];
    updatedList.splice(selectedInputIndex, 1, latestInputValue);

    this.setInputList(updatedList);
    this.focusNextInput(selectedInputIndex + 1);
  };

  handlePasteEvent = (e) => {
    e.preventDefault();
    const { inputList } = this.state;
    const selectedInputIndex = Number(e.target.dataset.id);
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text");
    const pastedDataArray = pastedData.split("");

    const updatedList = inputList.map((input, loopIndex) => {
      if (loopIndex >= selectedInputIndex && loopIndex < selectedInputIndex + pastedDataArray.length) {
        return pastedDataArray[loopIndex - selectedInputIndex];
      }

      return input;
    });

    this.setInputList(updatedList);
  };

  handleKeyDown = (e) => {
    const selectedInputIndex = Number(e.target.dataset.id);
    const { inputSize } = this.props;
    const nextTargetIndex = selectedInputIndex + 1 < inputSize ? selectedInputIndex + 1 : null;
    const prevTargetIndex = selectedInputIndex > 0 ? selectedInputIndex - 1 : null;
    const { inputList } = this.state;

    switch (e.keyCode) {
      case keys.BACKSPACE:
        e.preventDefault();
        if (!inputList[selectedInputIndex] && prevTargetIndex !== null) {
          this.focusNextInput(prevTargetIndex);
        }

        if (inputList[selectedInputIndex]) {
          inputList[selectedInputIndex] = "";
        }

        this.setInputList(inputList);
        break;

      case keys.LEFT_ARROW:
        e.preventDefault();
        if (prevTargetIndex !== null) {
          this.focusNextInput(prevTargetIndex);
        }
        break;

      case keys.RIGHT_ARROW:
        e.preventDefault();
        if (nextTargetIndex) {
          this.focusNextInput(nextTargetIndex);
        }
        break;

      default:
        break;
    }
  };

  focusNextInput = (index) => {
    const inputToBeFocused = this.inputListRef[index];
    if (inputToBeFocused) {
      inputToBeFocused.focus();
    }
  };

  setInputList = (updatedList) => {
    const { onInputChange } = this.props;
    this.setState(
      {
        inputList: updatedList,
      },
      () => {
        const value = this.state.inputList.join("");
        onInputChange(value);
      }
    );
  };

  render() {
    const { inputList } = this.state;
    return (
      <div>
        {inputList.map((value, index) => {
          return (
            <input
              id={`individual-input-${index}`}
              key={`individual-input-key-${index}`}
              data-testid={`individual-input-${index}`}
              data-id={index}
              type="text"
              value={value}
              className={"individual-input"}
              ref={(ref) => {
                this.inputListRef[index] = ref;
              }}
              onChange={(e) => this.handleIndividualInputChange(e)}
              onPaste={(e) => this.handlePasteEvent(e)}
              onKeyDown={(e) => this.handleKeyDown(e)}
            />
          );
        })}
      </div>
    );
  }
}

export default VerificationInput;
