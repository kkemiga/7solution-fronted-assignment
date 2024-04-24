import { Button, List } from "antd";
import { useEffect, useState } from "react";

const TodoList = (props: any) => {
  const { onClick } = props;
  const [data, setData] = useState([]);

  const onClickList = (item: any) => {
    onClick(item);
  };

  useEffect(() => {
    setData(props?.data);
  }, [props.data]);

  return (
    <List
      style={{ height: 500 }}
      size="small"
      dataSource={data}
      renderItem={(item: any) => (
        <List.Item style={{ border: "none", width: "100%" }}>
          <Button
            style={{ textAlign: "center" }}
            block
            onClick={() => onClickList(item)}
          >
            {item.name}
          </Button>
        </List.Item>
      )}
    />
  );
};

export { TodoList };
