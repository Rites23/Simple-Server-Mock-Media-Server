const http = require("http");
const { dataFilePath, initializeDataFile } = require("./dataHandler");
const fs = require("fs");

// Initialize the data file when the server starts
initializeDataFile();

const readDataFromFile = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const writeDataToFile = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

const sendResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const data = readDataFromFile();

  if (url === "/movies") {
    if (method === "GET") {
      sendResponse(res, 200, data.movies);
    } else if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const newMovie = JSON.parse(body);
        data.movies.push(newMovie);
        writeDataToFile(data);
        sendResponse(res, 201, data.movies);
      });
    } else if (method === "PUT") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const updatedMovie = JSON.parse(body);
        const index = data.movies.findIndex((m) => m.id === updatedMovie.id);
        if (index !== -1) {
          data.movies[index] = updatedMovie;
          writeDataToFile(data);
          sendResponse(res, 200, data.movies);
        } else {
          sendResponse(res, 404, { message: "Movie not found" });
        }
      });
    } else if (method === "DELETE") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const { id } = JSON.parse(body);
        const index = data.movies.findIndex((m) => m.id === id);
        if (index !== -1) {
          data.movies.splice(index, 1);
          writeDataToFile(data);
          sendResponse(res, 200, data.movies);
        } else {
          sendResponse(res, 404, { message: "Movie not found" });
        }
      });
    }
  } else if (url === "/series") {
    if (method === "GET") {
      sendResponse(res, 200, data.series);
    } else if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const newSeries = JSON.parse(body);
        data.series.push(newSeries);
        writeDataToFile(data);
        sendResponse(res, 201, data.series);
      });
    } else if (method === "PUT") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const updatedSeries = JSON.parse(body);
        const index = data.series.findIndex((s) => s.id === updatedSeries.id);
        if (index !== -1) {
          data.series[index] = updatedSeries;
          writeDataToFile(data);
          sendResponse(res, 200, data.series);
        } else {
          sendResponse(res, 404, { message: "Series not found" });
        }
      });
    } else if (method === "DELETE") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const { id } = JSON.parse(body);
        const index = data.series.findIndex((s) => s.id === id);
        if (index !== -1) {
          data.series.splice(index, 1);
          writeDataToFile(data);
          sendResponse(res, 200, data.series);
        } else {
          sendResponse(res, 404, { message: "Series not found" });
        }
      });
    }
  } else if (url === "/songs") {
    if (method === "GET") {
      sendResponse(res, 200, data.songs);
    } else if (method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const newSong = JSON.parse(body);
        data.songs.push(newSong);
        writeDataToFile(data);
        sendResponse(res, 201, data.songs);
      });
    } else if (method === "PUT") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const updatedSong = JSON.parse(body);
        const index = data.songs.findIndex((s) => s.id === updatedSong.id);
        if (index !== -1) {
          data.songs[index] = updatedSong;
          writeDataToFile(data);
          sendResponse(res, 200, data.songs);
        } else {
          sendResponse(res, 404, { message: "Song not found" });
        }
      });
    } else if (method === "DELETE") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const { id } = JSON.parse(body);
        const index = data.songs.findIndex((s) => s.id === id);
        if (index !== -1) {
          data.songs.splice(index, 1);
          writeDataToFile(data);
          sendResponse(res, 200, data.songs);
        } else {
          sendResponse(res, 404, { message: "Song not found" });
        }
      });
    }
  } else if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <html>
        <head>
          <title>API Documentation</title>
        </head>
        <body>
          <h1>Welcome to the Media Server API</h1>
          <p>Available endpoints:</p>
          <ul>
            <li><strong>GET /movies</strong> - Retrieve all movies</li>
            <li><strong>POST /movies</strong> - Add a new movie</li>
            <li><strong>PUT /movies</strong> - Update an existing movie</li>
            <li><strong>DELETE /movies</strong> - Delete a movie</li>
            <li><strong>GET /series</strong> - Retrieve all series</li>
            <li><strong>POST /series</strong> - Add a new series</li>
            <li><strong>PUT /series</strong> - Update an existing series</li>
            <li><strong>DELETE /series</strong> - Delete a series</li>
            <li><strong>GET /songs</strong> - Retrieve all songs</li>
            <li><strong>POST /songs</strong> - Add a new song</li>
            <li><strong>PUT /songs</strong> - Update an existing song</li>
            <li><strong>DELETE /songs</strong> - Delete a song</li>
          </ul>
        </body>
      </html>
    `);
  } else {
    sendResponse(res, 404, { message: "Route not found" });
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
