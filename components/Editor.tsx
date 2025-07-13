'use client'

import { useFunctionResults } from '@/app/contexts/FunctionResultsContext'

export default function Editor() {
    const { functionResults, clearResults } = useFunctionResults()

    console.info('\nEditor: functionResults =', functionResults)

    return (
        <div className="p-4 bg-white rounded-xl h-full">
            <h2 className="text-lg">Editor</h2>
            <div className="flex flex-col gap-2 mt-4">
                {functionResults.map((result) => (
                    <div key={result.id} className="bg-gray-100 p-2 rounded-md">
                        <p>
                            <span className="font-medium">Function name:</span> {result.functionName}
                        </p>
                        <p>
                            <span className="font-medium">Title:</span> {result.result.title}
                        </p>
                        <p>
                            <span className="font-medium">Text:</span> {result.result.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
