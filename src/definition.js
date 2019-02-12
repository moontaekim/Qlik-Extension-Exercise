export default {
  type: "items",
  component: "accordion",
  items: {
    dimensions: {
      uses: "dimensions",
      min: 1,
      max: 1
    },
    measures: {
      uses: "measures",
      min: 2,
      max: 2
    },
    sorting: {
      uses: "sorting"
    },
    settings: {
      uses: "settings",
      items: {
        colorFillOne: {
          type: "string",
          ref: "colorFillOne",
          label: "Fill Color Meausure One"
        },
        colorFillTwo: {
          type: "string",
          ref: "colorFillTwo",
          label: "Fill Color Meausure Two"
        }
      }
    }
  }
};
