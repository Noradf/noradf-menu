# Norad Framework Menus module

# Usage

You can inject the module in your module.json file

```javascript

'use strict';

module.exports = function (menu) {

    menu.putMenu('My Menu');
    menu.putItem('My Menu', 'item-name', {href: 'page.html', name: 'Item name'}, 0);
};

```

Then you can get the menu object in your route file

```javascript

'use strict';

module.exports = function (app, assets, menu) {

    app.get('/', function (req, res) {
        res.render('views/index', {
            assets: assets.get(),
            menu: menu.get()
        });
    });

};

```

And use it for rendering it in your html file

```html
<div class="collapse navbar-collapse">
    <ul class="nav navbar-nav">
        {% for submenu in menu.menus %}
        <li class="dropdown">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ submenu.name }} <span class="caret"></span></a>
            <ul class="dropdown-menu">
                {% for item in submenu.items %}
                <li><a href="{{item.href}}">{{item.name}}</a></li>
                {% endfor %}
            </ul>
        </li>
        {% endfor %}
    </ul>
</div>
```

# TODO

- Sub menus in menus