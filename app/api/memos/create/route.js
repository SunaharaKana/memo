import { NextResponse } from "next/server";
const sqlite3 = require("sqlite3");
const dbPath = "app/db/database.sqlite3";

export async function POST(request) {
  console.log(request);

  const body = await request.json();
  console.log("body", body);

  const db = new sqlite3.Database(dbPath);

  const title = body.title;
  const memo = body.memo ? body.memo : "";
  console.log("title:", title);
  console.log("memo", memo);

  // プロミスを使用して非同期クエリを処理
  const query = () =>
    new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO Memo (title, memo) VALUES (?, ?)`,
        [title, memo],
        function (err) {
          if (err) {
            reject(err);
          } else {
            console.log("id", this.lastID);
            resolve({ message: "新規メモを作成しました", id: this.lastID });
          }
        }
      );
    });

  try {
    const res = await query(); // クエリの完了を待つ
    db.close(); // クエリ後にデータベースを閉じる
    return NextResponse.json(res); // 結果をJSONとして返す
  } catch (error) {
    db.close(); // エラーが発生した場合もデータベースを閉じる
    return NextResponse.json({ error: error.message }); // エラーメッセージを返す
  }
}
