import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Toaster
            position="top-center"
            reverseOrder={false}
          />
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
