import {  HomeContainer,StartCountDownButton, StopCountDownButton } from "./styles";
import { HandPalm, Play } from "phosphor-react"
import {  useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { CountDown } from "./components/CountDowm";
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CyclesContext } from "../../contexts/CyclesContext";


const newCycleFormValidationScherma = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number().min(1).max(60)
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationScherma>


export function Home() {
    
    const { CreateNewCycle, InterruptCurrentCycle, activeCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationScherma),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    const { handleSubmit, watch, reset } = newCycleForm

    function handleCreateNewCycle(data: newCycleFormData) {
        CreateNewCycle(data)
        reset()
    }

    const task = watch('task') 
    const isSubmitDisabled = !task


    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                    <CountDown />
                
                { activeCycle ? (
                <StopCountDownButton onClick={InterruptCurrentCycle} type="button">
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