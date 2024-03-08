import { useEffect, useRef, useState } from 'react';
import Lupa from '../images/magnifier_magnifying_glass_icon_149435.png'
import './weather.css'
import windSpeed from '../images/windy.png'
import humidity from '../images/water-drop.png'
import { Circles, Bars, BallTriangle, ThreeCircles, ThreeDots } from 'react-loader-spinner';

function Weather() {

  const inputRef = useRef(null);

  const [data, setData] = useState('')
  const [city, setCity] = useState('Tashkent');
  const [loc, setLoc] = useState('')
  const [logo, setLogo] = useState('');
  const [value, setValue] = useState('');

  const apiKey = 'a26da2cec49ec582f5456dce7dc7743b';

    var divForm = document.getElementById('form');
    
    useEffect(() => {
      onHandle();
      inputRef.current.focus();
    }, [])

    const handleChangee = (e) => {
      setCity(e.target.value);
      const inputValue = e.target.value;
      const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      setValue(capitalizedValue)
    }
    const onHandle = async () => {
      
        const base = 'https://api.openweathermap.org/data/2.5/weather';
        const query = `?q=${city}&units=metric&appid=${apiKey}`;
        const req = await fetch(base+query)
          .then(rep => rep.json())
          .then(json => {
              setData(json)
              setLogo(json.weather[0].icon)
              console.log(json);
          })

  }


  const handleKeyPress = (event) => {
      if(event.key === "Enter"){
        onHandle();
      }
  }




    
  return (
    <div className="App"  onKeyDown={handleKeyPress} >
              <div className='d-flex w-100 div-app1 justify-content-center align-items-center'>
                  <div className='weather-card'>
                        <div className='w-100  justify-content-center d-flex'>
                          <div className='form mx-auto' id='form'>
                              <input ref={inputRef} value={value} placeholder='City name...' type="text" onChange={handleChangee} className='setCity py-2' />
                              <button className='btn-search ' onClick={onHandle}> 
                                <img src={Lupa} className='img-btn' alt="" />
                              </button>
                          </div>
                        </div>
                  {logo    ? (
                    <div className='weather-section'>
                      <img className='img-weather' src={`https://openweathermap.org/img/wn/${logo}@2x.png`} alt="" />
                      <h1 className='text2'>{Math.round(data.main.temp)}°c</h1>
                      <h1 className='text1 fs-1 mt-4'>{data.name}, {data.sys.country}</h1>


                      <div className='scDiv navbar'>
                          <div className='d-flex justify-content-between w-100'>
                              <div className='d-flex'>
                                  <img className='img-fluid img-icon1' src={humidity} alt="" />
                                <div className='d-block'>
                                    <h1 className='h11'>{data.main.humidity}%</h1><br />
                                      <p className='ppp'>Humidty</p>
                                </div>
                              </div>
                              <div className='d-flex'>
                                  <img className='img-fluid img-icon1' src={windSpeed} alt="" />
                                <div className='d-block'>
                                    <h1 className='h11'>{data.wind.speed}m/s</h1><br />
                                      <p className='ppp1'>Wind Speed</p>
                                </div>
                              </div>
                          </div>
                          <div></div>
                          <h1></h1>
                      </div>
                    </div>
                  ) : (
                  <div className='w-100 h-75 d-flex justify-content-center align-items-center'>
                      <Bars color='white' />
                  </div>
          )}
                </div>
              </div>

              <p className='text-center text-white'>Developed by <a href="https://github.com/ikromjonismoiljonovdev">Ikromjon</a></p>
    </div>
  );
}

export default Weather;