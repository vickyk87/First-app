import React, { useState, useRef } from "react";

export default function TextForm(props) {
  const handleUpperClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Convert To Uppercase", "success");
  };

  const handleLowerClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Convert To Lowercase", "success");
  };

  const handleClearTextClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Clear text succesfully", "success");
  };

  const handleOnChange = (e) => {
    setText(e.target.value);
    index.current = index.current + 1;
    setTextArray([...textArray.slice(0, index.current), e.target.value]);
  };

  const handleUndo = () => {
    if (index.current > 0) {
      index.current = index.current - 1;
      setText(textArray[index.current]);
      props.showAlert("Text successfully undo", "success");
    }
  };

  const handleRedo = () => {
    if (index.current < textArray.length - 1) {
      index.current = index.current + 1;
      setText(textArray[index.current]);
      props.showAlert("Text successfully redo", "success");
    }
  };

  const handleCopy = () => {
    // let text = document.getElementById("myBox");
    // text.select();
    navigator.clipboard.writeText(text);
    // document.getSelection().removeAllRanges();
    props.showAlert("Copy to Clipboard!", "success");
  };

  const handleExtraSpace = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra space succefully removed", "success");
  };

  const [text, setText] = useState("");
  const [textArray, setTextArray] = useState([text]);
  const index = useRef(0);
  return (
    <>
      <div
        className="container"
        style={{
          color: props.mode === "dark" ? "white" : "#042743",
        }}
      >
        <h3 className="mb-2">{props.heading}</h3>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            id="myBox"
            rows="3"
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#13466e" : "white",
              color: props.mode === "dark" ? "white" : "#042743",
            }}
          ></textarea>
        </div>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUpperClick}
          style={{ border: "1px solid #fff" }}
        >
          Convert To Uppercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleLowerClick}
          style={{ border: "1px solid #fff" }}
        >
          Convert To Lowercase
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleClearTextClick}
          style={{ border: "1px solid #fff" }}
        >
          Clear Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleUndo}
          style={{ border: "1px solid #fff" }}
        >
          Undo Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleRedo}
          style={{ border: "1px solid #fff" }}
        >
          Redo Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleCopy}
          style={{ border: "1px solid #fff" }}
        >
          Copy Text
        </button>
        <button
          disabled={text.length === 0}
          className="btn btn-primary mx-1 my-1"
          onClick={handleExtraSpace}
          style={{ border: "1px solid #fff" }}
        >
          Remove Extra Space
        </button>
      </div>
      <div
        className="container my-3"
        style={{
          color: props.mode === "dark" ? "white" : "#042743",
        }}
      >
        <h1>Your Text Summary</h1>
        <p>
          {
            text.split(/\s+/).filter((element) => {
              return element.length !== 0;
            }).length
          }{" "}
          words, {text.length} characters <br />
          {0.08 *
            text.split(" ").filter((element) => {
              return element.length !== 0;
            }).length}{" "}
          Minute Read
        </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
      </div>
    </>
  );
}
