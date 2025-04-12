export const LoginForm = () => {
  return (
    <div className="max-w-sm mx-auto mt-10 p-6 shadow-lg rounded-lg bg-white">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form action="">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded-lg mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded-lg mb-3"
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-lg"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};
