"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNotification = void 0;
// src/app/components/Common/Notification.tsx
var sonner_1 = require("sonner");
var useNotification = function () {
    var showSuccess = function (message, options) {
        sonner_1.toast.success(message, options);
    };
    var showError = function (message, options) {
        sonner_1.toast.error(message, options);
    };
    var showWarning = function (message, options) {
        sonner_1.toast.warning(message, options);
    };
    var showInfo = function (message, options) {
        sonner_1.toast.info(message, options);
    };
    var showLoading = function (message, options) {
        sonner_1.toast.loading(message, options);
    };
    var dismiss = function (id) {
        sonner_1.toast.dismiss(id);
    };
    return { showSuccess: showSuccess, showError: showError, showWarning: showWarning, showInfo: showInfo, showLoading: showLoading, dismiss: dismiss };
};
exports.useNotification = useNotification;
