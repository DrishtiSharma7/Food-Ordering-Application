import Login from "./components/login";
import {Pizza} from "lucide-react";

function App() {
  
  return (
    <div className="min-h-screen bg-[#F5F1EA] p-8">
        <h1 className="text-3xl md:text-2xl font-bold text-[#1F2937] ">
          <Pizza className="inline-block mr-4" />
          Food Ordering Application
        </h1>

      <Login />
    </div>
  );
}

export default App;