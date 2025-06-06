import { Router } from "./Router";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "context/index";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <Router />
        <ToastContainer />
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;
