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

4. 数据库导出备份

mongodump命令脚本语法如下：

>mongodump -h dbhost -d dbname -o dbdirectory

-h：

MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017
-d：

需要备份的数据库实例，例如：test
-o：

备份的数据存放位置，例如：c:\data\dump，当然该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个test目录，这个目录里面存放该数据库实例的备份数据。

-c 
表名

-u

用户名

-p

密码


--authenticationDatabase

验证的库表


> mongodump -h localhost -d article -o ~/Documents/tmp/ -u=root -p=123456 --authenticationDatabase admin

导入

>mongorestore -d blog D:\data -u=root -p123456 --authenticationDatabase admin


5. 删库
> db.dropDatabase()

6. 删表
> db.collection.drop() 
### 链接数据库遇到的问题
1. current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
