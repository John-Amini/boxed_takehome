"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = exports.removeNullOrUndefined = void 0;
function removeNullOrUndefined(update) {
    for (const key in update) {
        if (update[key] === null || update[key] === undefined) {
            delete update[key];
        }
    }
    return update;
}
exports.removeNullOrUndefined = removeNullOrUndefined;
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
exports.getErrorMessage = getErrorMessage;
//# sourceMappingURL=utils.js.map