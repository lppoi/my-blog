---
title: 'dayjs自定义时间解析插件使用'
description: '使用dayjs官方插件增强时间解析的灵活性'
pubDate: '2024-10-06'
---

#### 场景：项目里的表单使用到了时分格式的时间选择器，从接口数据format到表单数据。

1. 使用moment的format正常
2. 使用dayjs的format导致转换后时间为NaN，导致setFieldsValue时报错。

#### 阅读官网的文档后发现有一个官方插件是用于拓展dayjs的format自定义时间格式。
插件名：CustomParseFormat

```javascript
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

// 使用
dayjs('12:21', 'HH:mm') // 不使用插件 M2{$H:NaN,$m:NaN,...}

dayjs.extend(customParseFormat)
dayjs('12:21', 'HH:mm') //使用插件 M2{$H:12,$m:21,...}

```