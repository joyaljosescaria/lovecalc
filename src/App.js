import React ,{useState} from "react";
import "./styles.css";

export default function App() {
  const [sum, setSum] = useState(0);
  const [disabled , setDisabled] = useState(true)
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

  const handleChange = (event ,data)=> {
    if(data === 'name1')
      setName1(event.target.value)
    else
      setName2(event.target.value)
    if(name1 !== "" && name2 !== "")
    {
      setDisabled(false)
    }
  }

  var calculateSum = () =>{
    let conname = stringFunc(name1 , name2)
    let cutcount = cutCount(conname)
    let per = calcPerc(cutcount)
    setSum(per)
  }

  const stringFunc = (n1 , n2) =>{
    return n1.trim().toLowerCase()+'love'+n2.trim().toLowerCase();
  }

  const cutCount = (names) => {
    let count = [];
    let pos = [];
    let s = 0;
    for(var i =0 ;  names.length !== 0 ; i++){
      for(var j =0 ; j< names.length ; j++){
        if(names[0] === names[j])
        {
          s = s+1;
          pos.push(j)
        }
      }
      count.push(s);
      s=0;
      names = names.replaceAll(names[0] , "")
    }
    return count
  }

  const calcPerc = (counts) => {
    do {
      var cntLen = counts.length
      if(cntLen % 2 !== 0)
      {
        var odd = true
        var extraNum = counts[Math.round(cntLen/2)-1]
        counts.splice(Math.round(cntLen/2)-1,1)
      }

      var arr1 = []
      var arr2 = []
      
      for(var a1=0; a1<counts.length/2; a1++)
      {
        arr1[a1] = counts[a1]
      }

      for(var a2=counts.length/2 , a=0; a2<counts.length; a2++ , a++)
      {
        arr2[a] = counts[a2]
      }

      var newarr = [];
      
      for(var i=0,j=arr2.length-1;i<arr1.length;i++,j--)
      {
        var s = 0;
        s = arr2[j]+arr1[i]
        newarr[i] = s
      }

      
      if(odd)
      {
        newarr.push(extraNum)
      }
      
      var len = newarr.toString().replaceAll("," , "").length

      counts.length = 0
      counts = Array.from(newarr);

      var cont=true;

      if(len === 2 || newarr[0] === 100)
      {
        cont = false
        var newdata = newarr.toString().replaceAll("," , "")
        console.log(newdata)
      }
    }
    while(cont)
    return newdata
  }

  
  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Your name" onChange={(event) => handleChange(event, 'name1')}/>
        <br/>
        <input type="text" placeholder="Partner name" onChange={(event) => handleChange(event, 'name2')}/>
        <br/>
      </form>
      <button disabled={disabled} onClick={calculateSum}>Calculate Love</button>
      {(sum ===0 || sum >100) ? '' : <h1>{sum} %</h1>}
    </div>
  );
}
