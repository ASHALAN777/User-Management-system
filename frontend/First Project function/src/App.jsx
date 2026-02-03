import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Navigate,Router,Routes,Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import Admin from './Pages/Admin'
import Login from './Pages/Login'
import Employee from './Pages/Employee'
import Profile from './inpages/Profile'
import Editor from './inpages/Crud'
import Mainboard from './inpages/Mainboard'
import AIBOT from './inpages/Ai'
import Tester from './Pages/Tester'
import RoleRedirect from './Customhooks/RoleRedirect'
import EMMainboard from './inpages/EMMainboard '
import EMProfile from './inpages/Employee Profile '
import  EMEditor  from './inpages/employ-crud'


function App() {
  return (   
          <div className='app'>


            <Routes>
              <Route path='/' element ={< RoleRedirect/>} />
              <Route path='/signup' element={<Signup />}></Route>
              <Route path='/login' element={<Login />} >  </Route>
              <Route path='/test' element={<Tester />} >  </Route>
              <Route path='/admin' element={<Admin />}>
                 

                  <Route index element={<Mainboard />} />
              
                  <Route path='/admin/userprofile' element={<Profile />}/>
                 <Route path='/admin/crud' element={<Editor />}/>
                 <Route path='/admin/ai-bot' element={<AIBOT />}/>
              
              
              
              </Route>  

            
              <Route path='/employee' element={<Employee />}>
                 

                  
              
                    <Route index element={<EMMainboard />} />
              
                  <Route path='/employee/userprofile' element={<EMProfile />}/>
                 {/* <Route path='/employee/crud' element={<EMEditor />}/> */}
                 
              
              
              
              </Route>  
            </Routes>   


          </div>

  )
} 

export default App
