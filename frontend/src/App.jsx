import Container from "/src/components/Container"
import { FormContext } from "./contexts/FormContext"
import { useState } from "react"
function App() {
 
  const [showForm, setShowForm] = useState(false)

  const [showTaskEdit, setShowTaskEdit] = useState(false)

  const [id, setId] = useState('')

  return (
    <>

      <FormContext.Provider value={{showForm, setShowForm, showTaskEdit, setShowTaskEdit, id, setId}}>
        <Container />
      </FormContext.Provider>
      
    </>
  )
}

export default App
