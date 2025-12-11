import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Studio Share</h1>
        <p className="text-gray-600 mb-8">Secure audio sharing platform</p>
        <p className="text-sm text-gray-500">
          Access shared content by clicking the link you received
        </p>
      </div>
    </div>
  )
}
