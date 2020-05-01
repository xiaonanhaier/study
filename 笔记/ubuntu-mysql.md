1. 安装 MySql
```
$ sudo apt update
$ sudo apt install mysql-server
```
接下来便会开始安装MySQL，但这里不会提示设置密码或进行任何其他配置更改。
2. 配置 MySql
配置MySQL初始设置：
```
$ sudo mysql_secure_installation
```
报错了
> Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock'

解决办法：
```
// 暂停服务
sudo service mysql stop
// 启动服务
sudo service mysql start
```

重新运行命令 sudo **mysql_secure_installation**
```
sudo mysql_secure_installation

Securing the MySQL server deployment.

Connecting to MySQL using a blank password.

VALIDATE PASSWORD PLUGIN can be used to test passwords
and improve security. It checks the strength of password
and allows the users to set only those passwords which are
secure enough. Would you like to setup VALIDATE PASSWORD plugin?

Press y|Y for Yes, any other key for No: N <--要安装验证密码插件吗？
Please set the password for root here.

New password: <--设置Root密码

Re-enter new password: <--设置Root密码
By default, a MySQL installation has an anonymous user,
allowing anyone to log into MySQL without having to have
a user account created for them. This is intended only for
testing, and to make the installation go a bit smoother.
You should remove them before moving into a production
environment.

Remove anonymous users? (Press y|Y for Yes, any other key for No) : N  <--是否删除匿名用户？

 ... skipping.


Normally, root should only be allowed to connect from
'localhost'. This ensures that someone cannot guess at
the root password from the network.

Disallow root login remotely? (Press y|Y for Yes, any other key for No) : y <--是否允许Root远程登录？
Success.

By default, MySQL comes with a database named 'test' that
anyone can access. This is also intended only for testing,
and should be removed before moving into a production
environment.


Remove test database and access to it? (Press y|Y for Yes, any other key for No) : y  <--是否删除测试数据库？
 - Dropping test database...
Success.

 - Removing privileges on test database...
Success.

Reloading the privilege tables will ensure that all changes
made so far will take effect immediately.
重新加载特权表将确保所有更改
到目前为止所作的规定将立即生效。

Reload privilege tables now? (Press y|Y for Yes, any other key for No) : y <--是否刷新权限？
Success.
```

3. 配置远程访问（目前没用到，未验证
> MySQL不允许远程用户访问主机服务器 1130连接报错：ERROR 1130: Host ... is not allowed to connect to this MySQL server 说明所连接的用户帐号没有远程连接的权限，只能在本机(localhost)登录。 需更改 mysql 数据库里的user表里的host项把localhost改称%。

具体步骤：
```
mysql> use mysql 
mysql> update user set host='%' where user = 'root';
mysql> select host from user where user = 'root'; 
+-------------------------+
| host                    |
+-------------------------+
| %                       |
| 127.0.0.1               |
| ::1                     |
| izm5edi5djftntq1oes7sfz |
+-------------------------+
```
