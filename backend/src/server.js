const app = require("./app");
const env = require("./config/env");
const prisma = require("./config/db");
const { registerJobs } = require("./jobs");

const PORT = env.port || 5000;

let server;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected successfully.");

    registerJobs();

    server = app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully...`);

  try {
    if (server) {
      server.close(async () => {
        await prisma.$disconnect();
        console.log("HTTP server closed.");
        console.log("Database disconnected.");
        process.exit(0);
      });
    } else {
      await prisma.$disconnect();
      process.exit(0);
    }
  } catch (error) {
    console.error("Error during shutdown:", error.message);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

startServer();