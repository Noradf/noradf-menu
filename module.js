'use strict';

var Wlist = require('wlist'),
    util = require('util');

module.exports = function () {

    function Menu(id, object) {
        this.id = id;
        this.object = object;

        Object.defineProperty(this, '_items', {
            enumerable: false,
            configurable: true,
            writable: true
        });

        Object.defineProperty(this, 'type', {
            enumerable: true,
            configurable: true,
            get: function () {
                return 'menu';
            }
        });

        Object.defineProperty(this, 'items', {
            get: function() {
                return (this._items && this._items.get()) || [];
            },
            enumerable: true
        });
    }

    function Item(id, object) {
        Menu.call(this, id, object);

        Object.defineProperty(this, 'type', {
            enumerable: true,
            get: function () {
                return 'item';
            }
        });
    }

    util.inherits(Item, Menu);

    Menu.prototype.putMenu = function (id, object, weight) {
        if (!this._items) {
            this._items = new Wlist();
        }

        var submenu = new Menu(id, object);

        this._items.put(submenu, id, weight);
        return submenu;
    };

    Menu.prototype.putItem = function (menuId, id, object, weight) {
        if (arguments.length === 2 || (arguments.length === 3 && !isNaN(arguments[2]))) {
            weight = arguments[2];
            object = arguments[1];
            id = arguments[0];
            menuId = null;
        }

        var menu = (menuId && this.get(menuId)) || this;

        if (!menu) {
            return -1;
        }

        if (!(menu instanceof Menu)) {
            return -2;
        }

        if (!menu._items) {
            menu._items = new Wlist();
        }

        var item = new Item(id, object);
        return menu._items.put(item, id, weight);
    };

    Menu.prototype.get = function (id) {
        return id && this._items && this._items.get(id);
    };

    var root = new Menu('root');
    return root;
};