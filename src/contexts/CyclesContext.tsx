import { differenceInSeconds } from 'date-fns'
import { createContext, ReactNode, useState, useReducer, useEffect } from 'react'
import { addNewCycleAction, InterruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from '../reducers/Cycle/actions'
import { Cycle, cyclesReducer } from '../reducers/Cycle/reducer'

interface createCycleData {
    task: string,
    minutesAmount: number
}

interface CyclesContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
    CreateNewCycle: (data: createCycleData) => void
    InterruptCurrentCycle: () => void
}


interface CyclesContextProps {
    children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({ children }: CyclesContextProps) {

    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles:[],
        activeCycleId: null,
    }, () => {
        const storedStateAsJSON = localStorage.getItem("@ignite-timer:cycles-state-1.0.0")

        if(storedStateAsJSON) {
            return JSON.parse(storedStateAsJSON)
        }
    })

    const { cycles, activeCycleId } = cyclesState

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)



    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
       if(activeCycle) {
        return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
       }
          return 0
    })


    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    useEffect(() => {
        const stateJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
    }, [cyclesState])


    function markCurrentCycleAsFinished() {

        dispatch(markCurrentCycleAsFinishedAction())
    }
        
    function CreateNewCycle(data: createCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        dispatch(addNewCycleAction(newCycle))
    }

    
    function InterruptCurrentCycle() {
        dispatch(InterruptCurrentCycleAction())
    }

    return (
    <CyclesContext.Provider 
      value={{
        cycles,
        activeCycle, 
        activeCycleId, 
        markCurrentCycleAsFinished, 
        amountSecondsPassed, 
        setSecondsPassed,
        CreateNewCycle,
        InterruptCurrentCycle,
    }}
    >
        {children}
    </CyclesContext.Provider>
    )
}
