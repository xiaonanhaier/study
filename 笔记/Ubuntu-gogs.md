### ubuntu 搭建 Gogs git 仓库
---
1. 安装git
   ```
    apt-get install Git
   ```
2. 安装mysql [【安装mysql的方法】](./ubuntu-mysql.md)
3. 下载安装
   ```
    // 下载
    wget https://dl.gogs.io/0.11.91/gogs_0.11.91_linux_amd64.tar.gz
    // 解压
    tar zxvf gogs_0.11.91_linux_amd64.tar.gz
   ```
4. 初始化数据库
   ```
    $ cd gogs/scripts
    $ mysql -u root -p < mysql.sql
   ```
5. 创建 MySQL 用户与数据库
   ```
    sudo mysql -u root -p
    mysql> create user 'gogs'@'localhost' identified by  '<pwd>';
    mysql> grant all privileges on gogs.* to  'gogs'@'localhost';
    mysql> flush privileges;
    mysql> exit;
   ```
6. 运行 Gogs 并配置参数
   ```
    cd gogs/
    chmod +x gogs
    ./gogs web
   ```
    现在再打开浏览器访问 http://<IP>:3000 并按网页说明配置即可。

7. 遇到的一些问题
   > 运行系统用户非当前用户:git -> ..
   
   解决办法： 配置界面填写当前登录的系统用户

   > 应用配置保存失败：open /home/git/gogs/custom/conf/app.ini: no such file or directory

   解决办法：权限不足
