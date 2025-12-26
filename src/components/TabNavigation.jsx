import React, { useState } from 'react';
import { BookOpen, Clock, Heart, Menu, X } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const tabs = [
        { id: 'apresentacao', label: 'Apresentação', icon: BookOpen },
        { id: 'timeline', label: 'Linha do Tempo', icon: Clock },
        { id: 'homenagens', label: 'Homenagem Póstuma', icon: Heart }
    ];

    // Função para scroll to top
    const handleNavClick = (e) => {
        // Apenas fazer scroll se clicar na área vazia (não nos botões)
        if (e.target === e.currentTarget) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav
            className="w-full bg-[#2d5a4c] shadow-lg sticky top-0 z-50 border-b border-[#1a3c32]"
            onClick={handleNavClick}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">

                    {/* Logo / Título à Esquerda */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <h1 className="text-[17px] sm:text-xl md:text-2xl font-serif font-bold tracking-wide text-white">
                            Linha do Tempo da Bioética
                        </h1>
                    </div>

                    {/* Menu Desktop */}
                    <div className="hidden md:flex items-center gap-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-white text-[#2d5a4c] shadow-sm'
                                        : 'text-green-100 hover:bg-[#3d6a5c] hover:text-white'
                                        }`}
                                >
                                    <Icon size={16} />
                                    <span className="font-sans">{tab.label.toLowerCase()}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Botão Hamburger (Mobile) */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-green-100 hover:text-white p-2 rounded-md hover:bg-[#3d6a5c] transition-colors"
                            aria-label="Abrir menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#2d5a4c] border-t border-[#1a3c32] shadow-xl absolute w-full left-0 z-50 animate-in slide-in-from-top-2">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        setIsMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium transition-all duration-200 ${isActive
                                        ? 'bg-white text-[#2d5a4c] shadow-sm'
                                        : 'text-green-100 hover:bg-[#3d6a5c] hover:text-white'
                                        }`}
                                >
                                    <Icon size={20} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default TabNavigation;
