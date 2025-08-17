import { LoaderCircle } from 'lucide-react'

export default function AgentRespondingIndicator() {
    return (
        <div className="flex items-center gap-2 text-primary">
            <LoaderCircle className="size-4 animate-spin" />
            {/* <span className="text-sm animate-pulse">Thinking</span> */}
        </div>
    )
}
