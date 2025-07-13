import { LoaderCircle } from 'lucide-react'

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <LoaderCircle className="animate-spin size-8 text-primary" />
        </div>
    )
}