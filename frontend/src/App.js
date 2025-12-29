import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      <PipelineToolbar />
      <div className="flex-1">
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
