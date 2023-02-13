import "./select.css";

export const Select = (props) => {
  const changeSelect = (value) => {
    props.callback(value);
  };
  return (
    <select onChange={(e) => changeSelect(e.target.value)} className="selector">
      {props.options.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        );
      })}
    </select>
  );
};
