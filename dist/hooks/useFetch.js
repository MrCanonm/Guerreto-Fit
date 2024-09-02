"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = void 0;
var react_1 = require("react");
var useFetch = function (defaultData) {
    if (defaultData === void 0) { defaultData = null; }
    var _a = (0, react_1.useState)(defaultData), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(""), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(false), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(null), message = _d[0], setMessage = _d[1];
    var executeFetch = function (endpoint_1) {
        var args_1 = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args_1[_i - 1] = arguments[_i];
        }
        return __awaiter(void 0, __spreadArray([endpoint_1], args_1, true), void 0, function (endpoint, method, bodyData, errorMessage, successMessage) {
            var response, responseJson, extractedText, result, error_1;
            var _a, _b, _c;
            if (method === void 0) { method = "GET"; }
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        setLoading(true);
                        setMessage(null);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 6, 7, 8]);
                        return [4 /*yield*/, fetch(endpoint, {
                                method: method,
                                headers: bodyData instanceof FormData
                                    ? // No Content-Type header for FormData
                                        {}
                                    : {
                                        "Content-Type": "application/json",
                                    },
                                body: bodyData instanceof FormData
                                    ? bodyData
                                    : bodyData
                                        ? JSON.stringify(bodyData)
                                        : null,
                                credentials: "include",
                            })];
                    case 2:
                        response = _d.sent();
                        if (!!response.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, response.json()];
                    case 3:
                        responseJson = _d.sent();
                        extractedText = (responseJson === null || responseJson === void 0 ? void 0 : responseJson.message) || "Error";
                        errorMessage = extractedText;
                        throw new Error(extractedText);
                    case 4: return [4 /*yield*/, response.json()];
                    case 5:
                        result = _d.sent();
                        setData(result);
                        if (method !== "GET") {
                            if (((_c = (_b = (_a = result === null || result === void 0 ? void 0 : result.result) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.rejected) === null || _c === void 0 ? void 0 : _c.length) > 0) {
                            }
                        }
                        return [2 /*return*/, result];
                    case 6:
                        error_1 = _d.sent();
                        if (error_1 instanceof Error) {
                            setError(error_1.message);
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return { data: data, error: error, loading: loading, message: message, executeFetch: executeFetch };
};
exports.useFetch = useFetch;
