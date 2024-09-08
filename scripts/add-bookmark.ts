import * as cheerio from "cheerio";
import slugify from "slugify";
import fs from "fs";
import path from "path";

const url = process.argv[2];
const date = process.argv[3];

const BASE_PATH = path.join(__dirname, "../src/content/bookmarks");

const go = async () => {
  const data = await fetch(url).then((res) => res.text());
  const $ = cheerio.load(data);
  const title = $("title").text();

  const fileName = `${BASE_PATH}/${slugify(title, { lower: true })}.json`;
  const contents = JSON.stringify(
    {
      url,
      title,
      date: date ?? new Date(),
    },
    null,
    2
  );

  fs.writeFileSync(fileName, contents);
  return contents;
};

go()
  .then((bookmark) => {
    console.log("Bookmark added:");
    console.log(bookmark);
  })
  .catch((error) => {
    console.error("Error adding bookmark:", error);
  });
