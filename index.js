const http = require("http");

const movies = [
  { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
  { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 },
  { id: 3, title: "Avatar 3", director: "James Cameron", year: 2025 },
  {
    id: 4,
    title: "Guardians of the Galaxy Vol. 4",
    director: "James Gunn",
    year: 2025,
  },
];

const series = [
  { id: 1, title: "Breaking Bad", creator: "Vince Gilligan", seasons: 5 },
  {
    id: 2,
    title: "Stranger Things",
    creator: "The Duffer Brothers",
    seasons: 4,
  },
  {
    id: 3,
    title: "The Mandalorian Season 4",
    creator: "Jon Favreau",
    seasons: 4,
    year: 2025,
  },
  {
    id: 4,
    title: "The Witcher Season 4",
    creator: "Lauren Schmidt Hissrich",
    seasons: 4,
    year: 2025,
  },
];

const songs = [
  { id: 1, title: "Bohemian Rhapsody", artist: "Queen", year: 1975 },
  { id: 2, title: "Imagine", artist: "John Lennon", year: 1971 },
  { id: 3, title: "Save Your Tears", artist: "The Weeknd", year: 2025 },
  { id: 4, title: "Rolling in the Deep", artist: "Adele", year: 2025 },
];


const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (url === "/movies") {
    if (method === "GET") {
      sendResponse(res, 200, movies);
    } else if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const newMovie = JSON.parse(body);
        movies.push(newMovie);
        sendResponse(res, 201, movies);
      });
    } else if (method === "PUT") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const updatedMovie = JSON.parse(body);
        const index = movies.findIndex((m) => m.id === updatedMovie.id);
        if (index !== -1) {
          movies[index] = updatedMovie;
          sendResponse(res, 200, movies);
        } else {
          sendResponse(res, 404, { message: "Movie not found" });
        }
      });
    } else if (method === "DELETE") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const { id } = JSON.parse(body);
        const index = movies.findIndex((m) => m.id === id);
        if (index !== -1) {
          movies.splice(index, 1);
          sendResponse(res, 200, movies);
        } else {
          sendResponse(res, 404, { message: "Movie not found" });
        }
      });
    }
  } else if (url === "/series") {
    if (method === "GET") {
      sendResponse(res, 200, series);
    } else if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const newSeries = JSON.parse(body);
        series.push(newSeries);
        sendResponse(res, 201, series);
      });
    } else if (method === "PUT") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const updatedSeries = JSON.parse(body);
        const index = series.findIndex((s) => s.id === updatedSeries.id);
        if (index !== -1) {
          series[index] = updatedSeries;
          sendResponse(res, 200, series);
        } else {
          sendResponse(res, 404, { message: "Series not found" });
        }
      });
    } else if (method === "DELETE") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const { id } = JSON.parse(body);
        const index = series.findIndex((s) => s.id === id);
        if (index !== -1) {
          series.splice(index, 1);
          sendResponse(res, 200, series);
        } else {
          sendResponse(res, 404, { message: "Series not found" });
        }
      });
    }
  } else if (url === "/songs") {
    if (method === "GET") {
      sendResponse(res, 200, songs);
    } else if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const newSong = JSON.parse(body);
        songs.push(newSong);
        sendResponse(res, 201, songs);
      });
    } else if (method === "PUT") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const updatedSong = JSON.parse(body);
        const index = songs.findIndex((s) => s.id === updatedSong.id);
        if (index !== -1) {
          songs[index] = updatedSong;
          sendResponse(res, 200, songs);
        } else {
          sendResponse(res, 404, { message: "Song not found" });
        }
      });
    } else if (method === "DELETE") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const { id } = JSON.parse(body);
        const index = songs.findIndex((s) => s.id === id);
        if (index !== -1) {
          songs.splice(index, 1);
          sendResponse(res, 200, songs);
        } else {
          sendResponse(res, 404, { message: "Song not found" });
        }
      });
    }
  } else {
    sendResponse(res, 404, { message: "Route not found" });
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
