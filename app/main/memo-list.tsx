"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// const memos = [
//   {
//     id: 1,
//     title: "aaa",
//     memo: "aaaaa",
//     insert_time: "2000-01-01",
//   },
//   {
//     id: 2,
//     title: "bbb",
//     memo: "bbbbb",
//     insert_time: "2000-02-02",
//   },
// ];

// コンポーネントがマウントされた後にデータを取得

const deleteBody = (id) => {
  return { id: id };
};

const deleteData = async (id) => {
  const body = deleteBody(id);
  try {
    const response = await axios.post("/api/memos/delete", body);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

export const MemoList = () => {
  const [memos, setMemos] = useState([]); // メモのリストを保存するための状態

  const fetchData = () => {
    fetch("http://localhost:3000/api/memos/list") // ExpressサーバーのURL。ポートはサーバーに合わせてください。
      .then((response) => response.json()) // レスポンスのJSONを解析
      .then((data) => setMemos(data)) // 状態にデータをセット
      .catch((error) => console.error("Fetching data failed:", error)); // エラー処理
  };

  useEffect(() => {
    fetchData(); // 初回レンダリング時にデータを取得
  }, []);

  const handleDelete = async (id) => {
    console.log("id", id);
    await deleteData(id);
    fetchData(); // データを再取得
    console.log("削除ボタン実行");
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>タイトル</TableHead>
          <TableHead>メモ</TableHead>
          <TableHead className="text-right">更新日</TableHead>
          <TableHead className="text-right">編集</TableHead>
          <TableHead className="text-right">削除</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {memos.map((memo) => (
          <TableRow key={memo.id} className="cursor-pointer">
            <TableCell className="font-medium">{memo.id}</TableCell>
            <TableCell>{memo.title}</TableCell>
            <TableCell>{memo.memo}</TableCell>
            <TableCell className="text-right">{memo.insert_time}</TableCell>
            <TableCell className="text-right">
              <Link href={`/memo?id=${memo.id}`}>
                <Button>編集</Button>
              </Link>
            </TableCell>
            <TableCell className="text-right">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="bg-red-500 text-white">
                    削除
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>本当に削除しますか？</DialogTitle>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        キャンセル
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        onClick={() => handleDelete(memo.id)}
                      >
                        削除
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
