import "./LoadinSpinner.css";

function LoadingSpinner() {
  return (
    <div className="loading-spinner-screen" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true">
        <span className="loading-spinner-ring" />
        <span className="loading-spinner-ring" />
        <span className="loading-spinner-ring" />
      </div>
      <span className="loading-spinner-sr-only">Loading</span>
    </div>
  );
}

export default LoadingSpinner;
