"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const searchBody = (id) => {
  return { id: id };
};

const searchData = async (id) => {
  const body = searchBody(id);
  try {
    const response = await axios.post("/api/memos/search", body);
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const Edit = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [message, setMessage] = useState(""); // メッセージを保存するための状態
  const [title, setTitle] = useState(""); // タイトルを保存するための状態

  // テキストエリアの値が変更された時に実行される関数
  const handleTextareaChange = (event) => {
    setMessage(event.target.value);
  };

  const updateBody = (id, memo) => {
    return { id: id, memo: memo };
  };

  const updateData = async (id, memo) => {
    const body = updateBody(id, memo);
    try {
      const response = await axios.post("/api/memos/update/memo", body);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // 保存ボタンが押された時に実行される関数
  const handleSave = () => {
    console.log("保存されたメッセージ: ", message);
    const body = { id: id, memo: message };
    updateData(id, message);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await searchData(id);
      console.log("bbbbb");
      console.log("data", data);
      console.log("memo", data.memo);
      console.log("title", data.title);
      setMessage(data[0].memo);
      setTitle(data[0].title);
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4">
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
      <div className="flex gap-2 mb-2">
        <Button onClick={handleSave}>保存</Button>
        <Link href="/">
          <Button>戻る</Button>
        </Link>
      </div>
      <Textarea
        placeholder="Type your message here."
        value={message}
        onChange={handleTextareaChange}
        className="w-full"
        style={{ height: "900px" }}
      />
    </div>
  );
};
