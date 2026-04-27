import fs from "fs";
import { TmdbApi } from "../dist/index.js";

const client = new TmdbApi(process.env.API_KEY, "it-IT");
client.genres.fetchMoviesList().then((response) => {
  if (response.success) {
    fs.writeFileSync(
      "./test/output.json",
      JSON.stringify(response.json),
      "utf-8",
    );
  } else {
    console.log(response.error);
  }
});