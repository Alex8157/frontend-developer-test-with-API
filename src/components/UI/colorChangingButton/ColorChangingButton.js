import "./colorChangingButton.css";
export function ColorChangingButton(props) {
  return (
    <button
      className="addButton"
      onClick={props.onClickFunction}
      style={{
        backgroundColor: props.change ? "#7BAE73" : "#eeeeee",
        color: props.change ? "#FFFFFF" : "#b4b4b4",
      }}
    >
      <h3 className="buttonH3">{props.value}</h3>
    </button>
  );
}
