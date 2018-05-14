import React from "react"
import { createComponent,customMap } from "redux-form-antd"
import Attachable from "../components/Attachable"

const attachableMap = customMap((mapProps, { input: { onChange } }) => ({
  ...mapProps,
  onChange: (files) => {
    let ids = files.map( file => file.attachment && file.attachment.id )
    console.log("files",files,"ids",ids)
    onChange(ids)
  }
}));

const AttachableField = createComponent(Attachable, attachableMap);
export default AttachableField
