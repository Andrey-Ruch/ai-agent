'use client'

import { useFunctionResults } from '@/app/contexts/FunctionResultsContext'

export default function Editor() {
    const { functionResults, clearResults } = useFunctionResults()

    console.log('Editor: functionResults =', functionResults)

    return (
        <div className="p-4 bg-white h-full">
            <h2 className="text-lg">Editor</h2>
            <div className="flex flex-col gap-2 mt-4">
                {functionResults.map((result) => (
                    <div key={result.id} className="bg-gray-100 p-2 rounded-md">
                        <p>
                            <span className="font-medium">Function name:</span> {result.functionName}
                        </p>
                        <p>
                            <span className="font-medium">Result:</span> {result.result}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
