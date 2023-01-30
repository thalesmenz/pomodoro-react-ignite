import { useEffect, useState } from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from 'date-fns'

interface countDownProps {
    activeCycle: any
    setCycles: any
    activeCycleId: any
}

export function CountDown({ activeCycle, setCycles, activeCycleId }: countDownProps) {

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

    useEffect(() => {
        let interval: number

        if(activeCycle) {
            interval = setInterval(() => {
                const secondsDifference = differenceInSeconds(
                    new Date(),
                     activeCycle.startDate,
                    )
            
                    if(secondsDifference >= totalSeconds) {
                    setCycles((state) => 
                        state.map((cycle) => {
                            if(cycle.id === activeCycleId) {
                                return {...cycle, finishDate: new Date()}
                            } else {
                                return cycle
                            }
                        })
                    )
                    setAmountSecondsPassed(totalSeconds)

                    clearInterval(interval)
                 } else {
                    setAmountSecondsPassed(secondsDifference)     
                    }
             }, 1000)
        }
        return () => {
           setAmountSecondsPassed(0)
        }

    }, [activeCycle, totalSeconds, activeCycleId]) 

    return (
            <CountDownContainer>
                <span>{minutes[0]}</span>
                <span>{minutes[1]}</span>
                <Separator>:</Separator>
                <span>{seconds[0]}</span>
                <span>{seconds[1]}</span>
            </CountDownContainer>
    )
}