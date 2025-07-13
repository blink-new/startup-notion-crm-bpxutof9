import { useState } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './components/layout/AppSidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/pages/Dashboard';
import { Contacts } from './components/pages/Contacts';
import { Companies } from './components/pages/Companies';
import { Deals } from './components/pages/Deals';
import { Tasks } from './components/pages/Tasks';
import { Notes } from './components/pages/Notes';
import { Settings } from './components/pages/Settings';
import { Toaster } from 'react-hot-toast';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleNewItem = () => {
    // This would open a modal or navigate to a form based on the current page
    console.log(`Creating new item for ${currentPage}`);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'contacts':
        return <Contacts onNewContact={handleNewItem} />;
      case 'companies':
        return <Companies onNewCompany={handleNewItem} />;
      case 'deals':
        return <Deals onNewDeal={handleNewItem} />;
      case 'tasks':
        return <Tasks onNewTask={handleNewItem} />;
      case 'notes':
        return <Notes onNewNote={handleNewItem} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <AppSidebar currentPage={currentPage} onPageChange={setCurrentPage} />
        
        <SidebarInset className="flex-1 flex flex-col overflow-hidden">
          <Header currentPage={currentPage} onNewItem={handleNewItem} />
          
          <main className="flex-1 overflow-auto">
            {renderPage()}
          </main>
        </SidebarInset>
      </div>
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </SidebarProvider>
  );
}

export default App;