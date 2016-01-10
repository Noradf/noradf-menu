# Norad Framework Menus module

# API Documentation

`putMenu(id, object, weight)`

- id: Menu id
- object: An object you can use to store anything and you can retrieve later
- weight: Used to order the menu. Greater weight goes last

````javascript
menu.putMenu('mymenu', {text: 'My menu', icon: 'fa fa-dashboard'}, 1);
`````

Returns the menu created

`putItem(menuId, id, object, weight)`

- menuId: [optional] If passed, search for the menu with id menuId
- id: Item id
- object: An object you can use to store anything and you can retrieve later
- weight: Used to order the item. Greater weight goes last

````javascript
menu.putItem('myoption', {href: '#', text: 'My option'}, 2);
`````

Returns -1 if there is no menu with menuId. Returns -2 if item with menuId is not a Menu. Returns the length of the menu items after the item is added

`get(id)`

- id: Id to search

````javascript
menu.get('mymenu');
`````

Returns the menu if exists

# Usage

You can inject the module in your module.json file

```javascript

'use strict';

module.exports = function (menu) {

    var myMenu = menu.putMenu('mymenu', {text: 'My menu', icon: 'fa fa-dashboard'}, 1);
    myMenu.putItem('mymenu-option', {href: '#', text: 'My menu option'}, 1);
    
    menu.putItem('myoption', {href: '#', text: 'My option'}, 2);
};

```

Then you can get the menu object in your route file

```javascript

'use strict';

module.exports = function (app, assets, menu) {

    app.get('/', function (req, res) {
        res.render('views/index', {
            assets: assets.get(),
            menu: menu
        });
    });
};

```

And use it for rendering it in your html file

```html
<div class="collapse navbar-collapse">
    <ul class="nav navbar-nav">
        {% for item in menu.items %}
        <li class="dropdown">
            {% if item.items && item.items.length > 0 %}
            <a href="{{item.object.href}}" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ item.object.text }} <span class="caret"></span></a>
            {% else %}
            <a href="{{item.object.href}}" role="button">{{ item.object.text }}</a>
            {% endif %}
            {% if item.items && item.items.length > 0 %}
            <ul class="dropdown-menu">
                {% for subtiem in submenu.items %}
                <li><a href="{{subtiem.object.href}}">{{subitem.object.name}}</a></li>
                {% endfor %}
            </ul>
            {% endif %}
        </li>
        {% endfor %}
    </ul>
</div>
```