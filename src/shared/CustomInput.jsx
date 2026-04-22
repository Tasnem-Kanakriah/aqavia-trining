const CustomInput = ({ type, value, onChange, label, options }) => {
  if (type === "textarea") {
    return (
      <div>
        <label>{label} </label>
        <textarea
          style={{ margin: "10px" }}
          value={value}
          onChange={onChange}
        />
      </div>
    ); 
  } else if (type === "select") {
    return (
      <div>
        <label>{label} </label>
        <select style={{ margin: "10px" }} onChange={onChange} value={value}>
          {options.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    );
  } else if (type === "checkbox") {
    return (
      <div>
        <label>{label} </label>
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange( event.target.checked )}
        />
      </div>
    );
  } else if (type === "radio") {
    return (
      <div>
        <label>{label} </label>
        <input
          type="radio"
          checked={value === true}
          onChange={() => onChange({ target: { value: true } })}
        />
      </div>
    );
  } else {
    return (
      <div>
        <label>{label} </label>
        <input
          style={{ margin: "10px" }}
          type={type}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }
};

export default CustomInput;
