import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore/lite";
import React, { useState, useEffect } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

function App() {
  const colors = ['','Red','Yellow','Green','Blue','Orange','Purple','Pink']
  const [colorsUsed, setColorsUsed] = useState({color1: '',color2: '',color3: '',color4: ''})
  const [colorsLeft, setColorsLeft] = useState(colors)
  let colorsUsedNow = colorsUsed
  let colorsLeftNow = colorsLeft
  const firebaseConfig = {
    apiKey: "AIzaSyBFoiib7l-0u0X6WzpFxzleMqsKzTqopy0",
    authDomain: "reactgamelobby.firebaseapp.com",
    projectId: "reactgamelobby",
    storageBucket: "reactgamelobby.appspot.com",
    messagingSenderId: "641413523836",
    appId: "1:641413523836:web:3d9424b6b039aa20d81cf9",
    measurementId: "G-7FR5CSRH8D"
  };
  const app = initializeApp(firebaseConfig);
  let db = getFirestore();
  
  const fetchData=async()=>{
    let querySnapshot = await getDocs(collection(db, "home"));
    // reads and sets colorsUsed
    querySnapshot.forEach((doc) => {
      colorsUsedNow[doc.id] = doc.data().color
      setColorsUsed(colorsUsedNow)
    });
    // determines colorsLeft based on colorsUsed
    colorsUsedNow = Object.values(colorsUsed)
    colorsLeftNow = colorsLeft.filter((colorLeft)=>{
      return !colorsUsedNow.includes(colorLeft)
    })
    setColorsLeft(colorsLeftNow)
  }
  
  const saveData = async() => {
    console.log('test')
    let colorNums = Object.keys(colorsUsed)
    for (let n = 0; n < colorNums.length; n++) {
      let playerColor = doc(db, "home", colorNums[n]);
      await updateDoc(playerColor, {
        color: colorsUsed[colorNums[n]]
      })
    }
  }
  window.addEventListener('beforeunload', saveData)
  
  useEffect(() => {
    fetchData()
  },[]) // if empty only runs when component is mounted, which could happen with props changing
  
  useEffect(() => {
    saveData()
  },[colorsUsedNow, colorsLeftNow])// only called upon mount, read about lifecycle hooks.
  // updates colorsUsed in firestore
  const CreateBox = ({title, colorNum}) => {        
    return (
      <Grid item xs={5}>
        <Box fontSize={24} textAlign="center" height={28} border={3} p={1}>{title}</Box>
          <Box textAlign="center" height={240} borderLeft={3} borderRight={3} borderBottom={3} pt={1.5}style={{backgroundColor: colorsUsed[colorNum]}}>
            <Box display="inline-block" p={1} bgcolor="white" mt={11}>
              <label>Choose Color: </label>
              <select onChange={(e)=>{
                // remove new color from colorsLeftNow
                colorsLeftNow = colorsLeftNow.filter((color) => color!==e.target.value)
                // if last color exists, add to colorsLeft
                if (colorsUsedNow[colorNum]) { colorsLeftNow = [colorsUsedNow[colorNum], ...colorsLeftNow] }
                // adds newly selected color to colorUsed
                colorsUsedNow[colorNum] = e.target.value
                setColorsUsed(colorsUsedNow)
                setColorsLeft(colorsLeftNow)
                
              }}>
                <option value="" disabled selected hidden>{colorsUsed[colorNum]}</option>  
                {colorsLeft.map(color=>{
                  return <option 
                    key={color} 
                    value={color}>
                    {color}</option>
                })}
              </select>
            </Box>
        </Box>
      </Grid>
    )
  }
  return (
    <main>
      <p className="title">Game Lobby</p>
      <Container maxWidth="md" id="grid">
        <Grid container spacing={5} justifyContent="center">
          <CreateBox title = 'P1' colorNum = 'color1' />
          <CreateBox title = 'P2' colorNum = 'color2' />
          <CreateBox title = 'P3' colorNum = 'color3' />
          <CreateBox title = 'P4' colorNum = 'color4' />
        </Grid>
      </Container>
    </main>
  );
}

export default App;
/*
Persistent storage:
- reload the grid when Firestore loads

Questions: 
- Currently stock on the error in row 34 - DONE
- when do i use useState if i have a backend?
- NPM vs. CDN...what should I do in the future? NPM provides more control, more stable.
- Why does the order of the object merging matter i.e. it doesn't work when i have ...doc.data() first in a standalone setColorsUsed in the for loop ... setColorsUsed({...colorsUsedNow, ...doc.data()})
- Is there any way to break out CreateBox into its own .js file component?
- Is there a batter way to restructure the CreateBox component? No
- purpose of e.preventDefault()
- How to reconnect github to local
*/