import React, { useState, useEffect } from 'react';
import { Search, Calendar, X } from 'lucide-react';

const SearchAndPeriodFilter = ({
    searchTerm,
    onSearchChange,
    yearRange,
    onYearRangeChange,
    minYear,
    maxYear,
    resultCount
}) => {
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
    const [isExpanded, setIsExpanded] = useState(false);

    // Debounce da busca
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(localSearchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [localSearchTerm, onSearchChange]);

    const handleClearSearch = () => {
        setLocalSearchTerm('');
        onSearchChange('');
    };

    const handleResetYearRange = () => {
        onYearRangeChange([minYear, maxYear]);
    };

    const isYearRangeActive = yearRange[0] !== minYear || yearRange[1] !== maxYear;

    return (
        <div className="w-full bg-white py-4 shadow-sm border-b border-stone-200">
            <div className="max-w-6xl mx-auto px-4">
                {/* Barra de Busca */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Input de Busca */}
                    <div className="flex-1 relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={20} />
                            <input
                                type="text"
                                value={localSearchTerm}
                                onChange={(e) => setLocalSearchTerm(e.target.value)}
                                placeholder="Buscar eventos por palavra-chave..."
                                className="w-full pl-10 pr-4 py-2 bg-white/50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a4c] focus:border-transparent transition-all"
                            />
                            {localSearchTerm && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-700"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                        {localSearchTerm && resultCount !== undefined && (
                            <p className="text-xs text-stone-500 mt-1 ml-1">
                                {resultCount} {resultCount === 1 ? 'evento encontrado' : 'eventos encontrados'}
                            </p>
                        )}
                    </div>

                    {/* Botão Filtro de Período */}
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`p-2 rounded-lg border transition-all ${isYearRangeActive
                            ? 'bg-[#2d5a4c] text-white border-[#2d5a4c]'
                            : 'bg-white/50 text-stone-600 border-stone-200 hover:border-[#8ba894] hover:text-[#2d5a4c]'
                            }`}
                    >
                        <Calendar size={20} />
                        <span className="hidden md:inline">Período</span>
                        {isYearRangeActive && (
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded">
                                {yearRange[0]}-{yearRange[1]}
                            </span>
                        )}
                    </button>
                </div>

                {/* Painel de Filtro de Período */}
                {isExpanded && (
                    <div className="mt-4 p-4 bg-stone-50 rounded-lg border border-stone-200 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-bold text-stone-700 flex items-center gap-2">
                                <Calendar size={18} />
                                Filtrar por Período
                            </h4>
                            {isYearRangeActive && (
                                <button
                                    onClick={handleResetYearRange}
                                    className="text-sm text-stone-500 hover:text-stone-700 flex items-center gap-1"
                                >
                                    <X size={14} />
                                    Resetar
                                </button>
                            )}
                        </div>

                        <div className="space-y-4">
                            {/* Inputs de Ano */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-2">
                                        Ano Inicial
                                    </label>
                                    <input
                                        type="number"
                                        min={minYear}
                                        max={yearRange[1]}
                                        value={yearRange[0]}
                                        onChange={(e) => {
                                            const newStart = Math.max(minYear, Math.min(parseInt(e.target.value) || minYear, yearRange[1]));
                                            onYearRangeChange([newStart, yearRange[1]]);
                                        }}
                                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-[#2d5a4c]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-stone-600 mb-2">
                                        Ano Final
                                    </label>
                                    <input
                                        type="number"
                                        min={yearRange[0]}
                                        max={maxYear}
                                        value={yearRange[1]}
                                        onChange={(e) => {
                                            const newEnd = Math.min(maxYear, Math.max(parseInt(e.target.value) || maxYear, yearRange[0]));
                                            onYearRangeChange([yearRange[0], newEnd]);
                                        }}
                                        className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:border-[#2d5a4c]"
                                    />
                                </div>
                            </div>

                            {/* Range Slider */}
                            <div className="relative pt-2">
                                <div className="flex justify-between text-xs text-stone-500 mb-2">
                                    <span>{minYear}</span>
                                    <span>{maxYear}</span>
                                </div>
                                <input
                                    type="range"
                                    min={minYear}
                                    max={maxYear}
                                    value={yearRange[0]}
                                    onChange={(e) => {
                                        const newStart = Math.min(parseInt(e.target.value), yearRange[1]);
                                        onYearRangeChange([newStart, yearRange[1]]);
                                    }}
                                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#2d5a4c]"
                                />
                                <input
                                    type="range"
                                    min={minYear}
                                    max={maxYear}
                                    value={yearRange[1]}
                                    onChange={(e) => {
                                        const newEnd = Math.max(parseInt(e.target.value), yearRange[0]);
                                        onYearRangeChange([yearRange[0], newEnd]);
                                    }}
                                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#2d5a4c] mt-1"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchAndPeriodFilter;
