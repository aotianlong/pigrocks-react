import React from "react"
import { createComponent,customMap } from "redux-form-antd"
import { Mention } from "antd"

const mentionMap = customMap((mapProps, { input: { onChange } }) => ({
  ...mapProps,
  onChange: (value) => {
    onChange(value)
  }
}));

const MentionField = createComponent(Mention, mentionMap);
export default MentionField
