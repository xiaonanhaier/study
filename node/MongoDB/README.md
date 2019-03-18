## node使用MongoDB
> MONGODB NODE.JS DRIVER 3.1

### 连接数据库

1. 连接远程数据库
   mongo 192.168.0.15:27017

### 查询条件

1. $lt (即<)
2. $gt (即>)
3. $gte (即>=)
4. $lte (即<=)
5. $ne (即!=)
6. $in 
7. $nin


### 配置文件设置
1. 开启权限验证
```
security:
   authorization: enabled
```

2. 配置用户名密码
```
// 选择admin
> use admin
switched to db admin

// 创建用户
> db.createUser({user: 'root', pwd: 'root', roles: ['root']})
Successfully added user: { "user" : "root", "roles" : [ "root" ] }

// 验证用户
> db.auth('root', 'root')
>1
```


3. 允许远程访问
```
net:
   ...
   bindIp: 0.0.0.0
```


### 链接数据库遇到的问题
1. current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
