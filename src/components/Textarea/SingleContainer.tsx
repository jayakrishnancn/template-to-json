import { Button, ButtonGroup } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import { exportText, get, readFile, save } from "../../utils";

type Props = {
  title: string;
  disableImport?: boolean;
  disableExport?: boolean;
  contentText?: string;
  onChange: (value: string) => void;
  renderTopBar?: (props: any) => any;
};
const Input = styled("input")({
  display: "none",
});

function SingleContainer(props: Props) {
  const [contentLength, setContentLength] = useState(0);
  const [defaultValue, setDefaultValue] = useState("");
  const {
    title,
    disableImport,
    disableExport,
    contentText,
    renderTopBar = (props?: any) => null,
  } = props;
  const id = encodeURI(title);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!contentText) {
      const value = get(title) ?? "";
      setDefaultValue(value);
      setContentLength(value.length);
    }
  }, [contentText, title]);

  const setValue = async (value) => {
    if (value) {
      save(title, value);
      setContentLength(value.length);
      props.onChange(value);
    }
  };
  const onChange = async (event) => {
    if (event.target.value) {
      setValue(event.target.value);
    }
  };
  const onExport = () => {
    if (textareaRef.current?.value) {
      exportText(title + ".txt", textareaRef.current.value);
    }
  };

  const importFile = (e) => {
    if (textareaRef.current) {
      readFile(e, (value) => {
        textareaRef.current!.value = value;
        setValue(value);
      });
    }
  };

  return (
    <div className="flex flex-col box-container">
      <h1 style={{ margin: 0 }}>{title}</h1>
      <div className="flex mb-2 align-center" style={{ height: 50 }}>
        <div>
          <ButtonGroup variant="outlined" size="small">
            {!disableExport && <Button onClick={onExport}>Export</Button>}
            {!disableImport && (
              <Button>
                <label>
                  Upload
                  <Input onChange={importFile} type="file" />
                </label>
              </Button>
            )}
          </ButtonGroup>
        </div>
        <div style={{ flex: 1 }}></div>
        <b style={{ marginRight: 10 }}>{contentLength}</b>
        {renderTopBar({
          setValue: (val) => {
            setValue(val);
            if (textareaRef.current?.value) {
              textareaRef.current.value = val ?? "";
            }
          },
        })}
      </div>
      <textarea
        defaultValue={defaultValue ?? ""}
        value={contentText}
        onChange={onChange}
        ref={textareaRef}
        className="textarea"
      ></textarea>
    </div>
  );
}

export default SingleContainer;
