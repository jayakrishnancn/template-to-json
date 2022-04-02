import { Button, TextField } from "@mui/material";
import { toJson } from "really-relaxed-json";
import { useState } from "react";
import "./App.css";
import SingleContainer from "./components/Textarea/SingleContainer";
import { fillTemplate, get } from "./utils";

function App() {
  const [result, setResult] = useState("");
  const renderRootKeyInput = (props) => {
    return (
      <TextField
        size="small"
        placeholder="root for this key. eg. one.two.three"
      />
    );
  };
  const convertButton = (props: { setValue: (val: string) => void }) => {
    const convert = () => {
      const template = get("Template");
      try {
        const inputStr = toJson(get("Input JSON") ?? "{}");
        const inputJS = JSON.parse(inputStr);
        const result = fillTemplate(template, inputJS);
        setResult(result);
      } catch (err) {
        console.error(err);
        setResult(`Error: ${err}`);
      }
    };
    return (
      <Button onClick={convert} size="small" variant="contained" color="error">
        Convert
      </Button>
    );
  };
  return (
    <div className="App flex w-full">
      <header></header>
      <SingleContainer
        onChange={() => {}}
        renderTopBar={renderRootKeyInput}
        title="Template"
      />
      <SingleContainer
        onChange={() => {}}
        title="Input JSON"
        renderTopBar={convertButton}
      />
      <SingleContainer
        onChange={setResult}
        title="Result"
        contentText={result}
        disableImport
      />
      <footer></footer>
    </div>
  );
}

export default App;
