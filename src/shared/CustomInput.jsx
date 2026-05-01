const CustomInput = ({ type, value, onChange, label, options, checked }) => {
  const renderInput = () => {
    const commonProps = {
      value: value,
      onChange: onChange,
      className: "m-[10px] border p-2 rounded",
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
            className="m-2.5"
          />
        );

      case "radio":
        return (
          <input
            type="radio"
            checked={Boolean(value === true || checked)}
            onChange={() => onChange(value)}
            className="m-2.5 w-4 h-4 text-blue-600 focus:ring-blue-500"
          />
        );

      default:
        return (
          <input
            type={type}
            {...commonProps}
            value={type === "file" ? "" : value}
          />
        );
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="font-semibold">{label}</label>
      {renderInput()}
    </div>
  );
};

export default CustomInput;
