import { Button, TextField } from "@mui/material";
import { useRef, useState } from "react";
import "./App.css";
import SingleContainer from "./components/Textarea/SingleContainer";
import { get } from "./utils";
import { convert } from "./services/convert";

function App() {
  const [result, setResult] = useState(" ");
  const rootKeyRef = useRef<HTMLInputElement>();
  const renderRootKeyInput = (props) => {
    return (
      <TextField
        size="small"
        inputRef={rootKeyRef}
        placeholder="root for this key. eg. one.two.three"
      />
    );
  };
  const convertButton = (props: { setValue: (val: string) => void }) => {
    const transformJson = (e) => {
      const val = convert(
        get("Template"),
        get("Input JSON"),
        rootKeyRef.current?.value ?? ""
      );
      setResult(val);
    };
    return (
      <Button
        onClick={transformJson}
        size="small"
        variant="contained"
        color="error"
      >
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
