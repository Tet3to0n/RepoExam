import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { useEffect, useState } from "react";

export async function envAPI(url) {
  try {
  const response = await axios({
  url: `https://rickandmortyapi.com/api/${url}`,
  method: `GET`,
  });
  return response;
  } catch (e) {
  console.log(e);
  }
 }

function App() {
  const [dataRick, setDataRick] = useState({});
 
 const response = async (name) => envAPI(name);
 useEffect(() => {
 async function loadapi() {
 const resp = await response("character");
 const data = resp.data;
 setDataRick(data);
 }
 loadapi();
 return function cleanup() {
 loadapi();
 };
 }, []);
 
 useEffect(() => {
  console.log(dataRick);
  if (dataRick !== null) console.log(dataRick?.results[0].image);
 }, [dataRick]);


  return (
    <div className="App">
      <header className="App-header">
      <img src={dataRick?.results[0].image} className="App-logo" alt="logo" />
      <p>{dataRick?.results[0].name}</p>
       <p>Especie: {dataRick?.results[0].species} </p>
      </header>
    </div>
  );
}
  
export default App;
