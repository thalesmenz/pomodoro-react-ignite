import { createContext, ReactNode, useState } from 'react'

interface createCycleData {
    task: string,
    minutesAmount: number
}

interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interrupteDate?: Date,
    finishDate?: Date,
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

    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function markCurrentCycleAsFinished() {
        setCycles((state) => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId) {
                    return {...cycle, finishDate: new Date()}
                } else {
                    return cycle
                }
            })
        )
    }
    

        
    function CreateNewCycle(data: createCycleData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles(state => [...state, newCycle])

        setActiveCycleId(newCycle.id)
    }

    
    function InterruptCurrentCycle() {
        setCycles((state) => 
        state.map((cycle) => {
            if(cycle.id === activeCycleId) {
                return {...cycle, interrupteDate: new Date()}
            } else {
                return cycle
            }
        })
    )

        setActiveCycleId(null)
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
