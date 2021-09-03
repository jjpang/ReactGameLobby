import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import React, { useState, useEffect } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

function App() {
  const fetchData=async()=>{
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
    const db = getFirestore();
    // const analytics = getAnalytics(app);
    let grid = document.getElementById('grid')
    console.log('test' + grid)
    
    //test
    const element = document.createElement("div");
    element.textContent = "Hello World";

    let querySnapshot = await getDocs(collection(db, "home"));
    querySnapshot.forEach((doc) => {
      grid.appendChild(//element
        
        // This code is broken...  error: "Unhandled Rejection (TypeError): Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'."
        <CreateBox title={doc.data().title} color={doc.data().color} />
      )
      console.log(doc.data());
    });
  }

  useEffect(() => {
    fetchData()
  },[])
  
  let colors = ['','Red','Yellow','Green','Blue','Orange','Purple','Pink']
  const [colorsUsed, setColorsUsed] = useState({color1: '',color2: '',color3: '',color4: ''})
  const [colorsLeft, setColorsLeft] = useState(colors)

  const CreateBox = ({title, color}) => {        
    return (
      <Grid item xs={5}>
        <Box fontSize={24} textAlign="center" height={28} border={3} p={1}>{title}</Box>
          <Box textAlign="center" height={240} borderLeft={3} borderRight={3} borderBottom={3} pt={1.5}style={{backgroundColor: color}}>
            <Box display="inline-block" p={1} bgcolor="white" mt={11}>
              <label>Choose Color: </label>
              <select onChange={(e)=>{
                // code needs to be refactored with firestore update...
                // // remove new color from colorsLeft
                // colorsLeftNow = colorsLeft.filter((color) => color!==e.target.value)
                // // if last color exists, add to colorsLeft
                // if (colorsUsedNow[colorNum]) { colorsLeftNow = [colorsUsedNow[colorNum], ...colorsLeftNow] }
                // // adds newly selected color to colorUsed
                // colorsUsedNow[colorNum] = e.target.value
                // setColorsUsed(colorsUsedNow)
                // setColorsLeft(colorsLeftNow)
                }}>
                <option value="" disabled selected hidden>{color}</option>  
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
        {/* old code to be deleted...
        <Grid container spacing={5} justifyContent="center">
          <CreateBox title = 'P2' colorNum = 'color2' />
          <CreateBox title = 'P3' colorNum = 'color3' />
          <CreateBox title = 'P4' colorNum = 'color4' />
        </Grid> */}
      </Container>
    </main>
  );
}

export default App;

/*
- Currently stock on the error in row 34

- when do i use useState if i have a backend?
- NPM vs. CDN...what should I do in the future?
- Why does the order of the object merging matter i.e. it doesn't work when i have ...doc.data() first in a standalone setColorsUsed in the for loop ... setColorsUsed({...colorsUsedNow, ...doc.data()})
- Is there any way to break out CreateBox into its own .js file component?
- Is there a batter way to restructure the CreateBox component?
- purpose of e.preventDefault()
- How to reconnect github to local
*/