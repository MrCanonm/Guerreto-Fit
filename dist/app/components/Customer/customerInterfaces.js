"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MembershipStatus = exports.CustomerType = void 0;
var CustomerType;
(function (CustomerType) {
    CustomerType["MEMBRESIA"] = "MEMBRESIA";
    CustomerType["PASE_DIARIO"] = "PASE_DIARIO";
})(CustomerType || (exports.CustomerType = CustomerType = {}));
var MembershipStatus;
(function (MembershipStatus) {
    MembershipStatus["ACTIVO"] = "ACTIVO";
    MembershipStatus["CANCELADO"] = "CANCELADO";
    MembershipStatus["PENDIENTE"] = "PENDIENTE";
})(MembershipStatus || (exports.MembershipStatus = MembershipStatus = {}));
