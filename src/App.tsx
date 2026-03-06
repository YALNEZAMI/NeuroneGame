import { useState } from "react";
import "./App.css";

function App() {
  const images = [
  // 0
  [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],

  // 1
  [
    [0,0,1,0,0],
    [0,1,1,0,0],
    [1,0,1,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0]
  ],

  // 2
  [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,0,0,1,0],
    [0,0,1,0,1],
    [1,1,1,1,1]
  ],

  // 3
  [
    [1,1,1,1,0],
    [0,0,0,0,1],
    [0,1,1,1,0],
    [0,0,0,0,1],
    [1,1,1,1,0]
  ],

  // 4
  [
    [0,0,0,1,0],
    [0,0,1,1,0],
    [0,1,0,1,0],
    [1,1,1,1,1],
    [0,0,0,1,0]
  ],

  // 5
  [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,1,1,1,0],
    [0,0,0,0,1],
    [1,1,1,1,0]
  ],

  // 6
  [
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,1,1,0],
    [0,1,0,0,1],
    [0,1,1,1,0]
  ],

  // 7
  [
    [1,1,1,1,1],
    [0,0,0,0,1],
    [0,0,1,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0]
  ],

  // 8
  [
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,1,1,1,0],
    [1,0,0,0,1],
    [0,1,1,1,0]
  ],

  // 9
  [
    [0,1,1,1,0],
    [1,0,0,1,0],
    [0,1,1,1,0],
    [0,0,0,1,0],
    [0,1,1,0,0]
  ]
]

  const [weights, setWeights] = useState(
    Array.from({ length: 5 }, () => Array(5).fill(0))
  );

  const [idxImage, setIdxImage] = useState(0);
  const [result, setResult] = useState(0);
  const [ref, setRef] = useState(0);

  const possibleWeights = [0, -1, 1];

  const isBigger = result >= ref;

  const calc = (wts:any,idx:number) => {
    let res = 0;
    
    for (let i = 0; i < images[idx].length; i++) {
      for (let j = 0; j < images[idx][0].length; j++) {
        const pix = Number(images[idx][i][j]);
        const w = Number(wts[i][j]);
        res += pix * w;
      }
    }

    return res;
  };

  const changingWeight = (value:any, i:number, j:number) => {
    const tmp = weights.map((row) => [...row]);
    tmp[i][j] = Number(value);

    setWeights(tmp);
    setResult(calc(tmp,idxImage));
  };

  const changeImg = (e:any) => {
    const idx = Number(e.target.value);
    setIdxImage(idx);
    console.log("changeImg");
    console.log("indx",idx);
    console.log("wheight",weights);
    
    const res=calc(weights,idx)
    console.log(res);
    
    setResult(res);

  };

  return (
    <main>

      {/* IMAGE */}
      <div className="flex justify-between bg-gray-100 p-10 m-3 rounded-3xl">
        <div>
          {images[idxImage].map((row, i) => (
            <div className="flex" key={i}>
              {row.map((bit, j) => (
                <div
                  key={`${i}-${j}`}
                  className={`w-5 h-5
                     ${bit === 1 ? "bg-amber-500" : "bg-gray-100"}
                  ${i==0&&j==0?'rounded-tl-3xl':''} ${i==row.length-1&&j==row.length-1?'rounded-br-3xl':''} ${i==0&&j==row.length-1?'rounded-tr-3xl':''} ${i==row.length-1&&j==0?'rounded-bl-3xl':''}
                  `}
                />
              ))}
            </div>
          ))}
        </div>

        {/* SELECT IMAGE */}
        <div>
          <p>Choix du chiffre</p>

          <select
            className="cursor-pointer h-10 bg-amber-300 w-28 rounded-2xl px-1"
            onChange={changeImg}
          >
            {images.map((_, i) => (
              <option
                key={i}
                value={i}
                className={i % 2 === 1 ? "bg-white" : "bg-amber-200"}
              >
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* WEIGHTS */}
      <div className="flex justify-center bg-gray-100 rounded-3xl">
        <div className="flex flex-col my-5">

          <p>Configuration des poids</p>

          <div className="my-5 bg-gray-300 p-3 rounded-3xl">

            {weights.map((row, i) => (
              <div className="flex" key={i}>

                {row.map((_, j) => (
                  <select
                    key={`${i}-${j}`}
                    className={`cursor-pointer m-2 rounded ${
                      j % 2 === 1 ? "bg-amber-300" : "bg-indigo-300"
                    }`}
                    onChange={(e) =>
                      changingWeight(e.target.value, i, j)
                    }
                  >
                    {possibleWeights.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                ))}

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* RESULT */}
      <div className="bg-gray-100 p-3 rounded-2xl my-5">

        <div className="my-2 flex justify-center items-center gap-3">

          <div className="bg-amber-300 p-1 px-3 rounded-2xl">
            Résultat: {result}
          </div>

          <div className="bg-indigo-300 p-1 px-3 rounded-2xl">
            Référence:

            <input
              className="w-10 border-2 border-black rounded px-1 mx-1"
              type="number"
              onChange={(e) => setRef(Number(e.target.value))}
            />

          </div>
        </div>

        <div
          className={`my-2 rounded-2xl ${
            isBigger ? "bg-green-400" : "bg-red-400"
          }`}
        >
          Le résultat {isBigger ? "est" : "n'est pas"} supérieur ou égal à la
          référence
        </div>

      </div>

    </main>
  );
}

export default App;