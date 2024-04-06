const express = require("express");
const dayjs = require("dayjs");
const dataList = require("./data");

const app = express();
const port = 9000;

const getResultList = (dateStr) => {
    if (dateStr?.includes(",")) {
        // 多个日期
        return dateStr.split(",").map(getResult);
    } else if (dateStr?.includes("~")) {
        //日期范围
        const dates = dateStr.split("~");
        return Array(dayjs(dates[1]).diff(dates[0], "day") + 1)
            .fill("")
            .map((_, index) => getResult(dayjs(dates[0]).add(index, "day").format("YYYY-MM-DD")));
    } else if (dateStr) {
        // 单个日期
        return getResult(dateStr);
    } else {
        // 默认是今日
        return getResult(dayjs().format("YYYY-MM-DD"));
    }
};

const getResult = (value) => {
    const day = dayjs(value);
    const date = day.format("YYYY-MM-DD");
    const isWeekend = [0, 6].includes(day.day());
    const isWeekday = !isWeekend;
    const _day = dataList[`_${day.format("YYYY")}`]?.days.find((i) => i.date === date);
    const isWeekendButWork = isWeekend && !!_day && !_day.isOffDay;
    const isWeekdayButRest = isWeekday && !!_day && _day.isOffDay;

    return {
        isWeekend,
        isWeekday,
        isWeekendButWork,
        isWeekdayButRest,
        desc: _day ? (_day.isOffDay ? _day.name : `${_day.name}调班`) : isWeekend ? "周末" : "工作日",
        date: _day?.date || date,
    };
};

app.get("/api/holiday", (req, res) => {
    const result = getResultList(req.query?.date);
    res.send({ code: 200, data: Array.isArray(result) ? result : [result] });
});

app.get("/*", (req, res) => {
    res.send({ repository: "https://github.com/liuxy0551/holiday-cn", message: "欢迎 star" });
});

app.listen(port, () => {
    console.log(`holiday-cn listening on port ${port}`);
});
