import React, { useEffect, useState } from "react";

export default function UpdateInputs(props) {
  const [fields, setFields] = useState({
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
  });
  function hanldeInputChange(event) {
    const { value, name } = event.target;
    // tip: never mutate state just make copy  ;)
    const { field1, field2, field3 } = { ...fields };
    let currentState = { field1, field2, field3 };

    switch (name) {
      case "min":
        field1[name] = value;
        break;
      case "max":
        field1[name] = value;
        break;
      case "options":
        field2[name] = value;
        break;
      case "exists":
        field2[name] = value;
        break;
      case "loading":
        field2[name] = value;
        break;
      case "values":
        field1[name] = value;
        break;
      case "empty":
        field1[name] = value;
        break;
      default:
        break;
    }
    currentState = { field1, field2, field3 };
    console.log(currentState);
    setFields(currentState);
  }

  return (
    <div>
      <h1>Input Fun</h1>
      <input
        name="min"
        placeholder="min"
        type="number"
        value={fields.field1["min"] || ""}
        // this could be more dynamic with name being passed with event obj
        onChange={e => hanldeInputChange(e)}
      />
    </div>
  );
}
