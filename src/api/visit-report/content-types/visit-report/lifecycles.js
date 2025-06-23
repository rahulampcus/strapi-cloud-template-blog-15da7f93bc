"use strict";

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    if (global.io) {
      global.io.emit("visit-report-created", result);
    }
    console.log("Visit Report created:", result.id);
  },

  async afterUpdate(event) {
    const { result } = event;
    if (global.io) {
      global.io.emit("visit-report-updated", result);
    }
    console.log("Visit Report updated:", result.id);
  },

  async afterDelete(event) {
    const { result } = event;
    if (global.io) {
      global.io.emit("visit-report-deleted", result);
    }
    console.log("Visit Report deleted:", result.id);
  },
};
