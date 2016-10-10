<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>TODO-List</title>
    <link href="style.css" rel="stylesheet" type="text/css">
</head>
<body>
    <h1>TODO-List</h1>
    {% if not user %}
        <form method="get" action="/login">
            <button>Войти</button>
        </form>
    {% else %}
        {{ user }}
        <form method="get" action="/logout">
            <button>Выйти</button>
        </form>
    {% endif %}

    <ul>
        {% for task in tasks %}
        <li>
            {{ task.name }} <br />
            Tag: {{ task.tag }} <br />
            Author: {{ task.author }}
            {% if task.author == user %}
            <form method="get" action="delete">
                <button value={{task.id}} name="delete">Удалить</button>
            </form>
            <form method="get" action="update">
                <button value={{task.id}} name="update">Изменить</button>
            </form>
            {% endif %}
            <hr>
        </li>

        {% endfor %}
    </ul>



    {% if user %}
    <form action="new_note" method="get">
        <input type="submit" value="Добавить">
    </form>
    {% endif %}

</body>
</html>