- 重定向不再采用redirect, 转为返回jsonify(status=302, location=${url})
- 在相关页面写表单post之后处理函数, 例如form#loginForm, 则
```html
<script>
function loginFormHandler(result) {
  //处理逻辑
}
</script>
```
