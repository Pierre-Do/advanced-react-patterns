// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import React from 'react'
import {Switch} from '../switch'

const ToggleContext = React.createContext({})
ToggleContext.displayName = 'ToggleContext'

function useToggleContext() {
  const toggleContext = React.useContext(ToggleContext)

  if (!toggleContext) {
    throw new Error('The component should be in a Toggle')
  }

  return toggleContext
}

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = React.useCallback(() => {
    setOn(previousOnValue => !previousOnValue)
  }, [])

  return (
    <ToggleContext.Provider value={{toggle, on}}>
      {children}
    </ToggleContext.Provider>
  )
}

function ToggleOn({children}) {
  const {on} = useToggleContext()
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  const {on} = useToggleContext()
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton(props) {
  const {on, toggle} = useToggleContext()
  return <Switch on={on} onClick={toggle} {...props} />
}

function App() {
  return (
    <div>
      <Toggle>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <div>
          <ToggleButton />
        </div>
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
