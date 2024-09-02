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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
exports.PATCH = PATCH;
var server_1 = require("next/server");
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function GET(request_1, _a) {
    return __awaiter(this, arguments, void 0, function (request, _b) {
        var id, customer, error_1;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = params.id;
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, prisma.customer.findUnique({
                            where: { id: Number(id) },
                        })];
                case 2:
                    customer = _c.sent();
                    if (!customer) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Customer not found" }, { status: 404 })];
                    }
                    return [2 /*return*/, server_1.NextResponse.json(customer, { status: 200 })];
                case 3:
                    error_1 = _c.sent();
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Error fetching customer" }, { status: 500 })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function PATCH(request_1, _a) {
    return __awaiter(this, arguments, void 0, function (request, _b) {
        var id, body, name_1, sureName, email, phone, customerType, membership, dailyPasses, customer, updatedCustomer, membershipId, startDate, endDate, price, status_1, error_2;
        var params = _b.params;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = params.id;
                    console.log("PATCH request received");
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 9, , 10]);
                    return [4 /*yield*/, request.json()];
                case 2:
                    body = _c.sent();
                    name_1 = body.name, sureName = body.sureName, email = body.email, phone = body.phone, customerType = body.customerType, membership = body.membership, dailyPasses = body.dailyPasses;
                    return [4 /*yield*/, prisma.customer.findUnique({
                            where: { id: Number(id) },
                            include: { memberships: true }, // Incluye todas las membresías asociadas
                        })];
                case 3:
                    customer = _c.sent();
                    if (!customer) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Customer not found" }, { status: 404 })];
                    }
                    return [4 /*yield*/, prisma.customer.update({
                            where: { id: Number(id) },
                            data: {
                                name: name_1,
                                sureName: sureName,
                                email: email,
                                phone: phone,
                                customerType: customerType,
                            },
                        })];
                case 4:
                    updatedCustomer = _c.sent();
                    if (!membership) return [3 /*break*/, 8];
                    membershipId = membership.id, startDate = membership.startDate, endDate = membership.endDate, price = membership.price, status_1 = membership.status;
                    if (!(customer.memberships.length > 0)) return [3 /*break*/, 8];
                    if (!membershipId) return [3 /*break*/, 6];
                    return [4 /*yield*/, prisma.membership.update({
                            where: { id: membershipId },
                            data: {
                                startDate: new Date(startDate),
                                endDate: new Date(endDate),
                                price: parseFloat(price),
                                status: status_1,
                            },
                        })];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 8];
                case 6: 
                // Si no se proporciona un ID específico, podrías decidir actualizar la primera membresía o manejarlo de otra manera
                return [4 /*yield*/, prisma.membership.update({
                        where: { id: customer.memberships[0].id },
                        data: {
                            startDate: new Date(startDate),
                            endDate: new Date(endDate),
                            price: parseFloat(price),
                            status: status_1,
                        },
                    })];
                case 7:
                    // Si no se proporciona un ID específico, podrías decidir actualizar la primera membresía o manejarlo de otra manera
                    _c.sent();
                    _c.label = 8;
                case 8: return [2 /*return*/, server_1.NextResponse.json(updatedCustomer, { status: 200 })];
                case 9:
                    error_2 = _c.sent();
                    console.error("Error updating customer and membership:", error_2);
                    return [2 /*return*/, server_1.NextResponse.json({ error: "Error updating customer and membership" }, { status: 500 })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
