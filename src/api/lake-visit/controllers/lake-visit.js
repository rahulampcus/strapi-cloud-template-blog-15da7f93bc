// // 'use strict';

// // /**
// //  * lake-visit controller
// //  */

// // const { createCoreController } = require('@strapi/strapi').factories;

// // module.exports = createCoreController('api::lake-visit.lake-visit');

// // const updatedEntry = await strapi
// //   .documents("api::lake-visit.lake-visit")
// //   .update({
// //     id: existingEntry.id,
// //     data,
// //     status: "published", // ✅ key part
// //   });

// // "use strict";

// // const { createCoreController } = require("@strapi/strapi").factories;

// // module.exports = createCoreController(
// //   "api::lake-visit.lake-visit",
// //   ({ strapi }) => ({
// //     async update(ctx) {
// //       const { id } = ctx.params;
// //       const data = ctx.request.body?.data;

// //       const isDocumentId = isNaN(Number(id));

// //       if (isDocumentId) {
// //         // ✅ Find the entry by documentId
// //         const existingEntry = await strapi.db
// //           .query("api::lake-visit.lake-visit")
// //           .findOne({ where: { documentId: id } });

// //         if (!existingEntry) {
// //           return ctx.notFound(`Lake visit with documentId '${id}' not found`);
// //         }

// //         // Always set publishedAt to now (force publish)
// //         //data.publishedAt = new Date().toISOString();

// //         // // ✅ Set publishedAt if not already set (optional: avoid unnecessary update)
// //         // if (!existingEntry.publishedAt) {
// //         //   data.publishedAt = new Date().toISOString();
// //         // }

// //         // ✅ Update by internal numeric ID
// //         const now = new Date().toISOString();
// //         const updatedEntry = await strapi.entityService.update(
// //           "api::lake-visit.lake-visit",
// //           existingEntry.id,
// //           {
// //             data: {
// //               ...data,
// //               publishedAt: now,
// //             },
// //           }
// //         );

// //         return this.transformResponse(updatedEntry);
// //       }

// //       // 🔁 Fallback to default behavior for numeric IDs
// //       return super.update(ctx);
// //     },
// //   })
// // );
// "use strict";

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController(
//   "api::lake-visit.lake-visit",
//   ({ strapi }) => ({
//     async update(ctx) {
//       const { id: documentId } = ctx.params;
//       const { data } = ctx.request.body;

//       try {
//         // 1. Find the existing entry
//         const existingEntry = await strapi.db
//           .query("api::lake-visit.lake-visit")
//           .findOne({
//             where: { documentId: { $eq: documentId } },
//             publicationState: "preview",
//           });

//         if (!existingEntry) {
//           return ctx.notFound("Lake visit not found");
//         }

//         // 2. Prepare update data - only modify specified fields
//         const updateData = {
//           officer_name:
//             data.officer_name !== undefined
//               ? data.officer_name
//               : existingEntry.officer_name,
//           officerRemarkInfo:
//             data.officerRemarkInfo !== undefined
//               ? data.officerRemarkInfo
//               : existingEntry.officerRemarkInfo,
//           publishedAt: existingEntry.publishedAt || new Date().toISOString(),
//         };

//         // 3. Perform update
//         const updatedEntry = await strapi.entityService.update(
//           "api::lake-visit.lake-visit",
//           existingEntry.id,
//           {
//             data: updateData,
//             publicationState: "live",
//           }
//         );

//         return this.transformResponse(updatedEntry);
//       } catch (err) {
//         strapi.log.error("Update error:", err);
//         return ctx.internalServerError("Update failed");
//       }
//     },
//   })
// );

"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::lake-visit.lake-visit",
  ({ strapi }) => ({
    async update(ctx) {
      const { id: documentId } = ctx.params;
      const { data } = ctx.request.body;

      try {
        // 1. Find the existing entry by documentId
        const existingEntry = await strapi.db
          .query("api::lake-visit.lake-visit")
          .findOne({
            where: { documentId },
          });

        if (!existingEntry) {
          return ctx.notFound(
            `Lake visit with documentId '${documentId}' not found`
          );
        }

        const updatedEntry = await strapi.entityService.update(
          "api::lake-visit.lake-visit",
          existingEntry.id,
          {
            data: {
              ...existingEntry, // Keep existing data
              ...data,

              publishedAt: new Date().toISOString(), // ✅ force publish
            },
          }
        );

        return this.transformResponse(updatedEntry);
      } catch (err) {
        strapi.log.error("Lake visit update error:", err);
        return ctx.internalServerError("Update failed");
      }
    },
  })
);
