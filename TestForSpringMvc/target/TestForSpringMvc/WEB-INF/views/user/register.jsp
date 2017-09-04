<%@page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"  %>

<html>
    <head>
        <title>新增用户</title>
    </head>
<body>
<form method="post" action="/user/register.html">
<table>
    <tr>
        <td>用户名:</td>
        <td><input type="text" name="userName" ></td>
    </tr>
    <tr>
        <td>密码:</td>
        <td><input type="text" name="password"></td>
    </tr>
    <tr>
        <td>姓名:</td>
        <td><input type="text" name="realName"></td>
    </tr>
    <tr>
        <td colspan="2"><input type="submit" name="提交"></td>
    </tr>
</table>
</form>

</body>
</html>