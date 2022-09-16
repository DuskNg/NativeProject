import { AuthProvider } from "./src/context/AuthContext";
import AppNav from "./navigation/AppNav";

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}
