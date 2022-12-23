import "./spinner.css";
export default function Spinner() {
  return (
    <div className="preloader">
      <div className="preloaderBlock">
        <div className="preloaderRow">
          <div className="preloaderItem"></div>
          <div className="preloaderItem"></div>
        </div>
      </div>
    </div>
  );
}
