"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_hook_form_1 = require("react-hook-form");
var customerInterfaces_1 = require("./customerInterfaces");
var Dropdown_1 = __importDefault(require("../Common/Dropdown"));
var CustomButton_1 = __importDefault(require("../Common/CustomButton"));
var CreateCustomerForm = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var onSubmit = _a.onSubmit;
    var _m = (0, react_hook_form_1.useForm)(), register = _m.register, handleSubmit = _m.handleSubmit, reset = _m.reset, control = _m.control, errors = _m.formState.errors;
    var _o = (0, react_1.useState)(null), selectedCustomerType = _o[0], setSelectedCustomerType = _o[1];
    var handleCancel = function () {
        reset();
        setSelectedCustomerType(null);
    };
    var handleCustomerTypeChange = function (type) {
        setSelectedCustomerType(type);
    };
    return (<div>
      <h1 className="text-xl font-bold mb-8 text-gray-600">Nuevo cliente</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">Nombre</label>
          <input type="text" className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500" {...register("name", {
        required: "Este campo es requerido",
    })}/>
          {errors.name && (<span className="text-red-600">{errors.name.message}</span>)}
        </div>

        <div>
          <label className="block">Apellido</label>
          <input className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500" {...register("sureName")} type="text"/>
        </div>

        <div>
          <label className="block">Tipo de Pago</label>
          <react_hook_form_1.Controller control={control} name="customerType" rules={{ required: "Este campo es requerido" }} render={function (_a) {
            var field = _a.field;
            return (<Dropdown_1.default options={[customerInterfaces_1.CustomerType.MEMBRESIA, customerInterfaces_1.CustomerType.PASE_DIARIO]} onSelect={function (type) {
                    field.onChange(type);
                    handleCustomerTypeChange(type);
                }} placeholder="Select Payment Type"/>);
        }}/>
          {errors.customerType && (<span className="text-red-600">{errors.customerType.message}</span>)}
        </div>

        {/* Renderiza el formulario adicional basado en el tipo de cliente seleccionado */}
        {selectedCustomerType === customerInterfaces_1.CustomerType.MEMBRESIA && (<>
            <div>
              <label className="block">Estado</label>
              <react_hook_form_1.Controller control={control} name="membership.status" rules={{ required: "Este campo es requerido" }} render={function (_a) {
                var field = _a.field;
                return (<Dropdown_1.default options={[
                        customerInterfaces_1.MembershipStatus.ACTIVO,
                        customerInterfaces_1.MembershipStatus.CANCELADO,
                        customerInterfaces_1.MembershipStatus.PENDIENTE,
                    ]} onSelect={function (type) {
                        field.onChange(type);
                    }} placeholder="Select Payment Type"/>);
            }}/>
              {((_b = errors.membership) === null || _b === void 0 ? void 0 : _b.status) && (<span className="text-red-600">
                  {errors.membership.status.message}
                </span>)}
            </div>

            <div>
              <label className="block">Correo</label>
              <input className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500" {...register("membership.email", {})} type="text"/>
              {((_c = errors.membership) === null || _c === void 0 ? void 0 : _c.email) && (<span className="text-red-600">
                  {(_d = errors.membership) === null || _d === void 0 ? void 0 : _d.email.message}
                </span>)}
            </div>

            <div>
              <label className="block">Telefono</label>
              <input className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500" {...register("membership.phone", {})} type="text"/>
              {((_e = errors.membership) === null || _e === void 0 ? void 0 : _e.phone) && (<span className="text-red-600">
                  {(_f = errors.membership) === null || _f === void 0 ? void 0 : _f.phone.message}
                </span>)}
            </div>

            <div>
              <label className="block">Fecha de Inicio</label>
              <input type="datetime-local" className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500" {...register("membership.startDate", {
            required: "Este campo es requerido",
        })}/>
              {((_g = errors.membership) === null || _g === void 0 ? void 0 : _g.startDate) && (<span className="text-red-600">
                  {errors.membership.startDate.message}
                </span>)}
            </div>

            <div>
              <label className="block">Fecha de Fin</label>
              <input type="datetime-local" className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500" {...register("membership.endDate", {
            required: "Este campo es requerido",
        })}/>
              {((_h = errors.membership) === null || _h === void 0 ? void 0 : _h.endDate) && (<span className="text-red-600">
                  {errors.membership.endDate.message}
                </span>)}
            </div>

            <div>
              <label className="block">Precio</label>
              <input type="number" className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500" {...register("membership.price", {
            required: "Este campo es requerido",
            min: { value: 0, message: "Debe ser un valor positivo" },
        })}/>
              {((_j = errors.membership) === null || _j === void 0 ? void 0 : _j.price) && (<span className="text-red-600">
                  {errors.membership.price.message}
                </span>)}
            </div>
          </>)}

        {selectedCustomerType === customerInterfaces_1.CustomerType.PASE_DIARIO && (<>
            <div>
              <label className="block">Fecha</label>
              <input type="datetime-local" className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500" {...register("dailyPass.accessDate", {
            required: "Este campo es requerido",
        })}/>
              {((_k = errors.dailyPass) === null || _k === void 0 ? void 0 : _k.accessDate) && (<span className="text-red-600">
                  {errors.dailyPass.accessDate.message}
                </span>)}
            </div>

            <div>
              <label className="block">Precio del Pase Diario</label>
              <input type="number" className="w-full p-2 border border-gray-300 focus:outline-none focus:border-blue-500" {...register("dailyPass.price", {
            required: "Este campo es requerido",
            min: { value: 0, message: "Debe ser un valor positivo" },
        })}/>
              {((_l = errors.dailyPass) === null || _l === void 0 ? void 0 : _l.price) && (<span className="text-red-600">
                  {errors.dailyPass.price.message}
                </span>)}
            </div>
          </>)}

        <div className="col-span-2 flex justify-end space-x-4">
          <CustomButton_1.default onClick={handleCancel} variant="secondary" color="red">
            Cancelar
          </CustomButton_1.default>

          <CustomButton_1.default onClick={handleSubmit(onSubmit)} variant="primary">
            Enviar
          </CustomButton_1.default>
        </div>
      </form>
    </div>);
};
exports.default = CreateCustomerForm;
