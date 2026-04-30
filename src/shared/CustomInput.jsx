const CustomInput = ({ type, value, onChange, label, options }) => {
  const renderInput = () => {
    const commonProps = {
      value: value,
      onChange: onChange,
    };

    switch (type) {
      case "textarea":
        return <textarea {...commonProps} />;

      case "select":
        return (
          <select {...commonProps}>
            {options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(e.target.checked)}
          />
        );

      case "radio":
        return (
          <input
            type="radio"
            checked={value === true}
            onChange={() => onChange({ target: { value: true } })}
          />
        );

      default:
        return <input type={type} {...commonProps} />;
    }
  };

  return (
    <div style={{margin: "20px"}}>
      <label>{label} </label>
      {renderInput()}
    </div>
  );
};

export default CustomInput;
