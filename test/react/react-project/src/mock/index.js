import Mock from 'mockjs';

Mock.mock(/\.json/, 'get', {
    'subjects|10-15':[{
      'alt': "https://movie.douban.com/subject/24753477/",
      'genres':["动作", "科幻", "冒险"],
      'id' : "24753477",
      'images' : "https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2497756471.jpg",
      'large': "https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2497756471.jpg",
      'medium': "https://img3.doubanio.com/view/movie_poster_cover/spst/public/p2497756471.jpg",
      'title':"蜘蛛侠：英雄归来",
      'year': "2017"
    }]
})
