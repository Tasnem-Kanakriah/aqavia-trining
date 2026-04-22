import { useState } from "react";
import CustomInput from "../src/shared/CustomInput"

const inputs = [
  { name: "firstName", type: "text", label: "First Name" },
  { name: "email", type: "email", label: "Email" },
  { name: "password", type: "password", label: "Password" },
  { name: "number", type: "number", label: "Number" },
  { name: "tel", type: "tel", label: "Telephone" },
  { name: "url", type: "url", label: "Url" },
  { name: "search", type: "search", label: "Search" },
  { name: "date", type: "date", label: "Date" },
  { name: "time", type: "time", label: "Time" },
  { name: "color", type: "color", label: "Color" },
  { name: "range", type: "range", label: "Range" },
  { name: "file", type: "file", label: "File" },
  { name: "textarea", type: "textarea", label: "Textarea" },
  { name: "select", type: "select", label: "Select", options: ["red", "blue", "purple"] },
  { name: "checkbox", type: "checkbox", label: "Checkbox" },
  { name: "radio", type: "radio", label: "Radio" }
];

function App() {
  const [formData, setFormData] = useState({});

  function handleOnChange(name, value) {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <div style={{padding: '20px'}}>
        <h2>Dynamic Form</h2>
        {inputs.map((item) => {
          return (
            <CustomInput
              key={item.name}
              type={item.type}
              label={item.label}
              value={formData[item.name] || ""}
              onChange={
                (val) => {
                  const finalValue= val?.target ? val.target.value : val;
                  handleOnChange(item.name, finalValue)
                }
              }
              options={item.options}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
