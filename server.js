const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const fse = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer");
const url = "https://www.cnet.com/";
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/stories", async (req, res) => {
  (async () => {
    const selector123 = 2; //(kaj, ime) => "kaj.querySelector(ime).innerText.trim()";

    //Creates a Headless Browser Instance in the Background
    const browser = await puppeteer.launch();

    //Creates a Page Instance, similar to creating a new Tab
    const page = await browser.newPage();

    //Navigate the page to url
    await page.goto(url);
    await page.screenshot({ path: "example.png" });
    const browser12 = await puppeteer.launch();
    const pagez = await browser12.newPage();
    await pagez.goto(url);
    await pagez.goto("https://news.ycombinator.com", {
      waitUntil: "networkidle2",
    });
    await pagez.pdf({ path: "example.pdf", format: "A4" });

    const storyURL = await page.$$eval(".row", (el) => {
      return el
        .filter((ra, i) => i < 6 && i > 0)
        .map((e) => e.querySelector("a").href);
    });
    const newsHHeader = await page.$$eval(".row", (el) => {
      return el
        .filter((ra, i) => i < 6 && i > 0)
        .map((e) => e.querySelector("h3").innerText.trim());
    });
    const smortSumarryy = await page.$$eval(".row", (el) => {
      return el
        .filter((ra, i) => i < 6 && i > 0)
        .map((e) => e.querySelector("p").innerText.trim());
    });

    const browser2 = await puppeteer.launch();

    //Creates a Page Instance, similar to creating a new Tab
    const page2 = await browser.newPage();

    //Navigate the page to url

    await page2.goto(storyURL[0]);
    const authors1 = await page2.$eval(
      ".c-assetAuthor_authors",
      (el) => el.querySelector("a").innerText
    );
    const ulrofImg1 = await page2.$eval(".image-large", (el) => el.innerText);
    const published1 = await page2.$eval(
      ".c-assetAuthor_date",
      (el) => el.querySelector("time").innerText
    );
    const tags1 = await page2.$eval(
      ".tagList",
      (el) => el.querySelector(".tag").innerText
    );
    //const tags1 = await tags

    await page2.goto(storyURL[1]);
    const authors2 = await page2.$eval(
      ".c-assetAuthor_authors",
      (el) => el.querySelector("a").innerText
    );
    const published2 = await page2.$eval(
      ".c-assetAuthor_date",
      (el) => el.querySelector("time").innerText
    );
    const tags2 = await page2.$eval(
      ".tagList",
      (el) => el.querySelector(".tag").innerText
    );
    await page2.goto(storyURL[2]);
    const authors3 = await page2.$eval(
      ".c-assetAuthor_authors",
      (el) => el.querySelector("a").innerText
    );
    const published3 = await page2.$eval(
      ".c-assetAuthor_date",
      (el) => el.querySelector("time").innerText
    );
    const tags3 = await page2.$eval(
      ".tagList",
      (el) => el.querySelector(".tag").innerText
    );
    await page2.goto(storyURL[3]);
    const authors4 = await page2.$eval(
      ".c-assetAuthor_authors",
      (el) => el.querySelector("a").innerText
    );
    const published4 = await page2.$eval(
      ".c-assetAuthor_date",
      (el) => el.querySelector("time").innerText
    );
    const tags4 = await page2.$eval(
      ".tagList",
      (el) => el.querySelector(".tag").innerText
    );
    await page2.goto(storyURL[4]);
    const authors5 = await page2.$eval(
      ".c-assetAuthor_authors",
      (el) => el.querySelector("a").innerText
    );
    const tags5 = await page2.$eval(
      ".tagList",
      (el) => el.querySelector(".tag").innerText
    );
    const published5 = await page2.$eval(
      ".c-assetAuthor_date",
      (el) => el.querySelector("time").innerText
    );

    const authorzz = await [authors1, authors2, authors3, authors4, authors5];
    const tags123 = await [tags1, tags2, tags3, tags4, tags5];
    const published = await [
      published1,
      published2,
      published3,
      published4,
      published5,
    ];
    // execute standard javascript in the context of the page.

    //console.log(123);
    await console.log(tags123);
    const objekt = await storyURL.map((el, i) => ({
      newsHeader: newsHHeader[i],
      shortSumary: smortSumarryy[i],
      tags: tags123[i],
      author: authorzz[i],
      urlOfStory: storyURL[i],
      timeOfPublishment: published[i],
    }));

    res.json(objekt);
    //console.log(stories);
    //Closes the Browser Instance

    await browser.close();
  })();
});

app.listen(port, () => {
  console.log("Listening to the server");
});
