const Loader = () => (
  <div className="flex flex-col justify-center items-center h-32 space-y-2">
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-150"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-300"></div>
    </div>
    <p className="text-gray-600 text-lg font-medium">Loading...</p>
  </div>
);

export default Loader;
