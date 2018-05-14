import React from "react"
import { Cascader } from "antd"
import { createComponent,customMap } from "redux-form-antd"
import Location from "../resources/Location"

class LocationField extends React.Component{

  state = {
    options: [],
    defaultValue: []
  }

  location2option(location){
    let { children } = location
    if(children){
      children = children.map( child => this.location2option(child) )
    }
    return {
      isLeaf: !location['has_children'],
      label: location.name,
      value: location.id,
      children: children
    }
  }

  componentDidMount(){
    // 获取地区数据
    let { locations,value } = this.props
    if(locations){
      let options = locations.map( location => this.location2option(location) )
      console.log("options",options,"value",value)
      this.setState({options})
    } else {
      Location.findAll({q: {at_depth: 0}}).then( locations => {
        console.log("locations",locations)
        let options = locations.map( location => this.location2option(location) )
        this.setState({options})
      })
    }
  }

  loadData = (selectedOptions)=>{
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true
    Location.findAll({q: {children_of: targetOption.value}}).then( locations =>{
      targetOption.loading = false
      let options = locations.map( location => this.location2option(location) )
      targetOption.children = options
      this.setState({options: [...this.state.options]})
    } )
  }

  render(){
    let { onChange,value } = this.props
    let { options } = this.state
    let loadData = this.loadData
    return <Cascader defaultValue={value} options={options} onChange={onChange} loadData={loadData} changeOnSelect placeholder="请选择" />
  }
}

const locationMap = customMap((mapProps, { input: { onChange } }) => ({
  ...mapProps,
  onChange: (value) => {
    onChange(value)
  }
}));

LocationField = createComponent(LocationField, locationMap);
export default LocationField
