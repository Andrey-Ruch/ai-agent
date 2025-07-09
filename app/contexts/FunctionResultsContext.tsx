'use client'

import React, { createContext, useContext, useState, FC, PropsWithChildren } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface FunctionResult {
    id: string
    functionName: string
    args: any
    result: any
    timestamp: string
    agentName?: string
    duration?: number
    status: 'success' | 'error'
}

type FunctionResultsContextValue = {
    functionResults: FunctionResult[]
    addFunctionResult: (functionName: string, args: any, result: any, agentName?: string) => void
    clearResults: () => void
}

const FunctionResultsContext = createContext<FunctionResultsContextValue | undefined>(undefined)

export const FunctionResultsProvider: FC<PropsWithChildren> = ({ children }) => {
    const [functionResults, setFunctionResults] = useState<FunctionResult[]>([])

    const addFunctionResult = (
        functionName: string,
        args: any,
        result: any,
        agentName?: string
    ) => {
        const newResult: FunctionResult = {
            id: uuidv4(),
            functionName,
            args,
            result,
            agentName,
            timestamp: new Date().toLocaleTimeString(),
            status: result.error ? 'error' : 'success',
        }

        setFunctionResults((prev) => [...prev, newResult])
    }

    const clearResults = () => setFunctionResults([])

    return (
        <FunctionResultsContext.Provider
            value={{ functionResults, addFunctionResult, clearResults }}>
            {children}
        </FunctionResultsContext.Provider>
    )
}

export function useFunctionResults() {
    const context = useContext(FunctionResultsContext)
    if (!context) {
        throw new Error('useFunctionResults must be used within a FunctionResultsProvider')
    }
    return context
}
