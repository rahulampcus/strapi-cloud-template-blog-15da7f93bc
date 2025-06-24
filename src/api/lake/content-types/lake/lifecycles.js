"use strict";

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    if (global.io) {
      global.io.emit("lake-created", result);
    }
    console.log("✅ Lake created:", result.id);
  },

  async afterUpdate(event) {
    const { result } = event;
    if (global.io) {
      global.io.emit("lake-updated", result);
    }
    console.log("✅ Lake updated:", result.id);
  },

  async afterDelete(event) {
    const { result } = event;
    if (global.io) {
      global.io.emit("lake-deleted", result);
    }
    console.log("🗑️ Lake deleted:", result.id);
  },
};
