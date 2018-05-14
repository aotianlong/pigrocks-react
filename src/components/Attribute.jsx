import React from "react"
import { Row,Col } from "antd"
import { Markdown } from "react-showdown"
import styles from "./Attribute.scss"

export default function main(props){
  let { name,value,markdown } = props
  if(markdown){
    value = <Markdown markup={value} />
  }
  return (
    <Row gutter={10} className={styles.attribute}>
      <Col span={6} className={styles.attributeName}>{name}</Col>
      <Col span={18} className={styles.attributeValue}>{value}</Col>
    </Row>
  )
}
