import React , {useEffect , useState , useRef} from "react";
import axios from "axios";
import "./style.css"
import {AiOutlineLoading3Quarters} from "react-icons/ai";



function App() {
  const [Weather,setWeather] = useState();
  /*const [Data,setData] = useState({
    location : "",
    temp : 0,
    text : ""

  });*/
  const [textWeather,setTextWeather] = useState([]);
  const [Temp,setTemp] = useState()
  const [Location,setLocation] = useState([]);
  const [City,setCity] = useState("London");
  const [Loading,setLoading] = useState(true);
  const cityRef = useRef();
  
  const imgref = useRef();
  
  

  useEffect(() => {
    if(City == "" || !City) return setLoading(false);
    setLoading(true);

    axios.get(`https://api.weatherapi.com/v1/current.json?key=7ad179d543b6431f9c7184107220503&q=${City}&aqi=no`)
    .then(async resp => {
      await new Promise(r=>setTimeout(r, 500))
      setWeather(resp.data);
      setLocation([resp.data.location.name,resp.data.location.country])
      
      //if(imgref.current) imgref.current.style.opacity = 0
      setTextWeather([resp.data.current.condition.text,resp.data.current.condition.icon])
      //if(imgref.current) setTimeout(()=>imgref.current.style.opacity = 1, 500)
      setTemp(resp.data.current.temp_c)
      setLoading(false);
      
    }).catch(error => {
      alert(error.message)
      setLoading(false);
    })

    
  },[City])
  
  function handleAddCity(event){
    event.preventDefault();
    setCity(cityRef.current.value)
    cityRef.current.value = "";
    
  }
  const DateBuilder = (d) => {
    let Months = ['January' , 'February' , 'March' , 'April' , 'May' , 'June' , 'July' , 'August' , 'September' , 'October' , 'November' , 'December' ];
    let Days = ['Sunday' , 'Monday' , 'Tuesday' , 'Wendnesday' , 'Thursday' , 'Friday' , 'Saturday']
    let Day = Days[d.getDay()]
    let Date = d.getDate();
    let Month = Months[d.getMonth()]
    let Year = d.getFullYear();
    return `${Day} ${Date} ${Month} ${Year}` 
  }
  
  
  
  return (
    <>
      
    <div>
      
        
        <form onSubmit={handleAddCity} className="mainComponent">
          <h1>Weather Tracker</h1>
          <div className="ui icon input"><input className="inp" type="text" placeholder="Enter a city name ..." ref={cityRef}/><i aria-hidden="true" className="search icon"></i></div>
          <div className = "container">
          {Loading ? (<span  className="preload"><AiOutlineLoading3Quarters /></span>) : (
            <>
               <img src={textWeather[1]} ref = {imgref}></img>
              <div className="Temp2">{textWeather[0]}</div>
              <div className="Temp"><div className="Temp1">{Temp} °C</div></div>
              <div className="Location">{Location[0]} , {Location[1]}</div>
              <div className="Date">{DateBuilder(new Date())}</div>
            </>
           
          )}
          </div>
          
          
        
        </form>

      
      
    </div>
    </>
  );
}

export default App;
