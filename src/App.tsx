import { Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/header';
import Home from './pages/home';
import ViewNote from './pages/view-note';
import NotFound from './pages/not-found';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ViewNote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
