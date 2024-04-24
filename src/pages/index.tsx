import Image from "next/image";
import { Inter } from "next/font/google";
import { Button, Divider, Row } from "antd";
import { Todo } from "./components/Todo";
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter()
  return (
    <div className="App">
      <Todo/>
      <Divider/>
      <Button onClick={()=>router.push('/monitoring')}  type='primary'>Next</Button>
    </div>
  );
}
