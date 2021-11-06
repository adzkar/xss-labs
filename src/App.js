import React, { useState } from "react";
import { Typography, Row, Col, Form, Input, Button, Select } from "antd";
import "./App.css";
import "antd/dist/antd.css";
import SCANNING from "./config/scanning";

const { Title, Text } = Typography;
const { Option } = Select;

const requiredMessage = ({ message }) => {
  return `${message} is Required`;
};

const App = () => {
  const [hasResult, setHasResult] = useState(false);

  const onSubmit = (values) => {
    if (values.type === SCANNING.TYPE.DOM) {
      console.log("dom");
    }
    if (values.type === SCANNING.TYPE.REFLECTED) {
      console.log("reflected");
    }
    if (values.type === SCANNING.TYPE.STORED) {
      console.log("stored");
    }
    setHasResult(true);
  };

  return (
    <div className="App">
      <div className="container_wrapper">
        <Row gutter={[24, 24]} className="container_title_wrapper">
          <Col span={24}>
            <Title>XSS Labs</Title>
            <Title level={4}>XSS Web Scanner</Title>
          </Col>
        </Row>

        <Form layout="vertical" onFinish={onSubmit}>
          <Form.Item
            label="Target URL"
            name="target_url"
            rules={[
              {
                required: true,
                message: requiredMessage({ message: "Target URL" }),
              },
              {
                pattern: /^(http|https):\/\/[^ "]+$/,
                message: "Invalid Target URL",
              },
            ]}
          >
            <Input placeholder="Ex: google.com" />
          </Form.Item>
          <Form.Item
            label="Cookie"
            name="cookie"
            rules={[
              {
                required: true,
                message: requiredMessage({ message: "Cookie" }),
              },
            ]}
          >
            <Input placeholder="Ex: ABCD" />
          </Form.Item>
          <Form.Item
            label="Payloads"
            name="payloads"
            rules={[
              {
                required: true,
                message: requiredMessage({ message: "Payloads" }),
              },
            ]}
          >
            <Input.TextArea placeholder="Ex: <img />" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Type"
            rules={[
              {
                required: true,
                message: requiredMessage({ message: "Scanning Type" }),
              },
            ]}
          >
            <Select placeholder="Choose Scanning type">
              {Object.keys(SCANNING.TYPE).map((item) => {
                return <Option value={item}>{item}</Option>;
              })}
            </Select>
          </Form.Item>

          <Button htmlType="submit" block type="primary">
            Scan Now!
          </Button>
        </Form>

        {hasResult && (
          <Row
            gutter={[24, 4]}
            style={{
              marginTop: "20px",
            }}
          >
            <Col span={24}>
              <Title level={3}>Results</Title>
            </Col>
            <Col span={24} className="container_result">
              <Text>hola</Text>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default App;
