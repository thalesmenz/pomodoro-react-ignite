import { actionTypes } from "./actions"
import { produce } from 'immer'
 
interface CyclesState {
    cycles: Cycle[],
    activeCycleId: string | null
}

export interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interrupteDate?: Date,
    finishDate?: Date,
}

export function cyclesReducer(state: CyclesState, action: any) {

    switch(action.type) {
        case actionTypes.addNewCycle:
        return produce(state, draft => {
            draft.cycles.push(action.payload.newCycle)
            draft.activeCycleId = action.payload.newCycle.id
        })
        case actionTypes.interruptCurrentCycle: {

        const currentCycleIndex = state.cycles.findIndex(cycle => {
            return cycle.id === state.activeCycleId
        })

        if (currentCycleIndex < 0) {
            return state
        }

            return produce(state, draft => {

            draft.activeCycleId = null
            draft.cycles[currentCycleIndex].interrupteDate = new Date()
            })
        }

        case actionTypes.markCurrentCycleAsFinished: {

            const currentCycleIndex = state.cycles.findIndex(cycle => {
                return cycle.id === state.activeCycleId
            })
    
            if (currentCycleIndex < 0) {
                return state
            }
    
                return produce(state, draft => {
    
                draft.activeCycleId = null
                draft.cycles[currentCycleIndex].finishDate = new Date()
                })
            }

        default: 
            return state
    }
}