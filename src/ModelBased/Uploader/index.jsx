import React, {useState} from "react";
// import { Upload, message } from "antd";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "@progress/kendo-react-upload";
// import './index.css';

const fileStatuses = [
  "UploadFailed",
  "Initial",
  "Selected",
  "Uploading",
  "Uploaded",
  "RemoveFailed",
  "Removing",
];

const Uploader = (props) => {
  const { setModelFile } = props;

  const [files, setFiles] = useState([]);
  const [events, setEvents] = useState([]);
  const [filePreviews, setFilePreviews] = useState({});

  const onAdd = (event) => {
    setFiles(event.newState);
    setEvents([...events, `File selected: ${event.affectedFiles[0].name}`]);
  };

  const onRemove = (event) => {
    const filePreviews = {
      ...filePreviews,
    };

    event.affectedFiles.forEach((file) => {
      delete filePreviews[file.uid];
    });

    setFiles(event.newState);
    setEvents([...events, `File removed: ${event.affectedFiles[0].name}`]);
    setFilePreviews(filePreviews);
  };

  const onProgress = (event) => {
    setFiles(event.newState);
    setEvents([...events, `On Progress: ${event.affectedFiles[0].progress} %`]);
  };

  const onStatusChange = (event) => {
    const file = event.affectedFiles[0];
    console.log("fff", file.getRawFile());
    console.log("event", event.newState);

    var blob = new Blob([file.getRawFile()]);
    var url = URL.createObjectURL(blob);
    setModelFile({
      url,
      fileExtension: '.' + file.getRawFile().name.split('.')[1],
    });

    setFiles(event.newState);
    setEvents([
      ...events,
      `File '${file.name}' status changed to: ${fileStatuses[file.status]}`,
    ]);
  };

  return (
    <div style={{overflow:"hidden"}}>
      <Upload
        batch={false}
        multiple={false}
        files={files}
        onAdd={onAdd}
        onRemove={onRemove}
        onProgress={onProgress}
        onStatusChange={onStatusChange}
        withCredentials={false}
        saveUrl={"https://demos.telerik.com/kendo-ui/service-v4/upload/save"}
        removeUrl={
          "https://demos.telerik.com/kendo-ui/service-v4/upload/remove"
        }
      ></Upload>
      {/* <div className={"example-config"} style={{ marginTop: 20 }}>
        <ul className={"event-log"}>
          {events.map((event) => (
            <li>{event}</li>
          ))}
        </ul>
      </div>
      {files.length ? (
        <div className={"img-preview example-config"}>
          <h3>Preview selected images</h3>
          {Object.keys(filePreviews).map((fileKey) => (
            <img
              src={filePreviews[fileKey]}
              alt={"image preview"}
              style={{ width: 200, margin: 10 }}
            />
          ))}
        </div>
      ) : undefined} */}
    </div>
  );
};

export default Uploader;
