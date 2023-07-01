import React from "react";
import CheckboxContext from "./CheckboxContext";
import "../../styles/checkbox.css";

function Checkbox({ children, disabled, value, checked, onChange }) {
  const context = React.useContext(CheckboxContext);

  if (!context) {
    return (
      <label>
        <input
          type="checkbox"
          disabled={disabled}
          checked={checked}
          onChange={({ target: { checked } }) => onChange(checked)}
        />
        {children}
      </label>
    );
  }

  const { isDisabled, isChecked, toggleValue } = context;
  return (
    <label>
      <input
        type="checkbox"
        className="checks etran"
        id="ex_chk3"
        for="ex_chk3"
        disabled={isDisabled(disabled)}
        checked={isChecked(value)}
        onChange={({ target: { checked } }) => toggleValue({ checked, value })}
      />
      {children}
    </label>
  );
}

export default Checkbox;
