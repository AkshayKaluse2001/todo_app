import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
      <div className="bg-white   p-8 max-w-md text-center">
        <h2 className="text-4xl font-bold text-red-600 mb-4">
          404 - Not Found
        </h2>
        <p className="text-lg mb-6 text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-6 py-3  text-blue-600 text-lg font-medium transition duration-300"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
