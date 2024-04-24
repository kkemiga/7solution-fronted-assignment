import { Col, Row } from "antd";
import { TodoList } from "./TodoList";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TableType } from "./TableType";

export interface TodoListType {
  type: string;
  name: string;
}

const data: TodoListType[] = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

const Todo = () => {
  const [onSelected, setOnSeleted] = useState<TodoListType[]>([]);

  const selected = useRef<TodoListType[]>([]);
  const listItem = useRef<TodoListType[]>(data);

  const removeDelay = useCallback(
    (item: TodoListType) => {
      setTimeout(() => {
        if (!listItem.current.includes(item)) {
          setOnSeleted(
            onSelected?.filter(
              (todoItem: TodoListType) => item.name !== todoItem.name
            )
          );
          selected.current = selected.current?.filter(
            (todoItem: TodoListType) => item.name !== todoItem.name
          );

          listItem.current = [...listItem.current, item];
        }
      }, 5000); //delay 5 sec
    },
    [listItem.current, selected.current]
  );

  const onHandleTodoList = (item: TodoListType) => { //onClick List 
    setOnSeleted([...onSelected, item]);
    listItem.current = listItem.current?.filter(
      (todoItem: TodoListType) => item.name !== todoItem.name
    );
    selected.current = [...selected.current, item];
    removeDelay(item);
  };

  const onHandleTable = (item: TodoListType) => { //onClick Table
    if (!listItem.current?.includes(item)) {
      setOnSeleted(
        onSelected?.filter(
          (todoItem: TodoListType) => item.name !== todoItem.name
        )
      );
      selected.current = selected.current?.filter(
        (todoItem: TodoListType) => item.name !== todoItem.name
      );
      listItem.current = [...listItem.current, item];
    }
  };

  useEffect(() => {
    listItem.current = data
  }, []);

  useEffect(() => {}, [listItem.current]);

  return (
    <Row className="w-full" gutter={[20, 0]}>
      <Col className="h-full" span={8}>
        <TodoList data={listItem.current} onClick={onHandleTodoList} />
      </Col>
      <Col className="h-full" span={8}>
        <TableType
          title="Fruit"
          dataIndex="name"
          onClick={onHandleTable}
          dataTable={selected.current?.filter(
            (item: TodoListType) => item.type === "Fruit"
          )}
        />
      </Col>
      <Col className="h-full" span={8}>
        <TableType
          title="Vegetable"
          dataIndex="name"
          onClick={onHandleTable}
          dataTable={selected.current?.filter(
            (item: TodoListType) => item.type === "Vegetable"
          )}
        />
      </Col>
    </Row>
  );
};

export { Todo };
