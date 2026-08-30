import express from "express";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

const runs = [
  { id: 1, date: "2026-08-24", distanceKm: 8.2, durationSec: 2460 },
  { id: 2, date: "2026-08-26", distanceKm: 5.0, durationSec: 1425 },
  { id: 3, date: "2026-08-29", distanceKm: 12.4, durationSec: 3960 },
];

app.get("/runs", (req, res) => {
  const sorted = [...runs].sort((a, b) => b.date.localeCompare(a.date));
  res.render("runs", { runs: sorted, formatDuration, formatPace });
});

app.listen(3000, () => console.log("http://localhost:3000/runs"));


function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatPace(distanceKm, durationSec) {
  return formatDuration(Math.round(durationSec / distanceKm)) + "/km";
}

