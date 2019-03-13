import Mock from 'mockjs';
Mock.mock('http://www.xxx.banner', 'get', {
 "img":[
   {
     "id":"@id",
     "imgurl":'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2408076297,711561034&fm=173&s=2F915D81124D395D94745C210300F0C0&w=640&h=332&img.JPEG'
   },
   {
     "id":"@id",
     "imgurl":'http://cms-bucket.nosdn.127.net/catchpic/6/6d/6db6367688469ea1525d1c6a70f315bb.jpg?imageView&thumbnail=550x0'
   },
   {
     "id":"@id",
     "imgurl":'http://cms-bucket.nosdn.127.net/catchpic/0/0e/0e69db7464410908e3c8bad8340ad2df.jpg?imageView&thumbnail=550x0'
   }
 ]
})
