import { Chat } from "./sections/Chat";
import { Header } from "./sections/header";
import { Ideas } from "./sections/Ideas";

function App() {
  return (
    <div className="flex flex-col items-center gap-8 h-screen pb-12">
      <Header />
      <div className="flex-1 overflow-auto">
        <Chat />
      </div>
      <Ideas />
    </div>
  );
}

export default App;
