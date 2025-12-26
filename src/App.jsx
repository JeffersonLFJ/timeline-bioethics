import React, { useState } from 'react';

// Importar componentes de navegação e seções
import TabNavigation from './components/TabNavigation';
import Apresentacao from './components/Apresentacao';
import HomenagensPostumas from './components/HomenagensPostumas';
import TimelineSection from './components/TimelineSection';
import Footer from './components/Footer';

const App = () => {
  // Estado para controlar qual aba está ativa
  const [activeTab, setActiveTab] = useState('timeline');

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-[#f4f1ea] font-sans text-stone-800 overflow-hidden">

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conteúdo condicional baseado na aba ativa */}
      <div className="flex-1 overflow-auto">

        {/* Apresentação */}
        {activeTab === 'apresentacao' && <Apresentacao />}

        {/* Linha do Tempo */}
        {activeTab === 'timeline' && <TimelineSection />}

        {/* Homenagens Póstumas */}
        {activeTab === 'homenagens' && <HomenagensPostumas />}

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default App;