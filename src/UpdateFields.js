const fields = {
  field1: {
    min: undefined,
    max: undefined
  },
  field2: {
    options: ["All"],
    exists: undefined,
    loading: undefined
  },
  field3: {
    values: [],
    empty: true
  }
};

const updateFields = (event, stateName, field, type) => {
  //  event.target.value
  const { field1, field2, field3 } = { ...fields };
  // const currentState = field1;
  const { value } = event.target;
  // this.setState({}) or the case of hooks setFields
  switch (stateName) {
    case "min":
      field1[stateName] = value;
      break;
    case "max":
      break;
    case "options":
      break;
    case "exists":
      break;
    case "loading":
      break;
    case "values":
      break;
    case "empty":
      break;
    default:
      break;
  }
  console.log(fields);
};

/* 
 event.target.value would go as the first argument = user input - typed/or clicked (radio/dropdown)
  <input
    name="number"
    placeholder="Phone..."
    type="number"
    onChange={e => updateFileds(24, "min", "field1")}
    onFocus={not super applicale with info given}
    onBlur={not super applicale with info given }
  />

*/
// - Never mutating state
// update field1
const event = { value: { target: 24 } };
updateFields(24, "min", "field1");
updateFields(24, "min", "field1");

// update field2
updateFields(["hamburger", "fries", "no mayo"], "options", "field2");
updateFields(false, "exists", false);
updateFields(true, "loading", true);

// update field3
updateFields(["react", "css", "python"], "values", "field3");
updateFields(true, "empty", "field3");
