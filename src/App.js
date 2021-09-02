/*
1. Is there any way to break out CreateBox into its own .js file component?
2. Is there a batter way to restructure the CreateBox component?
3. purpose of e.preventDefault()

4. How to reconnect github to local
*/

import React, { useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';



function App() {
  let colors = ['','Red','Yellow','Green','Blue','Orange','Purple','Pink']
  const [colorsUsed, setColorsUsed] = useState({color1: '',color2: '',color3: '',color4: ''})
  const [colorsLeft, setColorsLeft] = useState(colors)


  

  const CreateBox = ({title, colorNum}) => {    
    let colorsUsedNow = colorsUsed
    let colorsLeftNow = colorsLeft
    return (
      <Grid item xs={5}>
        <Box fontSize={24} textAlign="center" height={28} border={3} p={1}>{title}</Box>
          <Box textAlign="center" height={240} borderLeft={3} borderRight={3} borderBottom={3} pt={1.5}style={{backgroundColor: colorsUsed[colorNum]}}>
            <Box display="inline-block" p={1} bgcolor="white" mt={11}>
              <label>Choose Color: </label>
              <select onChange={(e)=>{
                // remove new color from colorsLeft
                colorsLeftNow = colorsLeft.filter((color) => color!==e.target.value)
                // if last color exists, add to colorsLeft
                if (colorsUsedNow[colorNum]) { colorsLeftNow = [colorsUsedNow[colorNum], ...colorsLeftNow] }
                // adds newly selected color to colorUsed
                colorsUsedNow[colorNum] = e.target.value
                setColorsUsed(colorsUsedNow)
                setColorsLeft(colorsLeftNow)
                }}>
                <option value="" disabled selected hidden>{colorsUsedNow[colorNum]}</option>  
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
      <Container maxWidth="md">
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