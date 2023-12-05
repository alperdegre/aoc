import * as fs from "fs";

export function readFile(filename: string): string {
  const filePath = `${__dirname}/../data/${filename}`;
  const file = fs.readFileSync(filePath, "utf8");
  return file;
}
