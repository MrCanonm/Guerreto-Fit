"use strict";
"use client";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var customer_1 = require("@/services/customer");
var react_1 = require("react");
var DataTable_1 = require("@/app/components/Common/dataTable/DataTable");
var Dropdown_1 = require("@/app/components/Common/dataTable/Dropdown");
var fa_1 = require("react-icons/fa");
var button_1 = require("@/components/ui/button");
var Notification_1 = require("../components/Common/Notification");
var Modal_1 = __importDefault(require("../components/Common/Modal"));
var EditCustomerForm_1 = __importDefault(require("../components/Customer/EditCustomerForm"));
var fomartValue_1 = require("../components/utils/fomartValue");
var DailyPassCustomerPage = function () {
    var _a = (0, customer_1.useCustomerService)(), customers = _a.data, loading = _a.loading, error = _a.error, getAllDailyPasses = _a.getAllDailyPasses, updateCustomer = _a.updateCustomer;
    var _b = (0, react_1.useState)(false), editModalIsOpen = _b[0], setEditModalIsOpen = _b[1];
    var _c = (0, react_1.useState)(null), currentCustomer = _c[0], setCurrentCustomer = _c[1];
    var _d = (0, Notification_1.useNotification)(), showSuccess = _d.showSuccess, showError = _d.showError, showLoading = _d.showLoading, dismiss = _d.dismiss;
    (0, react_1.useEffect)(function () {
        getAllDailyPasses();
    }, []);
    var handleModalClose = function () {
        setEditModalIsOpen(false);
        setCurrentCustomer(null);
    };
    var onSubmit = function (formData) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    showLoading("Procesando", { id: "loading" });
                    if (!(editModalIsOpen && currentCustomer)) return [3 /*break*/, 2];
                    return [4 /*yield*/, updateCustomer(currentCustomer.id, formData)];
                case 1:
                    _a.sent();
                    showSuccess("Éxito!", {
                        description: "Se ha actualizado el cliente ".concat(formData.name),
                    });
                    setEditModalIsOpen(false);
                    _a.label = 2;
                case 2: return [4 /*yield*/, getAllDailyPasses()];
                case 3:
                    _a.sent(); // Re-cargar clientes después de la actualización
                    dismiss("loading");
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.error("Failed to submit form:", error_1);
                    showError("Operación fallida!", {
                        description: "Error al tratar de procesar el cliente ".concat(formData.name, ", intentalo m\u00E1s tarde"),
                    });
                    dismiss("loading");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleEditCustomer = function (customer) {
        setCurrentCustomer(customer);
        setEditModalIsOpen(true);
    };
    var columns = [
        { accessorKey: "name", header: "Nombre" },
        { accessorKey: "sureName", header: "Apellido" },
        { accessorKey: "email", header: "Correo" },
        { accessorKey: "phone", header: "Cell/Tel" },
        { accessorKey: "customerType", header: "Pase Diario" },
        {
            accessorKey: "dailyPass.accessDate",
            header: "Fecha",
            cell: function (_a) {
                var row = _a.row;
                var dailyPass = row.original.dailyPass;
                return dailyPass
                    ? new Date(dailyPass.accessDate).toLocaleString()
                    : "N/A";
            },
        },
        {
            accessorKey: "dailyPass.price",
            header: "Valor",
            cell: function (_a) {
                var row = _a.row;
                var dailyPass = row.original.dailyPass;
                return dailyPass ? fomartValue_1.formatter.format(dailyPass.price) : "N/A";
            },
        },
        {
            id: "actions",
            header: "Acciones",
            cell: function (_a) {
                var row = _a.row;
                return (<Dropdown_1.Dropdown>
          <Dropdown_1.DropdownTrigger asChild>
            <button_1.Button className="flex w-8 h-8 p-0" variant="ghost">
              <fa_1.FaEllipsisH className="w-4 h-4"/>
              <span className="sr-only">Acciones</span>
            </button_1.Button>
          </Dropdown_1.DropdownTrigger>
          <Dropdown_1.DropdownContainer>
            <Dropdown_1.DropdownItem onClick={function () { return handleEditCustomer(row.original); }}>
              Editar
            </Dropdown_1.DropdownItem>
          </Dropdown_1.DropdownContainer>
        </Dropdown_1.Dropdown>);
            },
        },
    ];
    return (<div>
      <div className="w-full flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-700">
          Clientes con Membresía
        </h1>
      </div>

      <hr className="my-4"/>

      <DataTable_1.DataTable columns={columns} data={customers || []}/>

      <Modal_1.default isOpen={editModalIsOpen} onClose={handleModalClose}>
        <EditCustomerForm_1.default initialData={currentCustomer} onSubmit={onSubmit}/>
      </Modal_1.default>
    </div>);
};
exports.default = DailyPassCustomerPage;
