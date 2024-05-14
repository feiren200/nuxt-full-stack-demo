```
// 返回302重定向
await sendRedirect(event, '/', 302)
```

```
// 自定义http错误码
throw createError({ statusCode: 401, message: '请登录' })
// 默认500错误码
throw createError(error)
```
