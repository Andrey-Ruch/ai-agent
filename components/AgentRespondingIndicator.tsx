import { LoaderCircle } from 'lucide-react'

interface AgentRespondingIndicatorProps {
    className?: string
}

export default function AgentRespondingIndicator({
    className = '',
}: AgentRespondingIndicatorProps) {
    return (
        <div className="flex items-center gap-2 text-primary">
            <LoaderCircle className={`size-4 animate-spin ${className}`} />
            <span className="text-sm animate-pulse">Generating...</span>
        </div>
    )
}
