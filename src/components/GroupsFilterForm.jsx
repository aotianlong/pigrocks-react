import React from "react"
import { connect } from "dva"
import { reduxForm } from "redux-form"
import { Form,Input,Button } from "antd"
import { TextField,HiddenField,TextAreaField } from "redux-form-antd"
import Field from "./Field"




let GroupsFilterForm = (props)=>{

  let { handleSubmit,error,submitting,dispatch } = props


  let handleSearchSubmit = (values)=>{
    console.log("values",values)
    dispatch({type: "groups/browse",q:values})
  }

  return (
    <Form onSubmit={handleSubmit(handleSearchSubmit)}>
      <Field component={TextField} name="name_cont" label="名称"/>
      <Field submit>
        <Button type="primary" disabled={submitting} onClick={handleSubmit(handleSearchSubmit)}>搜索</Button>
      </Field>
    </Form>
  )
}

GroupsFilterForm = reduxForm(
  {
    form: "groupsFilter",
    enableReinitialize: true
  }
)(GroupsFilterForm)

GroupsFilterForm = connect(
  (state)=>{
    return {
      initialValues: state.groups.filterForm
    }
  }
)(GroupsFilterForm)

export default GroupsFilterForm;
