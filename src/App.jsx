import UploadSong from "./components/UploadSong";

function App() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black mx-auto">
      <section className="bg-gray-100 border-2 border-gray-900 rounded-lg p-8">
        <UploadSong />
      </section>
    </div>
  );
}

export default App;
