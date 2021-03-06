'use strict';

let CommandProcessor = function(logger, menu) {
    this.processCommand = function(command, cb) {
        let commArray = command.split(' ');
        let moreToProcess = true;
        let subMenu = menu;
        do {
            let menuElement = subMenu[commArray.shift()];
            if (!menuElement) {
                moreToProcess = false;
            } else {
                subMenu = menuElement;
                if (!menuElement.submenu) {
                    moreToProcess = false;
                } else {
                    subMenu = menuElement.submenu;
                }
            }
        } while (moreToProcess);
        cb(subMenu.command, commArray);
    };

    this.buildHelp = function() {
        return new Promise((resolve, reject) => {
            let help = '';
            let baseCommand = '';
            JSON.stringify(menu, function(key, value) {
                if (key && key != 'command' && key != 'description' && key != 'submenu' && key != 'end') {
                    if (!value.submenu) {
                        help += `<b>${baseCommand + ' ' + key}</b>: ${value.description} </br>`;
                    } else {
                        baseCommand += key && ` ${key}`;
                    }
                } else if (key === 'end') {
                    baseCommand = '';
                }
                return value;
            });
            resolve(help);
        });
    };
};
