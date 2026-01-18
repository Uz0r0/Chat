import Sidebar from "@/components/Sidebar";
import ChatContainer from "@/components/ChatContainer";

const HomePage = () => {

  return (
    <div className="flex flex-col h-screen bg-[#0f1721] text-gray-200">
      <div className="flex flex-1 overflow-hidden p-2 md:p-4 gap-2 md:gap-4">
        <Sidebar />
        <ChatContainer />
      </div>
    </div>
  );
};

export default HomePage;
