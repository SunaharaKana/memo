import { NextResponse } from "next/server";
const sqlite3 = require("sqlite3");
const dbPath = "app/db/database.sqlite3";

export async function POST(request) {
  console.log(request);

  const body = await request.json();
  console.log("body", body);

  const db = new sqlite3.Database(dbPath);

  const id = body.id;
  const memo = body.memo;
  console.log("id:", id);
  console.log("memo", memo);

  // console.log("POST request", body.name);
  // return new Response(JSON.stringify({ message: "Hello World" }));

  // プロミスを使用して非同期クエリを処理
  const query = () =>
    new Promise((resolve, reject) => {
      db.run(
        `UPDATE Memo
        SET memo = "${memo}"
        WHERE id = ${id};
        `,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve({ message: "メモを更新しました" });
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
