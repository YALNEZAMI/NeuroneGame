import { useState } from 'react'
import './App.css'

function App() {
  const images = [
  // 0
  [
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,0,0,0,1],
    [1,1,1,1,1]
  ],

  // 1
  [
    [0,0,1,0,0],
    [0,1,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,1,1,1,0]
  ],

  // 2
  [
    [1,1,1,1,1],
    [0,0,0,1,1],
    [0,0,1,0,0],
    [1,1,0,0,0],
    [1,1,1,1,1]
  ],

  // 3
  [
    [1,1,1,1,1],
    [0,0,0,1,1],
    [0,1,1,1,1],
    [0,0,0,1,1],
    [1,1,1,1,1]
  ],

  // 4
  [
    [1,0,0,1,0],
    [1,0,0,1,0],
    [1,1,1,1,1],
    [0,0,0,1,0],
    [0,0,0,1,0]
  ],

  // 5
  [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,1,1,1,1],
    [0,0,0,0,1],
    [1,1,1,1,1]
  ],

  // 6
  [
    [1,1,1,1,1],
    [1,0,0,0,0],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,1,1,1,1]
  ],

  // 7
  [
    [1,1,1,1,1],
    [0,0,0,1,0],
    [0,0,1,0,0],
    [0,1,0,0,0],
    [1,0,0,0,0]
  ],

  // 8
  [
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,1,1,1,1]
  ],

  // 9
  [
    [1,1,1,1,1],
    [1,0,0,0,1],
    [1,1,1,1,1],
    [0,0,0,0,1],
    [1,1,1,1,1]
  ]
]
 
  const [weights,setWeights]=useState([
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0],
  [0,0,0,0,0]
])
 const [image, setImage] = useState(images[0])
const [result,setResult]=useState(0)
const [ref,setRef]=useState(0)
const isBigger = result >= ref
const changingWeight = (e:string,i:number,j:number)=>{
  const tmp = weights.map(row => [...row])
  tmp[i][j] = Number(e)

  setWeights(tmp)
  setResult(calc(tmp))
}
const calc=(wts:any)=>{
  let res=0;
  for (let i = 0; i < image.length; i++) {
   for (let j = 0; j < image[0].length; j++) {
     const pix = Number(image[i][j]);
        const w = Number(wts[i][j]);
        const prod= Number(pix*w);
        res+=prod
   }
  }
  return res
}
const possibleWeights=[0,-1,1]
const changingRef=(e:number)=>{
setRef(Number(e))
}
const changeImg=(e:any)=>{
  setImage(images[Number(e.target.value)])
}
  return (
   <main>
          {/**l'image */}
      <div className="flex justify-between bg-gray-100 p-10 m-3 rounded-3xl">
       <div>
         {image.map((row:number[], i:number) => (
        <div className='flex' key={i}>
          {row.map((bit, j) => (
            <div className={`w-5 h-5 ${bit==1?'bg-amber-500':'bg-gray-100'} ${i==0&&j==0?'rounded-tl-3xl':''} ${i==row.length-1&&j==row.length-1?'rounded-br-3xl':''} ${i==0&&j==row.length-1?'rounded-tr-3xl':''} ${i==row.length-1&&j==0?'rounded-bl-3xl':''}`} key={j}></div>
          ))}
        </div>
      ))}
       </div>
      {/**selection de l'image */}
        <div> 
          <p>Choix du chiffre</p>
          <select className='cursor-pointer h-10 bg-amber-300 w-28 rounded-2xl px-1' onChange={(e)=> {changeImg(e)}}>
          {images.map((x,i)=>{
            return <option key={x[i][i]} className={`cursor-pointer ${i%2==1?'bg-white':'bg-amber-200'}`} value={i}>{i}</option>
          })}
        </select>
        </div>
      </div>
      {/**les poids */}
      <div className="flex justify-center bg-gray-100 rounded-3xl">
              <div className='flex flex-col my-5'>
                <p>Configuration des poids</p>

        <div className='my-5 bg-gray-300 p-3 rounded-3xl'>
          {weights.map((row:number[], i:number) => (
        <div className='flex' key={i}>
          {row.map((bit, j) => (
            <select className={`cursor-pointer m-2 rounded ${j%2==1?'bg-amber-300':'bg-indigo-300'}`} onChange={(e)=>changingWeight(e.target.value,i,j)} key={j}>
              {possibleWeights.map((w:number)=>{
                return <option key={bit} className='cursor-pointer' value={w}>{w}</option>
              })}
            </select>
          ))}
        </div>
      ))}
        </div>
              </div>
      </div>
            {/**les poids */}

<div className='bg-gray-100 p-3 rounded-2xl my-5'>
  <div className='my-2 flex justify-center items-center gap-3'>
  <div className={`bg-amber-300 p-1 px-3 rounded-2xl`}>Résultat: {result}</div>

  <div className='my-2 bg-indigo-300 p-1 px-3 rounded-2xl'>
  Référence:
<input
className='w-10 border-2 border-solid border-black rounded  px-1 mx-1'
  type="number"
  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    changingRef(Number(e.target.value))
  }
/></div>
</div>
<div className={`my-2 rounded-2xl ${isBigger?'bg-green-400':'bg-red-400'}`}>Le résultat {isBigger?'est':"n'est pas"} supérieur ou égale à la référence</div>

</div>


    </main>
  )
}

export default App
