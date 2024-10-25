# holiday-cn

## 中国节假日数据 API

&emsp;&emsp;底层数据来源于 https://github.com/NateScarlet/holiday-cn 每一年的 json 文件，有效年份为 2007 ~ 当前年份，每年快结束时会更新新一年的节假日数据。

## 使用方式

https://holiday-cn.liuxianyu.cn/api/holiday?date=2024-04-05

### 参数（请求示例）:

-   date: 日期查询，日期值会被 `dayjs` 解析，所以值需要是能被 `new Date()` 解析的日期格式
    -   [date=2024-04-07](https://holiday-cn.liuxianyu.cn/api/holiday?date=2024-04-05) 查询具体日期
    -   [date=2024-04-01,2024-04-05](https://holiday-cn.liuxianyu.cn/api/holiday?date=2024-04-01~2024-04-05) 查询日期段，以 `~` 连接两个日期查询日期段
    -   [date=2024-04-03,2024-04-05](https://holiday-cn.liuxianyu.cn/api/holiday?date=2024-04-01,2024-04-03,2024-04-05) 数组批量查询，以 `,` 英文逗号连接，查询多个日期
    -   [date 为空](https://holiday-cn.liuxianyu.cn/api/holiday) 查询今日

### 返回值:

```js
{
    "code": 200,
    "data": [
        {
            "isWeekend": true, // 是周末
            "isWeekday": false, // 是周一至周五
            "isWeekendButWork": false, // 是周末但工作
            "isWeekdayButRest": false, // 是周一至周五但休息
            "desc": "清明节", // 日期描述
            "date": "2024-04-06" // 查询的日期
        }
    ]
}
```

-   isWeekday: boolean 是否为工作日
-   isWeekdayButRest: boolean 是否为工作日且休息
-   isWeekend: boolean 是否为周末
-   isWeekendButWork: boolean 是否为周末但上班

## 项目开发

使用 `yarn` 进行包管理

```sh
git clone https://github.com/liuxy0551/holiday-cn.git
cd holiday-cn
yarn
```

### 开发

```sh
yarn dev
```

浏览器访问: http://localhost:9000/api/holiday

### 部署

&emsp;&emsp;本服务通过阿里云的函数计算部署，属于 Serverless 的一种实现，具体可点击 https://www.aliyun.com/product/fc 查看。项目下的 `s.yaml` 为部署的配置文件，部署工具为 [Serverless Devs](https://help.aliyun.com/zh/fc/developer-reference/serverless-devs/)。

## 注意事项

-   年份是按照国务院文件标题年份而不是日期年份，12 月份的日期可能会被下一年的文件影响，因此应检查两个文件。

-   `与周末连休` 的周末不是法定节假日，数据里不会包含，见[《全国年节及纪念日放假办法》](https://www.gov.cn/gongbao/content/2014/content_2561284.htm) [#213](https://github.com/NateScarlet/holiday-cn/issues/213#issuecomment-1869546011) [#221](https://github.com/NateScarlet/holiday-cn/issues/221)

-   任何第三方服务都可能故障或停止服务，如果稳定性要求高请自行搭建静态文件服务，也可以通过发布 npm 包的方式使用。
