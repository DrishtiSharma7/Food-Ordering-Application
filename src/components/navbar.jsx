import { useNavigate } from "react-router-dom";
import { Pizza } from "lucide-react";

function Navbar() {
    const navigate = useNavigate();
  return (
    <div className=" bg-[#F5F1EA] p-6">
      <h1 className="flex items-center text-3xl md:text-2xl font-bold text-[#1F2937]">
        <Pizza className="mr-4" />
        Food Ordering Application
      </h1>
      
    </div>
  );
}

export default Navbar;
