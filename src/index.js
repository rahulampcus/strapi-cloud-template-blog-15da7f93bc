// "use strict";
const bootstrap = require("./bootstrap");

// module.exports = {
//   /**
//    * An asynchronous register function that runs before
//    * your application is initialized.
//    *
//    * This gives you an opportunity to extend code.
//    */
//   register(/*{ strapi }*/) {},

//   /**
//    * An asynchronous bootstrap function that runs before
//    * your application gets started.
//    *
//    * This gives you an opportunity to set up your data model,
//    * run jobs, or perform some special logic.
//    */
//   bootstrap,
// };

("use strict");

module.exports = {
  /**
   * Called before the application is initialized
   */
  register({ strapi }) {
    console.log("🚀 Strapi register() called – initializing plugins...");
    const cronTasks = require("./cron-tasks");
    cronTasks.start(strapi); // Start cron jobs

    //   const { Server } = require("socket.io");

    //   // Attach Socket.IO to Strapi's internal HTTP server
    //   const io = new Server(strapi.server.httpServer, {
    //     cors: {
    //       origin: "http://localhost:5173/",
    //       methods: ["GET", "POST"],
    //       credentials: true,
    //     },
    //     transports: ["websocket"],
    //   });

    //   global.io = io;

    //   io.on("connection", (socket) => {
    //     console.log(`🟢 Client connected: ${socket.id}`);

    //     socket.on("disconnect", () => {
    //       console.log(`🔴 Client disconnected: ${socket.id}`);
    //     });
    //   });
    //   console.log("✅ Socket.IO is attached and ready!");
    //   console.log("📡 Listening for client connections...");
  },

  /**
   * Called after the application is bootstrapped
   */
  // async bootstrap({ strapi }) {
  //   const { Server } = require("socket.io");
  //   // const cronTasks = require("./cron-tasks");
  //   // cronTasks.start(strapi); // Start cron jobs

  //   console.log("🛠️ Bootstrapping Strapi with Socket.IO...");

  //   // Attach Socket.IO to Strapi's internal HTTP server
  //   const io = new Server(strapi.server.httpServer, {
  //     cors: {
  //       origin: "http://localhost:5173/",
  //       methods: ["GET", "POST"],
  //       credentials: true,
  //     },
  //     transports: ["websocket"],
  //   });

  //   console.log("✅ Socket.IO is attached and ready!");
  //   console.log("📡 Listening for client connections...");
  // },
  bootstrap,
};
