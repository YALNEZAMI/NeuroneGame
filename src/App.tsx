import { useEffect, useState } from "react";

const images = [
  // 0
  [[0,1,1,1,0],[1,0,0,0,1],[1,0,0,0,1],[1,0,0,0,1],[0,1,1,1,0]],
  // 1
  [[0,0,1,0,0],[0,1,1,0,0],[1,0,1,0,0],[0,0,1,0,0],[0,1,1,1,0]],
  // 2
  [[0,1,1,1,0],[1,0,0,0,1],[0,0,0,1,0],[0,0,1,0,1],[1,1,1,1,1]],
  // 3
  [[1,1,1,1,0],[0,0,0,0,1],[0,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],
  // 4
  [[0,0,0,1,0],[0,0,1,1,0],[0,1,0,1,0],[1,1,1,1,1],[0,0,0,1,0]],
  // 5
  [[1,1,1,1,1],[1,0,0,0,0],[1,1,1,1,0],[0,0,0,0,1],[1,1,1,1,0]],
  // 6
  [[0,0,0,1,0],[0,0,1,0,0],[0,1,1,1,0],[0,1,0,0,1],[0,1,1,1,0]],
  // 7
  [[1,1,1,1,1],[0,0,0,0,1],[0,0,1,1,0],[0,0,1,0,0],[0,1,0,0,0]],
  // 8
  [[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0],[1,0,0,0,1],[0,1,1,1,0]],
  // 9
  [[0,1,1,1,0],[1,0,0,1,0],[0,1,1,1,0],[0,0,0,1,0],[0,1,1,0,0]],
];

const possibleWeights = [0, -1, 1];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0b0d12;
    --surface: #13161f;
    --surface2: #1a1e2b;
    --border: rgba(255,255,255,0.07);
    --border-bright: rgba(255,255,255,0.15);
    --cyan: #00e5c8;
    --cyan-dim: rgba(0,229,200,0.12);
    --amber: #f5a623;
    --amber-dim: rgba(245,166,35,0.12);
    --red: #ff4d6d;
    --red-dim: rgba(255,77,109,0.12);
    --green: #2ecc71;
    --green-dim: rgba(46,204,113,0.12);
    --text: #e8eaf0;
    --muted: #6b7280;
    --mono: 'Space Mono', monospace;
    --sans: 'DM Sans', sans-serif;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--sans);
    min-height: 100vh;
  }

  .app {
    max-width: 680px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }

  .header {
    margin-bottom: 2.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
  }

  .header-label {
    font-family: var(--mono);
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--cyan);
    margin-bottom: 0.4rem;
  }

  .header h1 {
    font-family: var(--mono);
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.02em;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1rem;
  }

  .card-label {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .card-label::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 1px;
    background: var(--cyan);
  }

  .digit-row {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .digit-grid {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .digit-row-inner {
    display: flex;
    gap: 3px;
  }

  .pixel {
    width: 22px;
    height: 22px;
    border-radius: 4px;
    transition: background 0.15s ease, box-shadow 0.15s ease;
  }

  .pixel.on {
    background: var(--amber);
    box-shadow: 0 0 8px rgba(245,166,35,0.4);
  }

  .pixel.off {
    background: var(--surface2);
  }

  .digit-controls {
    flex: 1;
  }

  .digit-controls p {
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 0.6rem;
  }

  .styled-select {
    appearance: none;
    background: var(--surface2);
    border: 1px solid var(--border-bright);
    color: var(--text);
    font-family: var(--mono);
    font-size: 13px;
    border-radius: 8px;
    padding: 0.5rem 0.9rem;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    width: 100%;
  }

  .styled-select:hover {
    border-color: var(--cyan);
  }

  .styled-select:focus {
    border-color: var(--cyan);
    box-shadow: 0 0 0 3px rgba(0,229,200,0.1);
  }

  .weight-section {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .weight-row {
    display: flex;
    gap: 6px;
    margin-bottom: 6px;
  }

  .weight-select {
    appearance: none;
    width: 52px;
    height: 36px;
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 700;
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
  }

  .weight-select.pos {
    border-color: rgba(0,229,200,0.35);
    background: rgba(0,229,200,0.06);
    color: var(--cyan);
  }

  .weight-select.neg {
    border-color: rgba(255,77,109,0.35);
    background: rgba(255,77,109,0.06);
    color: var(--red);
  }

  .weight-select:hover {
    border-color: var(--cyan);
    box-shadow: 0 0 0 2px rgba(0,229,200,0.1);
  }

  .result-area {
    display: flex;
    align-items: stretch;
    gap: 1rem;
  }

  .result-box {
    flex: 1;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1rem 1.25rem;
  }

  .result-box .box-label {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 0.4rem;
  }

  .result-value {
    font-family: var(--mono);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--cyan);
    letter-spacing: -0.02em;
  }

  .ref-value {
    font-family: var(--mono);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--amber);
    letter-spacing: -0.02em;
  }

  .ref-input {
    background: transparent;
    border: none;
    outline: none;
    font-family: var(--mono);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--amber);
    letter-spacing: -0.02em;
    width: 100%;
  }

  .ref-input::-webkit-inner-spin-button,
  .ref-input::-webkit-outer-spin-button { opacity: 0; }

  .verdict {
    margin-top: 1rem;
    border-radius: 10px;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-family: var(--mono);
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    transition: background 0.3s, border-color 0.3s;
  }

  .verdict.pass {
    background: var(--green-dim);
    border: 1px solid rgba(46,204,113,0.3);
    color: var(--green);
  }

  .verdict.fail {
    background: var(--red-dim);
    border: 1px solid rgba(255,77,109,0.3);
    color: var(--red);
  }

  .verdict-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .verdict.pass .verdict-dot { background: var(--green); box-shadow: 0 0 6px var(--green); }
  .verdict.fail .verdict-dot { background: var(--red); box-shadow: 0 0 6px var(--red); }

  .divider {
    height: 1px;
    background: var(--border);
    margin: 1.25rem 0;
  }
`;

function App() {
  const [weights, setWeights] = useState(
    Array.from({ length: 5 }, () => Array(5).fill(0))
  );
  const [idxImage, setIdxImage] = useState(0);
  const [result, setResult] = useState(0);
  const [ref, setRef] = useState(0);

  const calc = (wts: number[][], idx: number) => {
    let res = 0;
    for (let i = 0; i < images[idx].length; i++)
      for (let j = 0; j < images[idx][0].length; j++)
        res += Number(images[idx][i][j]) * Number(wts[i][j]);
    return res;
  };

  const changingWeight = (value: string, i: number, j: number) => {
    const tmp = weights.map((row) => [...row]);
    tmp[i][j] = Number(value);
    setWeights(tmp);
    setResult(calc(tmp, idxImage));
  };

  const changeImg = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = Number(e.target.value);
    setIdxImage(idx);
    setResult(calc(weights, idx));
  };

  const changeRef = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRef(Number(e.target.value));
  };

  useEffect(() => {
    const reference = document.getElementById("reference") as HTMLInputElement;
    if (reference) reference.value = "0";
  }, []);

  const isBigger = result >= ref;

  const getWeightClass = (w: number) => {
    if (w > 0) return "weight-select pos";
    if (w < 0) return "weight-select neg";
    return "weight-select";
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="header-label">Perceptron · Simulateur</div>
          <h1>Réseau de neurones — visualisation</h1>
        </div>

        {/* IMAGE */}
        <div className="card">
          <div className="card-label">Entrée numérique</div>
          <div className="digit-row">
            <div className="digit-grid">
              {images[idxImage].map((row, i) => (
                <div className="digit-row-inner" key={i}>
                  {row.map((bit, j) => (
                    <div
                      key={`${i}-${j}`}
                      className={`pixel ${bit === 1 ? "on" : "off"}`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="digit-controls">
              <p>Sélectionner un chiffre</p>
              <select className="styled-select" onChange={changeImg}>
                {images.map((_, i) => (
                  <option key={i} value={i}>
                    Chiffre {i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* WEIGHTS */}
        <div className="card">
          <div className="card-label">Matrice des poids</div>
          <div className="weight-section">
            {weights.map((row, i) => (
              <div className="weight-row" key={i}>
                {row.map((w, j) => (
                  <select
                    key={`${i}-${j}`}
                    className={getWeightClass(w)}
                    onChange={(e) => changingWeight(e.target.value, i, j)}
                  >
                    {possibleWeights.map((pw) => (
                      <option key={pw} value={pw}>
                        {pw === 1 ? "+1" : pw === -1 ? "−1" : " 0"}
                      </option>
                    ))}
                  </select>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* RESULT */}
        <div className="card">
          <div className="card-label">Activation & seuil</div>
          <div className="result-area">
            <div className="result-box">
              <div className="box-label">Résultat</div>
              <div className="result-value">{result}</div>
            </div>
            <div className="result-box">
              <div className="box-label">Référence</div>
              <input
                id="reference"
                className="ref-input"
                type="number"
                defaultValue={0}
                onChange={changeRef}
              />
            </div>
          </div>

          <div className={`verdict ${isBigger ? "pass" : "fail"}`}>
            <div className="verdict-dot" />
            {isBigger
              ? `Activé — résultat (${result}) ≥ seuil (${ref})`
              : `Inhibé — résultat (${result}) < seuil (${ref})`}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
