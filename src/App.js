import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore/lite";
import React, { useState, useEffect } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CreateBox from './components/CreateBox/CreateBox'

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
  initializeApp(firebaseConfig);
  let db = getFirestore();
  
  const fetchData=async()=>{
    let docSnap = await getDoc(doc(db, "home", "colorsUsed"));
    // reads and sets colorsUsed
    setColorsUsed(docSnap.data())
    // determines colorsLeft based on colorsUsed
    colorsUsedNow = Object.values(docSnap.data())
    colorsLeftNow = colors.filter((color)=>{
      return !colorsUsedNow.includes(color)
    })
    setColorsLeft(colorsLeftNow)
  }
  
  const saveData = async() => {
    await setDoc(doc(db, "home", "colorsUsed"), colorsUsed);
    // let colorNums = Object.keys(colorsUsed)
    // for (let n = 0; n < colorNums.length; n++) {
    //   let playerColor = doc(db, "home", colorNums[n]);
    //   await updateDoc(playerColor, {
    //     color: colorsUsed[colorNums[n]]
    //   })
    // }
  }
  // window.addEventListener('beforeunload', saveData)
  
  useEffect(() => {
    fetchData()
  },[]) // if empty only runs when component is mounted, which could happen with props changing
  
  useEffect(() => {
    saveData()
  },[colorsUsedNow, colorsLeftNow])// only called upon mount, read about lifecycle hooks.
  // updates colorsUsed in firestore
  
  return (
    <main>
      <p className="title">Color Game Lobby</p>
      <Container maxWidth="md" id="grid">
        <Grid container spacing={5} justifyContent="center">
          <CreateBox title = 'P1' colorNum = 'color1' colorsUsed={colorsUsed} setColorsUsed={setColorsUsed} colorsUsedNow={colorsUsedNow} colorsLeft={colorsLeft} setColorsLeft={setColorsLeft} colorsLeftNow={colorsLeftNow} />
          <CreateBox title = 'P2' colorNum = 'color2' colorsUsed={colorsUsed} setColorsUsed={setColorsUsed} colorsUsedNow={colorsUsedNow} colorsLeft={colorsLeft} setColorsLeft={setColorsLeft} colorsLeftNow={colorsLeftNow} />
          <CreateBox title = 'P3' colorNum = 'color3' colorsUsed={colorsUsed} setColorsUsed={setColorsUsed} colorsUsedNow={colorsUsedNow} colorsLeft={colorsLeft} setColorsLeft={setColorsLeft} colorsLeftNow={colorsLeftNow} />
          <CreateBox title = 'P4' colorNum = 'color4' colorsUsed={colorsUsed} setColorsUsed={setColorsUsed} colorsUsedNow={colorsUsedNow} colorsLeft={colorsLeft} setColorsLeft={setColorsLeft} colorsLeftNow={colorsLeftNow} />
        </Grid>
      </Container>
    </main>
  );
}

export default App;
/*
Next steps:
- 

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