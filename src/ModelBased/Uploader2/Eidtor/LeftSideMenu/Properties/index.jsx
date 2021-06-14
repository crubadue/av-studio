import React, { PureComponent } from "react";
import { Input, Form, Select, Row, Co, Radio, Space } from "antd";
import FileUploader from "./FileUploader";
import MultiFileUploader from "./MultiFileUploader";

const { Option } = Select;
const { TextArea } = Input;

const PropertiesTab = (props) => {
  const [form] = Form.useForm();

  return (
    <Row
      style={{
        padding: "20px",
        width: "100%",
        height: "100%",
        overflow: "auto",
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{}}
        style={{ width: "100%" }}
      >
        <Form.Item
          name="fullName"
          label={"Full Name"}
          rules={[
            {
              required: true,
              message: "invalid Full Name",
            },
          ]}
          style={{ width: "100%" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category"
          label={"Category"}
          rules={[
            {
              required: true,
              message: "invalid Category",
            },
          ]}
          style={{ width: "100%" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="type"
          label={"Type"}
          rules={[
            {
              required: true,
              message: "invalid Type",
            },
          ]}
          style={{ width: "100%" }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="meshType"
          label="Prewview Mesh Type"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "invalid Type",
            },
          ]}
        >
          <Radio.Group style={{ color: "white" }}>
            <Space direction="vertical" style={{ marginLeft: "25px" }}>
              <Radio value={1}>Bounding Box</Radio>
              <Radio value={2}>Billboard</Radio>
              <Radio value={3}>Simple Mesh</Radio>
            </Space>
          </Radio.Group>
          
        </Form.Item>
        <Form.Item
          name="previewMesh"
          label="Preview Mesh"
          style={{ width: "100%" }}
        >
          <FileUploader />
        </Form.Item>
        <Form.Item
          name="thumbnailImages"
          label="Thumbnail Images"
          style={{ width: "100%" }}
        >
          <MultiFileUploader />
        </Form.Item>
        <Form.Item
          name="tags"
          label="Tags"
          style={{ width: "100%" }}
          rules={[
            {
              required: true,
              message: "invalid Type",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Row>
  );
};
export default PropertiesTab;
