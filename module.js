'use strict';

var Wlist = require('wlist');

module.exports = function () {

    var menuObj = {};

    return {
        putMenu: function (name, weight) {
            if (!menuObj.menus) {
                menuObj.menus = new Wlist();
            }

            var submenu = {
                name: name
            };

            return menuObj.menus.put(submenu, name, weight);
        },
        getSubMenu: function (submenu) {
            return menuObj.menus && menuObj.menus.get(submenu);
        },
        putItem: function (submenu, name, obj, weight) {
            if (arguments.length === 2 || (arguments.length === 3 && !isNaN(arguments[2]))) {
                weight = arguments[2];
                obj = arguments[1];
                name = arguments[0];
                submenu = null;
            }

            var menu = submenu ? this.getSubMenu(submenu) : menuObj;

            if (!menu) {
                return -1;
            }

            if (!menu.items) {
                menu.items = new Wlist();
            }

            return menu.items.put(obj, name, weight);
        },
        get: function () {
            var menu = {};
            menu.items = menuObj.items && menuObj.items.get();

            var submenus = menuObj.menus && menuObj.menus.get();
            if (submenus) {
                menu.menus = [];
                submenus.forEach(function (submenu) {
                    var submenuObj = {name: submenu.name};
                    menu.menus.push(submenuObj);

                    var subitems = submenu.items && submenu.items.get();
                    if (subitems) {
                        submenuObj.items = [];
                        subitems.forEach(function (item) {
                            submenuObj.items.push(item);
                        });
                    }
                });
            }

            return menu;
        }
    };
};