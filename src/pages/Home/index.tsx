import {  HomeContainer,StartCountDownButton, StopCountDownButton } from "./styles";
import { HandPalm, Play } from "phosphor-react"
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDowm";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'



interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interrupteDate?: Date,
    finishDate?: Date,
}

interface CyclesContextType {
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: () => void
    setSecondsPassed: (seconds: number) => void
}

const newCycleFormValidationScherma = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number().min(1).max(60)
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationScherma>

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
    
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationScherma),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm
    
    function handleCreateNewCycle(data: newCycleFormData) {
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date()
        }

        setCycles(state => [...state, newCycle])

        setActiveCycleId(newCycle.id)

        reset()
    }

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
    

    
    function handleInterruptCycle() {
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

   

    const task = watch('task') 
    const isSubmitDisabled = !task


    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>

                <CyclesContext.Provider 
                value={{activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed}}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                    <CountDown />
                </CyclesContext.Provider>
                
                { activeCycle ? (
                <StopCountDownButton onClick={handleInterruptCycle} type="button">
                    <HandPalm size={24} />
                    interromper
                </StopCountDownButton>
                ) : (
                <StartCountDownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountDownButton>
                )}
            </form>
        </HomeContainer>
    )
}