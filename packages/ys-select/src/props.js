let props = {
  selectValue: [String, Number, Array],
  selectOptions: {
    type: Object,
    default: () => {
      return {
        valueKey: 'value',
        labelKey: 'label',
        option: []
      }
    }
  }
}


export default props;