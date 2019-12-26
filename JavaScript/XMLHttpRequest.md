### XMLHttpRequest

1. 新建
* 在现代的浏览器上，你可以使用下面的代码创建一个新的 XMLHttpRequest 对象：
```js
let request = new XMLHttpRequest()
```

* 如果你需要支持 Internet Explorer 6 和更老的浏览器，你需要像下方所示扩展你的代码：
```js
let request;
if (window.XMLHttpRequest) {
    //Firefox、 Opera、 IE7 和其它浏览器使用本地 JavaScript 对象
    request = new XMLHttpRequest();
} else {
    //IE 5 和 IE 6 使用 ActiveX 控件
    request = new ActiveXObject("Microsoft.XMLHTTP");
}
```

2. 基本使用

```js
// 1.新建xhr对象，设置请求方法和请求URL
let xhr= new XMLHttpRequest(),
    method = "GET",
    url = "http://localhost/getBrandReportFile";

// 2. 方法初始化一个请求。
xhr.open(method, url, true);

// 3. 添加状态监听方法
xhr.onreadystatechange = function () {
  if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    console.log(xhr.responseText);
  }
}

// 3. 发送 HTTP 请求
xhr.send();
```

3. 常用属性
   1. readyState  属性返回一个 XMLHttpRequest  代理当前所处的状态
   
        |值|状态| 描述
        |--|--|--
        |0|UNSENT|代理被创建，但尚未调用 open() 方法。
        |1|OPENED|open() 方法已经被调用。
        |2|HEADERS_RECEIVED|send() 方法已经被调用，并且头部和状态已经可获得。
        |3|LOADING|下载中；responseText 属性已经包含部分数据。
        |4|DONE|下载操作已完成。

        * 注：值判断可以同步相应状态判断。如 XMLHttpRequest.DONE = 4
   2. status 返回了XMLHttpRequest 响应中的数字状态码。
   3. onreadystatechange 只要 readyState 属性发生变化，就会调用相应的处理函数. 
       1. 这个方法不该用于同步的requests对象
       2. 当一个 XMLHttpRequest 请求被 abort() 方法取消时，其对应的 readystatechange 事件不会被触发。
   4. responseText 在一个请求被发送后，从服务器端返回文本。
   5. response 属性返回响应的正文。返回的类型可以是 ArrayBuffer 、 Blob 、 Document 、 JavaScript Object 或 DOMString 。 这取决于 responseType 属性。
   6. timeout 是一个无符号长整型数，代表着一个请求在被自动终止前所消耗的毫秒数。默认值为 0，意味着没有超时。
      * 注： 在IE中，超时属性可能只能在调用 open() 方法之后且在调用 send() 方法之前设置。
      ```js
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/server', true);

        xhr.timeout = 2000; // 超时时间，单位是毫秒

        xhr.onload = function () {
        // 请求完成。在此进行处理。
        };

        xhr.ontimeout = function (e) {
        // XMLHttpRequest 超时。在此做某事。
        };

        xhr.send(null);
      ```
4. 常用方法
   1. abort() 取消请求。
        ```js
        xhr.abort()
        ```
   2. getAllResponseHeaders() 方法返回所有的响应头。
   3. getResponseHeader() 方法返回包含指定头文本的字符串。
        ```js
            xhr.getResponseHeader("Content-Type")
        ```
   4. open()  方法初始化一个请求
   5. setRequestHeader() 是设置HTTP请求头部的方法。此方法必须在  open() 方法和 send()   之间调用。如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。
5. 事件
   1. readystatechange 属性汇总的 onreadystatechange 可以改为
        ```js
            xhr.addEventListener('readystatechange', fn);
        ```
   2. abort 取消时触发
   3. error 
   4. load 当一个XMLHttpRequest请求完成的时候会触发load 事件。
   5. loadend loadend事件总是在一个资源的加载进度停止之后被触发 (例如，在已经触发“error”，“abort”或“load”事件之后)。
   6. loadstart 当程序开始加载时，loadstart 事件将被触发。
   7. progress 进度事件会被触发用来指示一个操作正在进行中。处理上传或下载进度
   8. timeout 当进度由于预定时间到期而终止时，会触发timeout 事件。
   9. 抄来的例子
        ```html
            <div class="controls">
                <input class="xhr success" type="button" name="xhr" value="Click to start XHR (success)" />
                <input class="xhr error" type="button" name="xhr" value="Click to start XHR (error)" />
                <input class="xhr abort" type="button" name="xhr" value="Click to start XHR (abort)" />
            </div>

            <textarea readonly class="event-log"></textarea>
        ```

        ```js
            const xhrButtonSuccess = document.querySelector('.xhr.success');
            const xhrButtonError = document.querySelector('.xhr.error');
            const xhrButtonAbort = document.querySelector('.xhr.abort');
            const log = document.querySelector('.event-log');

            function handleEvent(e) {
                log.textContent = log.textContent + `${e.type}: ${e.loaded} bytes transferred\n`;
            }

            function addListeners(xhr) {
                xhr.addEventListener('loadstart', handleEvent);
                xhr.addEventListener('load', handleEvent);
                xhr.addEventListener('loadend', handleEvent);
                xhr.addEventListener('progress', handleEvent);
                xhr.addEventListener('error', handleEvent);
                xhr.addEventListener('abort', handleEvent);
            }

            function runXHR(url) {
                log.textContent = '';

                const xhr = new XMLHttpRequest();
                addListeners(xhr);
                xhr.open("GET", url);
                xhr.send();
                return xhr;  
            }

            xhrButtonSuccess.addEventListener('click', () => {
                runXHR('https://mdn.mozillademos.org/files/16553/DgsZYJNXcAIPwzy.jpg');
            });

            xhrButtonError.addEventListener('click', () => {
                runXHR('https://somewhere.org/i-dont-exist');
            });

            xhrButtonAbort.addEventListener('click', () => {
                runXHR('https://mdn.mozillademos.org/files/16553/DgsZYJNXcAIPwzy.jpg').abort();
            });
        ```


[参考链接](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)