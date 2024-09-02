"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownLabel = exports.DropdownGroup = exports.DropdownSeparator = exports.DropdownTrigger = exports.Dropdown = exports.DropdownItem = exports.DropdownContainer = void 0;
var utils_1 = require("@/lib/utils");
var DropdownMenu_1 = require("./DropdownMenu");
var DropdownContainer = function (_a) {
    var children = _a.children, className = _a.className, label = _a.label;
    return (<DropdownMenu_1.DropdownMenuContent className={(0, utils_1.cn)(className)} align="end">
      {label && (<>
          <DropdownMenu_1.DropdownMenuLabel>{label}</DropdownMenu_1.DropdownMenuLabel>
          <DropdownMenu_1.DropdownMenuSeparator />
        </>)}
      {children}
    </DropdownMenu_1.DropdownMenuContent>);
};
exports.DropdownContainer = DropdownContainer;
var DropdownItem = function (_a) {
    var children = _a.children, shortcut = _a.shortcut, onClick = _a.onClick, className = _a.className;
    return (<DropdownMenu_1.DropdownMenuGroup>
      <DropdownMenu_1.DropdownMenuItem className={(0, utils_1.cn)(className)} onClick={onClick}>
        {children}
        {shortcut && <DropdownMenu_1.DropdownMenuShortcut>{shortcut}</DropdownMenu_1.DropdownMenuShortcut>}
      </DropdownMenu_1.DropdownMenuItem>
    </DropdownMenu_1.DropdownMenuGroup>);
};
exports.DropdownItem = DropdownItem;
var DropdownTrigger = DropdownMenu_1.DropdownMenuTrigger;
exports.DropdownTrigger = DropdownTrigger;
var Dropdown = DropdownMenu_1.DropdownMenu;
exports.Dropdown = Dropdown;
var DropdownSeparator = DropdownMenu_1.DropdownMenuSeparator;
exports.DropdownSeparator = DropdownSeparator;
var DropdownGroup = DropdownMenu_1.DropdownMenuGroup;
exports.DropdownGroup = DropdownGroup;
var DropdownLabel = DropdownMenu_1.DropdownMenuLabel;
exports.DropdownLabel = DropdownLabel;
