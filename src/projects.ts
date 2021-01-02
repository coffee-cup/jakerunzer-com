import { IProject } from "./types";

export const projects: IProject[] = [
  {
    name: "Bowtie",
    description: "Score keeping iOS app for card and board games",
    link: "https://bowtie.cards",
    category: "ios",
    date: new Date("2020-12-27"),
    type: "project",
  },
  {
    name: "Chronicle",
    description:
      "Lightweight journaling app where you record highlights of your day",
    link: "https://chronicle.ink",
    category: "web",
    date: new Date("2020-04-16"),
    type: "project",
  },
  {
    name: "Tag Tester",
    description: "Test and edit your websites open graph metadata tags",
    link: "https://tagtester.dev",
    category: "web",
    date: new Date("2020-02-20"),
    type: "project",
  },
  {
    name: "Stck",
    description: "Minimal stack based esoteric programming language",
    link: "https://stck.jakerunzer.com",
    category: "language",
    date: new Date("2020-03-20"),
    type: "project",
  },
  {
    name: "Solis",
    description:
      "iOS app that shows you the times of sunrise, sunset, and twilight's",
    link: "https://solisapp.xyz",
    category: "ios",
    date: new Date("2016-08-27"),
    type: "project",
  },
  {
    name: "Krill",
    description: "Dynamic, curried, and minimal programming language",
    link: "https://krill.jakerunzer.com",
    category: "language",
    date: new Date("2019-06-10"),
    type: "project",
  },
  {
    name: "Quiztastic",
    description: " Web based trivia game for friends and family",
    link: "https://quiztastic.app",
    category: "web",
    date: new Date("2019-10-18"),
    type: "project",
  },
  {
    name: "LastFM Leaderboards",
    description: "Music leaderboards powered by Elm and last.fm",
    link: "https://lastfm.jakerunzer.com/",
    category: "web",
    date: new Date("2018-05-02"),
    type: "project",
  },
  {
    name: "Favocon",
    description: "Command line utility for creating favicons from any image",
    link: "https://crates.io/crates/favocon",
    category: "devtool",
    date: new Date("2019-10-08"),
    type: "project",
  },
];
