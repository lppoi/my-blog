---
title: QTNND的烧脑原型链
pubDate: '2023-06-07'
description: 该篇博客介绍JS中我对个人对于原型链的理解
---
## 😍原型链介绍

### 原型对象

> 说个简单的开头
>
> **JS中`万物都基于对象`** 
>
> - 函数的`prototype`指向原型对象
> - 原型对象的`constructor`指向函数
> - 原型对象上定义的**属性**和**方法**可以被所有与之关联的实例对象**共享**和**继承**
> - `prototype`是**函数独有的**
> - `__proto__`属性，它是**对象所独有的**

1. JS创建函数的时候，都会生成一个`prototype`属性，这个属性指向了一个对象，这个对象就是该函数的原型对象，

该对象中包含一个`constructor`属性，该属性指向的是该函数。

​	2. 声明该函数的实例对象，该对象实现了一个`__proto__`属性，指向该`实例对象(ha)`的`原型对象({constructor:f})`，因此我们可以把函数的`prototype`和实例对象的`__proto__` 进行对等比较，结果当然就是`true`啦

```javascript
// 创建一个名为Ha的函数
function Ha(){
    this.name='哈喇'
}
// 调用下Ha的prototype
Ha.prototype //{constructor:f}

// 声明一个实例对象
let ha = new Ha()
// 原型对象比较
ha.__proto__ === Ha.prototype // true
// 构造函数可直接通过ha.constructor调用
ha.__proto__.constructor === ha.constructor
```

### 原型链

原型链很简单 看以下代码就懂了

```javascript
ha.__proto__.__proto__.__proto__ // null
// 在此解释下为什么是null
ha.__proto__时指向了Ha的原型对象
ha.__proto__.__proto__时指向了Ha的原型对象Object的原型对象
ha.__proto__.__proto__.__proto__时，万物都基于对象了，那你说Object上层的原型对象还存在吗？当然不存在了，所以返回null
```

```javascript
// 构造函数继承
function Haha(name){
    this.name=name
    Ha.call(this)
}

// 先声明一个Haha类的实例，调用实例的name属性，打印的值是Ha中name属性的值，,因为使用了继承所以，当前实例构造函数中不存在的属性，他就会自己再往上层去查找Ha的构造函数的name属性，如果存在则打印，如果不存在，则会继续往上找到Object的构造函数的name属性，依然不存在就是null了
let haha = new Haha()
haha.name // 哈喇

// 先声明一个Haha类的实例并传参，调用实例的name属性，打印的值就是王老五了
let haha = new Haha('王老五')
haha.name // 王老五

```

## 构造函数、实例和原型的关系

> 构造函数是用来构造实例的函数。每个实例都有一个原型,原型又指向构造函数的原型

```javascript
// ha的原型是Ha.prototype
// Ha.prototype的原型是  Object.prototype
function Ha(){} // 构造函数
let ha=new Ha() // 实例

Ha.prototype.constructor === Ha //true 构造函数原型的constructor指向构造函数本身
```



## 继承

### 构造函数继承

> 使用call()将Parent的this指向Child的实例,实现继承。
> 优点
>
> 1. 创建实例时可以向父类构造函数传参。
> 2. 每个字类实例都有一份自己的父类实例，修改父类实例属性不会影响其他继承同一父类的子类。
>
> 缺点
>
> 1. 只继承父类构造函数中的属性和方法,无法继承原型对象上的内容。
> 1. 无法复用

```javascript
function Parent(){
    this.name='father'
}

Parent.prototype.sayHello = function () {
    return this.name
}

function Children(){
    Parent.call(this)
}
const c = new Children()
c.name // father
c.sayHello // c.sayHello is not a function
```
### 原型链继承

> 重写原型对象
>
> 优点
>
> 1. 函数复用，子类可使用父类属性和方法。
> 2. 子类可直接方问父类原型对象上的属性方法。
>
> 缺点
>
> 1. 无法向父类构造函数传参。
> 2. 父类引用属性会共享到所有子类，一个子类修改了引用属性，其他子类也会受影响，因为操作的是同一个内存地址。
> 3. 父类私有变量会在子类中暴露。

```javascript
function Parent(){
    this.name='father'
    this.hobby = ['唱', '跳']
}
Parent.prototype.sayHello = function(){
    return this.name
}
function Children(){}
Children.prototype = new Parent()
const c = new Children()
const c2 = new Children()
c.name // father
c.sayHello() // father
c.hobby.push('rap')
c.hobby // ['唱', '跳', 'rap']
c2.hobby // ['唱', '跳', 'rap']
```

### 组合继承

> 构造函数+原型链
>
> 优点
>
> 1. 继承父类实例属性和原型对象的所有属性方法（私有除外）
> 2. 避免了引用类型的属性被所有实例共享问题（原型链继承）。
>
> 缺点
>
> 1. 调用两次父类实例，性能影响



```javascript
function Parent(){
    this.name='father'
}
Parent.prototype.sayHello = function(){
    return this.name
}
function Children(){
    Parent.call(this)
}
Children.prototype = new Parent()
Children.prototype.constructor = Children
const c = new Children()
c.name // father
c.sayHello() // father
```
### 寄生式继承

> 原型式继承+增强对象
>
> 优点
>
> 1. 继承父类实例属性和原型对象的所有属性方法（私有除外）
> 2. 避免了引用类型的属性被所有实例共享问题（原型链继承）。
>
> 缺点
>
> 1. 调用两次父类实例，性能影响



```javascript
function Parent(){
    this.name='father'
}
Parent.prototype.sayHello = function(){
    return this.name
}
function Children(){
    Parent.call(this)
}
Children.prototype = new Parent()
Children.prototype.constructor = Children
const c = new Children()
c.name // father
c.sayHello() // father
```

### 寄生式继承

> 子类的构造函数中，增强父类实例的功能
>
> 优点
>
> 1. 避免了引用类型的属性被所有实例共享问题（原型链继承）。
>
> 缺点
>
> 1. 无法实现函数复用，每个子类内部都实例化了父类。
> 2. 能访问到父类私有变量，其实就是子类里塞了父类实例。

```javascript
function Parent() {
    this.name = 'father'
    this.hobby = ['唱', '跳']
}

Parent.prototype.sayHello = function () {
    return this.name
}

function Children() {
    let parent = new Parent()
    parent.sayBye = function Bye() {
        return this
    }
    return parent
}
const c = new Children()
console.log(c.sayHello());

```

### 寄生组合式继承

> 子类的构造函数中，增强父类实例的功能
>
> 优点
>
> 1. 避免了引用类型的属性被所有实例共享问题（原型链继承）。
> 1. 只调用了一次Parent构造函数
>
> 缺点
>
> 1. 无法实现函数复用，每个子类内部都实例化了父类。
> 2. 能访问到父类私有变量，其实就是子类里塞了父类实例。

```java
function _extends(children, parent) {
    let parent_prototype = Object.create(parent.prototype)
    parent_prototype.constructor = children
    children.prototype = parent_prototype
}
function Parent() {
    this.name = 'father'
    this.hobby = ['唱', '跳']
}
Parent.prototype.sayHello = function () {
    return this.name
}
function Children() {
    Parent.call(this)
}

_extends(Children, Parent)
const c = new Children()
console.log(c.sayHello()) // father
```
