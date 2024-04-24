import { Card } from "antd";
import { useEffect, useState } from "react";
import { TodoList } from "./TodoList";

const TableType = (props: any) => {
  const [dataTable, setDataTable] = useState([]);

  const onTest = (item: any) => {
    props?.onClick(item);
  };
  useEffect(() => {
    setDataTable(props?.dataTable);
  }, [props?.dataTable]);

  return (
    <Card style={{height:'100%'}} title={props?.title}>
      <TodoList data={dataTable} onClick={onTest} />
    </Card>
  );
};

export { TableType };
