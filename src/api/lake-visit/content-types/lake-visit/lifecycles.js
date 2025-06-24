"use strict";

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    if (global.io) {
      global.io.emit("lake-visit-created", result);
    }
    console.log("✅ Lake Visit created:", result.id);
  },

  async afterUpdate(event) {
    const { result } = event;
    if (global.io) {
      global.io.emit("lake-visit-updated", result);
    }
    console.log("✅ Lake Visit updated:", result.id);
  },

  async afterDelete(event) {
    const { result } = event;
    if (global.io) {
      global.io.emit("lake-visit-deleted", result);
    }
    console.log("🗑️ Lake Visit deleted:", result.id);
  },
};
