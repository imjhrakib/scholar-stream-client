import "./App.css";
import Footer from "./components/shared/Footer";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navbar></Navbar>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
