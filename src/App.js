import React, { useState, useEffect } from "react";
import {
  Typography,
  Row,
  Col,
  Form,
  Input,
  Button,
  Select,
  Skeleton,
  Space,
  Tag,
  Card,
} from "antd";
import "./App.css";
import "antd/dist/antd.css";
import SCANNING from "./config/scanning";
import {
  onSubmit,
  getArrayFromString,
  getTimeFromString,
} from "./form.handler";

const { Title, Text } = Typography;
const { Option } = Select;

const requiredMessage = ({ message }) => {
  return `${message} is Required`;
};

const ResultItem = (props) => {
  const { payload, data } = props;

  try {
    const stringResult = getArrayFromString(data);
    const resultTime = getTimeFromString(data);
    const parsedResponse = JSON.parse(stringResult);
    const result = parsedResponse?.[0]?.result;

    return (
      <>
        Payload: <strong>{payload}</strong>
        <br />
        <p>
          Message:{" "}
          {result ? (
            <Tag color="green">Found</Tag>
          ) : (
            <Tag color="red">Not Found</Tag>
          )}
          <Tag>{resultTime}</Tag>
        </p>
        <Space />
      </>
    );
  } catch {
    return (
      <>
        Payload: <strong>{payload}</strong>
        <br />
        <p>
          Message:
          <Tag color="red">Not Found</Tag>
          <Tag>{data}</Tag>
        </p>
        <Space />
      </>
    );
  }
};

const App = () => {
  const [hasResult, setHasResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [total, setTotal] = useState({
    found: 0,
    notFound: 0,
  });

  useEffect(() => {
    if (hasResult) {
      let foundTmp = 0;
      let notFoundTmp = 0;
      result.forEach(({ data }) => {
        try {
          const stringResult = getArrayFromString(data);
          const parsedResponse = JSON.parse(stringResult);
          const result = parsedResponse?.[0]?.result;
          if (result) {
            foundTmp += 1;
          }
          if (!result) {
            notFoundTmp += 1;
          }
        } catch {
          notFoundTmp += 1;
        }
      });
      setTotal({
        found: foundTmp,
        notFound: notFoundTmp,
      });
    }
  }, [result, hasResult]);

  return (
    <div className="App">
      <div className="container_wrapper">
        <Row gutter={[24, 24]} className="container_title_wrapper">
          <Col span={24}>
            <Title>XSS Labs</Title>
            <Title level={4}>XSS Web Scanner</Title>
          </Col>
        </Row>

        <Form
          layout="vertical"
          onFinish={(values) => {
            onSubmit({ values, setHasResult, setIsLoading, setResult });
          }}
        >
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
            name="cookies"
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
            <Input.TextArea placeholder="Ex: <img />" rows={4} />
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
                return (
                  <Option value={SCANNING.TYPE[item]} key={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Button htmlType="submit" block type="primary" loading={isLoading}>
            Scan Now!
          </Button>
        </Form>

        {isLoading && (
          <Row
            gutter={[24, 4]}
            style={{
              marginTop: "20px",
            }}
          >
            <Col span={24}>
              <Skeleton />
            </Col>
          </Row>
        )}

        {hasResult && !isLoading && (
          <Row
            gutter={[24, 8]}
            style={{
              marginTop: "20px",
            }}
          >
            <Col span={24}>
              <Title level={3}>Results</Title>
            </Col>
            <Col span={24}>
              <Row gutter={[24]}>
                <Col span={12}>
                  <Card title="Found">
                    <Title
                      style={{
                        textAlign: "right",
                      }}
                    >
                      {total?.found}
                    </Title>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Not Found">
                    <Title
                      style={{
                        textAlign: "right",
                      }}
                    >
                      {total?.notFound}
                    </Title>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Card>
                <Text>
                  {result.map(({ payload, data }) => {
                    return <ResultItem data={data} payload={payload} />;
                  })}
                </Text>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
};

export default App;
