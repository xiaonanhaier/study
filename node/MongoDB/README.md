## node使用MongoDB
> MONGODB NODE.JS DRIVER 3.1

### 连接数据库



### 查询条件

1. $lt (即<)
2. $gt (即>)
3. $gte (即>=)
4. $lte (即<=)
5. $ne (即!=)
6. $in 
7. $nin


### 配置文件开启权限验证
```
security:
   authorization: enabled
```


### 链接数据库遇到的问题
1. current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
