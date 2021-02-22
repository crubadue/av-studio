import React from "react";
import { Upload, message } from "antd";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: false,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",

  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const Uploader = () => {
  return (
    <Row style={{ height: "100vh" }}>
      <Col span={24}>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag gltf,glb or babylon files to get started
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </Col>
    </Row>
  );
};

export default Uploader;
