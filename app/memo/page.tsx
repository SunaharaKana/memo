import Image from "next/image";
import { CreateMemo } from "./main/ create-memo";
import Link from "next/link";

import { MemoList } from "./main/memo-list";
import axios from "axios";
import { Edit } from "./edit";

export default function Home() {
  const getData = async () => {
    const response = await axios.get("/api");
    console.log(response);
  };
  return <Edit />;
}
