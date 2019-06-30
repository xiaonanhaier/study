##### 1，hasOwnProperty()

hasOwnProperty() 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性，不包含继承的属性

> obj.hasOwnProperty(prop)

- 参数
prop 要检测的属性  字符串 名称或者 Symbol。

- 返回值
用来判断某个对象是否含有指定的属性的 Boolean 。

- 其他
 hasOwnProperty 是严格限制于可枚举项目的（如同 Object.getOwnPropertyNames()）

- 和 in 区别
和 in 运算符不同，该方法会忽略掉那些从原型链上继承到的属性。

````js
o = new Object();
o.prop = 'exists';
o.hasOwnProperty('prop');             // 返回 true
o.hasOwnProperty('toString');         // 返回 false
o.hasOwnProperty('hasOwnProperty');   // 返回 false
````

 ##### 2，in

如果指定的属性在指定的对象或其原型链中，则in 运算符返回true

> prop in object

- 参数
    * prop  一个字符串类型或者 symbol 类型的属性名或者数组索引（非symbol类型将会强制转为字符串）。
    * objectName 检查它（或其原型链）是否包含具有指定名称的属性的对象。

````js

// 数组
var trees = new Array("redwood", "bay", "cedar", "oak", "maple");
0 in trees        // 返回true
3 in trees        // 返回true
6 in trees        // 返回false
"bay" in trees    // 返回false (必须使用索引号,而不是数组元素的值)

"length" in trees // 返回true (length是一个数组属性)

Symbol.iterator in trees // 返回true (数组可迭代，只在ES2015+上有效)


// 内置对象"PI" in Math          // 返回true

// 自定义对象
var mycar = {make: "Honda", model: "Accord", year: 1998};
"make" in mycar  // 返回true
"model" in mycar // 返回true
````

- 注意
in 右操作数必须是一个对象值。例如，你可以指定使用String构造函数创建的字符串，但不能指定字符串文字。
````js
var color1 = new String("green");
"length" in color1 // 返回true
var color2 = "coral";
"length" in color2 // 报错(color2不是对象)
````
