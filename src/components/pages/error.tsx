export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900">Error</h1>
        <p className="text-lg text-gray-600">
          Ocurrió un error, reintentálo mas tarde.
        </p>
      </div>
    </div>
  );
}
