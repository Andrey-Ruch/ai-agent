export default function ErrorMessage({ message }: { message: string }) {
    return <div className="p-1 text-red-600">Error: {message}</div>
}
