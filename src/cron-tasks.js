const cron = require("node-cron");

module.exports = {
  start(strapi) {
    cron.schedule("0 10 25 6 *", async () => {
      console.log("Running cron job  ****");

      let month = "" + (new Date().getMonth() + 1);
      console.log("Month", month, month.length);
      month = month.length == 2 ? month : "0" + month;
      const articles = await strapi.db
        .query("api::lake-visit.lake-visit")
        .findMany({
          where: {
            startDate: {
              $gte: new Date("2025-" + month + "-01"),
            },
            endDate: {
              $lte: new Date("2025-" + month + "-30"),
            },
            visitStatus: "NOT-STARTED",
          },
        });

      console.log("articles", articles.length);
      for (let i = 0; i < articles.length; i++) {
        const obj = await articles[i];
        // console.log("obj", obj);

        const result = await strapi.db
          .query("api::lake-visit.lake-visit")
          .updateMany({
            where: {
              id: obj.id,
            },
            data: { visitStatus: "READY-FOR-VISIT" },
          });

        console.log("Result -", result);
      }

      // Example: Fetch or update something
      //   const result = await strapi.db
      //     .query("api::lake-visit.lake-visit")
      //     .updateMany({
      //       where: {
      //         startDate: { $lte: new Date() },
      //         visitStatus: "NOT-STARTED",
      //       },
      //       data: { visitStatus: "PENDING" },
      //     });

      //   console.log("result", articles);
    });
  },
};
