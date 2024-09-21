const LoadingSpinner = () => (
  <div
    className="flex justify-center items-center h-screen"
    aria-label="Cargando"
  >
    <div className="flex space-x-2">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: `${index * 0.15}s` }}
        ></div>
      ))}
    </div>
  </div>
);

export default LoadingSpinner;
