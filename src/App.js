import React, { useState } from "react";
import { Typography, Row, Col, Form, Input, Button } from "antd";
import "./App.css";
import "antd/dist/antd.css";

const { Title, Text } = Typography;

const requiredMessage = ({ message }) => {
  return `${message} is Required`;
};

const App = () => {
  const [hasResult, setHasResult] = useState(false);

  const onSubmit = () => {
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

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item name="dom">
                <Button htmlType="submit" block type="ghost">
                  DOM & Reflected
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="stored">
                <Button htmlType="submit" block type="primary">
                  STORED
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {hasResult && (
          <Row gutter={[24, 4]}>
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
