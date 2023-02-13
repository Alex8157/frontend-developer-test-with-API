import { Bin } from "../bin/Bin";
import "./deleteButton.css";

export const DeleteButton = (props) => {
  return (
    <div className="deleteDiv">
      <button className="deleteButton" onClick={props.callback}>
        <Bin />
      </button>
    </div>
  );
};
