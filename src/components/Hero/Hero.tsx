import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay" />

      <div className="hero-content">
        <span className="hero-n">N</span>

        <h1 className="hero-title">YOU</h1>

        <div className="hero-meta">
          <span>Series</span>
          <span>Thriller</span>
          <span>2018</span>
          <span>5 Seasons</span>
          <span>A</span>
        </div>

        <p className="hero-description">
          A thrilling story about a man whose obsession leads him down a
          dangerous path.
        </p>

        <div className="hero-buttons">
          <button className="play-btn">▶ Play</button>
          <button className="info-btn">ⓘ More Info</button>
        </div>
      </div>

      <button className="mute-btn">🔊</button>
    </section>
  );
}

export default Hero;
