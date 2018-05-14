import TimeAgo from "react-timeago"
import chineseStrings from 'react-timeago/lib/language-strings/zh-CN'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import React from "react"
import { Tooltip } from "antd"
import dateFormat from "dateformat"
dateFormat.i18n = {
    dayNames: [
        '周日', '周一', '周二', '周三', '周四', '周五', '周六',
        '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
    ],
    monthNames: [
        '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',
        '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
    ],
    timeNames: [
      '上午', '下午',
      '上午', '下午',
      '上午', '下午',
      '上午', '下午'
    ]
};


const formatter = buildFormatter(chineseStrings)
let main = (props)=>{
  let { date } = props
  let oDate = new Date(date)
  let formattedDate = dateFormat(oDate,"default")
  return <Tooltip title={formattedDate}><TimeAgo {...props} formatter={formatter} className="time-ago" title=""/></Tooltip>
}
export default main;
