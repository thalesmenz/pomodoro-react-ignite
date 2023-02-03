import { Cycle } from "./reducer";

export enum actionTypes {
    addNewCycle = 'addNewCycle',
    interruptCurrentCycle = 'interruptCurrentCycle',
    markCurrentCycleAsFinished = 'markCurrentCycleAsFinished'
}

export function addNewCycleAction(newCycle: Cycle) {
    return {
            type: actionTypes.addNewCycle,
            payload: {
                newCycle,
            }  
        }
}

export function InterruptCurrentCycleAction() {
    return {
        type: actionTypes.interruptCurrentCycle,
        }
    }

export function markCurrentCycleAsFinishedAction() {
    return {
        type: actionTypes.markCurrentCycleAsFinished,
    }
}

