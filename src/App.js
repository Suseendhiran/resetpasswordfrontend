import "./App.css";
import Router from "./Router";
import AuthProvider from "./Providers/AuthProvider";
import LoaderProvider from "./Providers/LoaderProvider";
//import ToastProvider from "./Providers/ToastProvider";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <LoaderProvider>
          <ToastProvider autoDismissTimeout={2000} autoDismiss={true}>
            <Router />
          </ToastProvider>
        </LoaderProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
