import { useState } from 'react'
import './App.css'
import {ConfigProvider} from 'antd';
import AppRoutes from './routes/AppRoutes';

function App() {
  

  return (
    <ConfigProvider>
      <AppRoutes></AppRoutes>
    </ConfigProvider>
  )
}

export default App
