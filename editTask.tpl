<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>New Note</title>

    <link href="style.css" rel="stylesheet" type="text/css">
</head>
<body>
<h1>New Note</h1>
    <form method="post">
        <input type="text" id="name" name="name" required value="{{ name }}"><label for="name">Name</label>
        <input type="text" id="tag" name="tag" required value="{{ tag }}"><label for="tag">Tag</label>
        <br/>
        <input type="submit" value="OK">
    </form>
</body>
</html>