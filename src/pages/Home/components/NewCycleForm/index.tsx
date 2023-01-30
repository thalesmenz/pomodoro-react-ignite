import { FormContainer, MinutesInputAmount, TaskInput } from "./styles";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidationScherma = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod.number().min(1).max(60)
})

type newCycleFormData = zod.infer<typeof newCycleFormValidationScherma>

export function NewCycleForm() {

    const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
        resolver: zodResolver(newCycleFormValidationScherma),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })



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