import React, { useCallback, useEffect, useState, useContext } from "react";
import { Select, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadButton = (props) => {
  const { onImageLoad, channelId } = props;

  const beforeUpload = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        onImageLoad(channelId, reader.result);
      };
    });
  };

  return (
    <Upload
      action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
      listType={"picture"}
      beforeUpload={beforeUpload}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};
export default UploadButton;
