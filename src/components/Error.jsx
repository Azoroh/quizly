export default function Error({ message }) {
  //   console.log(message);
  return (
    <section className="screen screen-error">
      <div className="glass-card error-card">
        <div className="error-icon-wrap">
          <div className="error-icon">!</div>
        </div>

        <p className="eyebrow">Something went wrong</p>
        <h2 className="screen-title smaller">Unable to load quiz</h2>

        <p className="screen-subtitle error-text">{message}</p>

        <div className="error-actions">
          <button className="btn btn-primary btn-large">Try Again</button>
        </div>
      </div>
    </section>
  );
}
