- 重定向不再采用redirect, 转为返回jsonify(status=302, location=${url})
- 修改所有静态页面的链接, 具体请查看static文件夹结构
- 弃用materialize的导航条, 改为"src/example.html"的导航条
- 重新修改layout, 舍弃原有"layout_*", 改为在layouts文件夹下定义sideBar,
navBar, footerBar, 并由defaultLayout include, 其他页面只需要
```html
{% extends "../layouts/defaultLayout" %}
{% block content %}
//具体内容
{% endblock %}
```
- 在相关页面写表单post之后处理函数, 例如form#loginForm, 则定义
```html
<script>
function loginFormHandler(result) {
  //处理逻辑
}
</script>
```
