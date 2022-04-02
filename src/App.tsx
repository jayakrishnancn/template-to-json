import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import SingleContainer from "./components/Textarea/SingleContainer";
import { get, save } from "./utils";
import { convert } from "./services/convert";
import { StoredItems } from "./enums";
const RenderRootKeyInput = (props) => {
  const [thisKeyValue, setThisKeyValue] = useState("");

  useEffect(() => {
    setThisKeyValue(get(StoredItems.thisRootKey) ?? "");
  }, []);

  return (
    <TextField
      value={thisKeyValue}
      size="small"
      onChange={(e) => {
        setThisKeyValue(e.target?.value);
        save(StoredItems.thisRootKey, e.target.value);
      }}
      placeholder="root for this key. eg. one.two.three"
    />
  );
};
function App() {
  const [result, setResult] = useState(" ");

  const convertButton = () => {
    const transformJson = (e) => {
      const val = convert(
        get(StoredItems.template),
        get(StoredItems.inputJSON),
        get(StoredItems.thisRootKey) ?? ""
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
        renderTopBar={() => <RenderRootKeyInput />}
        title={StoredItems.template}
      />
      <SingleContainer
        onChange={() => {}}
        title={StoredItems.inputJSON}
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
