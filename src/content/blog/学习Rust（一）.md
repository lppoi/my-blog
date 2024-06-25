---
title: '学习Rust（一）'
description: 'Rust的数据类型学习'
pubDate: '2024-5-20'
---

# 字符串

>  - 我发现Rust字符串跟我JavaScript的差别好大！！不能用一个语言的思维去学所有语言。
>- `String` 是一个 `Vec<u8>` 的封装，不是一个真的字符串！
1. 创建一个字符串
```rust
`String::new`用来创建空字符串实例，没有参数
let mut s =String::new();

`String::from`用来创建字符串实例，使用&str类型当作参数
let mut ss=String::from("我是rust");
// 等价
let mut ss="我是rust".to_string();

我看编辑器返回的类型都一样，所以说日常使用里面想用哪个用哪个。
```
2. 常用的字符串操作
```rust
// 返回字符串长度
ss.len(); // 10 
// 返回字符串是否为空
ss.is_empyt(); // false
// 字符串转成字节值
ss.into_bytes(); // [230, 136, 145, 230, 152, 175, 114, 117, 115, 116, 229, 164, 169, 228, 184, 139, 230, 151, 160, 230, 149, 140]
// 小写
ss.to_lowercase(); // 我是rust
// 大写
ss.to_uppercase();// 我是RUST
// 返回删除了前后空格的字符串片
ss.trim();// 我是rust

// 字符串片解析为其他类型
let num:u32 = "22".parse().unwarp();

// 追加字符串 接收一个&str类型
ss.push_str("天下无敌"); // 我是rust天下无敌

// 文字占用了3个字节，所以会报错，使用字母的时候正常
// 假如ss值为rust
ss.insert_str(1,"天下无敌"); // r天下无敌ust



// 匹配是否包含参数值
ss.contains("r") // true
// 匹配开头是否包含参数值
ss.start_with("我") // true
// 匹配开头是否包含参数值
ss.end_with("t") // true
// 匹配字节的索引值
ss.find("r") // Some(6)
// 字符串替换
ss.replace("rust", "c++") // 我是c++
```

# 数值

## 整形
> **有无符号**的区别是能否为**负值**
> - 可能为负数的值用**有符号**的类型
> - 永远是正数的值用**无符号**的类型

|  长度  |  有符号  |  无符号  |
| :--: | :---: | :---: |
|  8   |  i8   |  u8   |
|  16  |  i16  |  u16  |
|  32  |  i32  |  u32  |
|  64  |  i64  |  u64  |
| 128  | i128  | u128  |
| arch | isize | usize |

## 浮点型
`f32`和`f64`
rust默认浮点类型为****f64**

## 一些简单运算及自带方法

```rust
let sum = 99 + 1; // 100

let difference = 100 - 1; // 99

let multip = 4 * 30; // 120

let div = 6 / 3; // 2

let truncated = -6 / 3; // -2

let remainder = 43 % 5; // 3

// 绝对值
(-10i32).abs(); // 10
// 绝对差值
(-10i32).abs_diff(5); // 15

```
# 布尔

跟其他语言没什么区别

# 元组
> 使用场景
> 1. 函数的参数传递
> 2. 返回值类型


```rust
let tuple = (5, "Rust", true);
// 访问
let number = tuple.0; // 5

let student_tuple = ("RR", 100);

fn tuple_match((name,score):(&str,u32))-> String{
	match score{
		90..=100 => format!("在{}课程中表现出色，成绩为{}，优秀！",
		80..=89 => format!("在{}课程中表现良好，成绩为{}，良好！", course_name, score),
		70..=79 => format!("在{}课程中表现一般，成绩为{}，及格！", course_name, score),
		_ => format!("在{}课程中需要努力，成绩为{}，不及格。", course_name, score),
	}
}
tuple_match(student_tuple) // RR在课程中表现出色，成绩为100，优秀！
```

# 数组
## Array
> 1. 固定长度的元素集合，且类型需统一。
> 2. 不支持新增，删除操作。
```rust
let mut numbers: [i32; 5] = [1, 2, 3, 4, 5];
// 访问数组元素
println!("第一个元素: {}", numbers[0]);
println!("最后一个元素: {}", numbers[4]);
// 修改数组中的元素
numbers[2] = 20;
println!("修改后的第三个元素: {}", numbers[2]);
// 遍历数组
for elem in numbers.iter() {
    println!("{}", elem);
}
// 使用数组字面量创建数组
let array_literal: [i32; 6] = [0; 6];
println!("使用字面量初始化的数组: {:?}", array_literal);
```
## Vec
> 1. 动态大小的元素集合
> 2. 支持新增，删除操作。

```rust
let mut vec: Vec<i32> = Vec::new();
vec.push(1);
vec.push(2);
vec.push(3);
// 等价
let mut vec = vec![1,2,3];
// 等价
let mut vec = Vec::from([1, 2, 3]);

vec.len(); // 2
// 弹出末尾元素值
vec.pop(); // Some(2)
// 新增
vec.push(99); // [1,2,3,99]
// 根据索引删除值
vec.remove(0); // [2,3]
// 匹配值
vec.contains(&3); // true
// 排序
vec!["hello", "world"].join(" "); // hello world
vec.sort(); // [1,2,3]
// 切片，返回对切片元素的迭代器
let mut chunks= vec.chunks(2);
chunks.next().unwrap(); // &[1,2]
chunks.next().unwrap(); // &[3]



// 访问
println!("第一个元素: {}", vec[0]);
println!("最后一个元素: {}", vec[2]);
// 遍历
for i in vec{
    println!("使用字面量初始化的数组: {}", i);
}
```