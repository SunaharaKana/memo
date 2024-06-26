import Image from "next/image";
import { CreateMemo } from "./main/ create-memo";
import Link from "next/link";
import { Edit } from "./memo/[id]/page";
import { MemoList } from "./main/memo-list";
import axios from "axios";

export default function Home() {
  const getData = async () => {
    const response = await axios.get("/api");
    console.log(response);
  };
  return (
    <div>
      <h1 className="text-2xl font-bold my-4">メモ</h1>
      <CreateMemo />
      <MemoList />
    </div>
  );
}
