import React from "react"
import { createComponent,customMap } from "redux-form-antd"
import { Cascader } from "antd"

const cascaderMap = customMap((mapProps, { input: { onChange } }) => ({
  ...mapProps,
  onChange: (value) => {
    onChange(value)
  }
}));

const CascaderField = createComponent(Cascader, cascaderMap);
export default CascaderField
