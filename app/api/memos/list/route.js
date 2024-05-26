import { NextResponse } from "next/server";

const sqlite3 = require("sqlite3");

const dbPath = "app/db/database.sqlite3";

export async function GET() {
  const db = new sqlite3.Database(dbPath);
  // プロミスを使用して非同期クエリを処理
  const query = () =>
    new Promise((resolve, reject) => {
      db.all("SELECT * FROM Memo", (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
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
