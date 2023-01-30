import {  HomeContainer,StartCountDownButton, StopCountDownButton } from "./styles";
import { HandPalm, Play } from "phosphor-react"
import { useEffect, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDowm";


interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interrupteDate?: Date,
    finishDate?: Date,
}

export function Home() {
    
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
    
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
    
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
    

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
    
    const minutesAmount = Math.floor(currentSeconds / 60)
    const secondsAmount = currentSeconds % 60

    const minutes = String(minutesAmount).padStart(2, '0')
    const seconds = String(secondsAmount).padStart(2, '0')

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

    useEffect(() => {
        if(activeCycle) {
            document.title = `${minutes}:${seconds}` 
        }
    }, [minutes,seconds, activeCycle])

    const task = watch('task') 
    const isSubmitDisabled = !task


    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                
                <NewCycleForm />
                <CountDown 
                activeCycle={activeCycle} 
                setCycles={setCycles} 
                activeCycleId={activeCycleId}
                />

                

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