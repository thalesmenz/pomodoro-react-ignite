import { FormContainer, MinutesInputAmount, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";
import { useFormContext } from 'react-hook-form'


export function NewCycleForm() {

    const { activeCycle } = useContext(CyclesContext)
    const { register } = useFormContext()

    return (
        <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                <TaskInput
                    id="task" 
                    list="task-suggestions"
                    disabled={!!activeCycle}
                    placeholder="Dê um nome para o seu projeto" 
                    {...register('task')}
                />

                    <datalist id='task-suggestions'>
                        <option value='Projeto 1' />
                        <option value='Projeto 2' />
                        <option value='Projeto 3' />
                        <option value='Banana' />
                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                <MinutesInputAmount
                    type="number"
                    id="minutesAmount" 
                    placeholder="00"
                    disabled={!!activeCycle}
                    step={5}
                    min={1}
                    max={60}
                    {...register('minutesAmount',{ valueAsNumber: true })}
                />
                    <span>minutos.</span>
                </FormContainer>
    )     
}