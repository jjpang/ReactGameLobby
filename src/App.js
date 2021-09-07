/*
Blockers
- How to querySelector id=sign-in-form object which is in a modal?
- How to run auth.js file with variables like auth?
- Uncaught error and missing dependency?
- Display = none not working on material UI buttons
General questions
- Do you download NPM or use CDN typically?
- How to refer to files from a component?
Old questions
- Why does useEffect for saveData need to have both colorsUsedNow and colorsLeftNow?
- Why do grids get loaded 3 times upon starting the app?
*/

import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore/lite";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CreateBox from './components/CreateBox/CreateBox'
import NavBar from './components/NavBar/NavBar'

let auth

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
  auth = getAuth()
  
  const fetchData=async()=>{
    let docSnap = await getDoc(doc(db, "home", "colorsUsed"));
    setColorsUsed(docSnap.data()) // reads and sets colorsUsed
    colorsUsedNow = Object.values(docSnap.data()) // determines colorsLeft based on colorsUsed
    colorsLeftNow = colors.filter((color)=>{
      return !colorsUsedNow.includes(color)
    })
    setColorsLeft(colorsLeftNow)
  }
  
  const saveData = async() => {
    await setDoc(doc(db, "home", "colorsUsed"), colorsUsed);
  }
  
  useEffect(() => {
    fetchData()
  },[]) // if empty only runs when component is mounted, which could happen with props changing
  
  useEffect(() => { // updates colorsUsed in firestore
    saveData()
  },[colorsUsedNow, colorsLeftNow])// only called upon mount, read about lifecycle hooks.
  
  return (
    <main>
      <NavBar />
      <p className="title">Color Game Lobby</p>
      <Box id="login-reminder" textAlign="center" mb={5} fontSize={20} fontWeight="fontWeightBold" color="primary.main"></Box>
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



window.onload=function(){
  const loggedOutLinks = document.querySelectorAll('.logged-out')
  const loggedInLinks = document.querySelectorAll('.logged-in')

  const setupUI = (user => {
    
    if (user) {
      console.log(loggedInLinks)
      loggedInLinks.forEach(item => item.style.display = 'inline-flex')
      loggedOutLinks.forEach(item => item.style.display = 'none')
    } else {
      loggedInLinks.forEach(item => item.style.display = 'none')
      loggedOutLinks.forEach(item => item.style.display = 'inline-flex')
    }
  })
  
  onAuthStateChanged(auth, (user) => { // State changes for logged in and logged out
  const loginReminder = document.querySelector('#login-reminder')  
  if (user) {
    console.log('user logged in: ', user)
    loginReminder.innerHTML = ""
    setupUI(user)
  } else {
    loginReminder.innerHTML = "Sign up to save colors."
    console.log('user logged out')
    setupUI()
  }
})

  const signUpForm = document.querySelector('#sign-up-form') // Sign Up
  if (signUpForm) {
      signUpForm.addEventListener('submit', (e)=>{
          e.preventDefault()
          const email = signUpForm['email'].value
          const password = signUpForm['password'].value
          createUserWithEmailAndPassword(auth, email, password).then(cred =>{
          })
      })
  }
  const logoutButton = document.querySelector('#logout-button') // Logout
  if (logoutButton) {
    logoutButton.addEventListener('click', (e)=>{
      e.preventDefault()
      signOut(auth).then(()=>{
      })
    })
  }

  const loginForm = document.querySelector('#login-form') // Login
  if (loginForm) {
    loginForm.addEventListener('submit', (e)=>{
      e.preventDefault()
      const email = loginForm['email'].value
      const password = loginForm['password'].value
      signInWithEmailAndPassword(auth, email, password).then(cred =>{
      })
    })
  }
}