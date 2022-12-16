import { Homepage } from './components/page/Homepage';
import './App.css';

export const App: React.FC = () => {
  return (
    <div className="h-screen w-full bg-slate-200 p-4">
      <Homepage />
    </div>
  );
};
