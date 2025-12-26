import React, { useState, useMemo } from 'react';
import { Leaf, ChevronDown, BookOpen, X } from 'lucide-react';

// Importar dados da linha do tempo
import timelineDataRaw from '../data/timeline.json';
import CategoryFilter from './CategoryFilter';
import SearchAndPeriodFilter from './SearchAndPeriodFilter';

const TimelineSection = () => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedDecade, setSelectedDecade] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilters, setShowFilters] = useState(false); // Controla visibilidade dos filtros

    // Função para truncar texto
    const truncateText = (text, maxLength = 280) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    // Função para extrair ano numérico de strings variadas
    const getNumericYear = (yearStr) => {
        if (!yearStr) return 0;
        const str = String(yearStr).toLowerCase();

        // Casos especiais
        if (str.includes("século xix") || str.includes("seculo xix")) return 1800;
        if (str.includes("século xx") || str.includes("seculo xx")) return 1900;
        if (str.includes("anos 2000")) return 2000;

        // Extrair primeiro número de 4 dígitos encontrado
        const match = str.match(/\d{4}/);
        return match ? parseInt(match[0]) : 0;
    };

    // Processar dados: adicionar ano numérico e ordenar
    const processedData = useMemo(() => {
        return (timelineDataRaw || [])
            .map(item => ({
                ...item,
                numericYear: getNumericYear(item.year)
            }))
            .sort((a, b) => a.numericYear - b.numericYear);
    }, []);

    // Extrair décadas únicas
    const decades = useMemo(() => {
        return [...new Set(processedData.map(item => Math.floor(item.numericYear / 10) * 10))]
            .sort((a, b) => a - b);
    }, [processedData]);

    // Calcular anos mínimo e máximo dos dados
    const { minYear, maxYear } = useMemo(() => {
        if (processedData.length === 0) return { minYear: 1800, maxYear: 2025 };
        const years = processedData.map(item => item.numericYear).filter(y => y > 0);
        return {
            minYear: Math.min(...years),
            maxYear: Math.max(...years)
        };
    }, [processedData]);

    // Inicializar yearRange com os valores calculados
    const [yearRange, setYearRange] = useState([1800, 2025]);

    // Atualizar yearRange apenas se os limites padrão não forem adequados e ainda não foi modificado pelo usuário
    // Nota: Como os dados são estáticos, podemos confiar nos valores padrão ou ajustar apenas na montagem se necessário, 
    // mas para evitar loops de efeito, mantemos simples.
    // Se quiséssemos dinâmico: useState(() => { ...cálculo inicial... })

    // Função para truncar texto

    // Funções de controle de filtros
    const handleToggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handleClearAllFilters = () => {
        setSelectedCategories([]);
    };

    // Função de busca de texto
    const searchInEvent = (item, term) => {
        if (!term) return true;
        const searchLower = term.toLowerCase();
        return (
            item.title?.toLowerCase().includes(searchLower) ||
            item.summary?.toLowerCase().includes(searchLower) ||
            item.fullText?.toLowerCase().includes(searchLower) ||
            item.year?.toString().toLowerCase().includes(searchLower)
        );
    };

    // Filtrar eventos: combina busca, período, categorias e década
    const currentEvents = useMemo(() => {
        return processedData.filter(item => {
            // Filtro de busca por texto
            if (!searchInEvent(item, searchTerm)) return false;

            // Filtro de período (yearRange)
            if (item.numericYear < yearRange[0] || item.numericYear > yearRange[1]) {
                return false;
            }

            // Filtro por categorias (se houver)
            if (selectedCategories.length > 0) {
                const matchesCategory = item.categories && item.categories.some(cat => selectedCategories.includes(cat));
                if (!matchesCategory) return false;
            }

            // Filtro por década (se houver uma selecionada)
            if (selectedDecade !== null) {
                const matchesDecade = Math.floor(item.numericYear / 10) * 10 === selectedDecade;
                if (!matchesDecade) return false;
            }

            return true; // Passou por todos os filtros
        });
    }, [processedData, searchTerm, yearRange, selectedCategories, selectedDecade]);

    // Formatar label da década
    const formatDecadeLabel = (dec) => {
        if (dec === 1800) return "Séc XIX";
        if (dec === 1900) return "1900";
        return dec;
    };

    return (
        <div className="w-full min-h-full bg-[#f0f4f1] flex flex-col items-center pb-20 relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: `url('/Texture.svg')`,
                    backgroundSize: '300px',
                    backgroundRepeat: 'repeat'
                }}>
            </div>

            {/* Botão para Mostrar/Ocultar Filtros */}
            {showFilters && (
                <>
                    {/* Busca e Filtro de Período */}
                    <SearchAndPeriodFilter
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        yearRange={yearRange}
                        onYearRangeChange={setYearRange}
                        minYear={minYear}
                        maxYear={maxYear}
                        resultCount={currentEvents.length}
                    />

                    {/* Filtro de Categorias */}
                    <CategoryFilter
                        selectedCategories={selectedCategories}
                        onToggleCategory={handleToggleCategory}
                        onClearAll={handleClearAllFilters}
                    />
                </>
            )}

            {/* Navegação por Décadas */}
            <div className="w-full bg-[#8ba894] pt-4 pb-8 shadow-md relative z-10"> {/* Adjusted top padding to move button up */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Botão de Toggle de Filtros */}
                    <div className="flex justify-start mb-8 ml-4 md:ml-20"> {/* Added margin to center relative to title */}
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-all"
                        >
                            <ChevronDown
                                size={20}
                                className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}
                            />
                            {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                        </button>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                        {decades.map((decade) => {
                            const isActive = selectedDecade === decade;
                            return (
                                <button
                                    key={decade}
                                    onClick={() => setSelectedDecade(isActive ? null : decade)}
                                    className={`relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-300 transform hover:scale-110 group ${isActive ? 'z-10 scale-110' : 'z-0 opacity-70 hover:opacity-100'
                                        }`}
                                    aria-label={`Década ${decade}`}
                                >
                                    {/* Losango de fundo */}
                                    <div
                                        className={`absolute inset-0 transform rotate-45 shadow-lg transition-colors duration-300 ${isActive
                                            ? 'bg-[#2d5a4c] border-2 border-white'
                                            : 'bg-[#8ba894] group-hover:bg-[#3d6a5c]'
                                            }`}
                                    />
                                    {/* Texto */}
                                    <span
                                        className={`relative z-10 font-bold text-sm md:text-lg ${isActive ? 'text-white' : 'text-stone-100'
                                            }`}
                                    >
                                        {formatDecadeLabel(decade)}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Indicador visual de seta */}
                <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 text-[#8ba894]">
                    <ChevronDown size={40} fill="currentColor" />
                </div>
            </div>

            {/* Linha do Tempo Vertical */}
            <div className="max-w-4xl w-full px-4 mt-16 relative">
                {/* Linha vertical central */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[#6b8c7e] transform md:-translate-x-1/2"></div>

                {/* Eventos */}
                <div className="space-y-12">
                    {currentEvents.map((item, index) => {
                        const isLeft = index % 2 === 0;

                        return (
                            <div
                                key={item.id}
                                className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Espaçador (metade vazia) - apenas desktop */}
                                <div className="hidden md:block md:w-1/2" />

                                {/* Marcador na linha */}
                                <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-[#2d5a4c] transform -translate-x-1/2 rotate-45 border-4 border-[#f0f4f1] z-10 shadow-sm mt-6 md:mt-0"></div>

                                {/* Card do Evento */}
                                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10">
                                    <div
                                        className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-[#2d5a4c] hover:shadow-xl transition-shadow cursor-pointer relative group"
                                        onClick={() => setSelectedEvent(item)}
                                    >
                                        {/* Badge com o ano */}
                                        <span className="absolute -top-4 right-4 bg-[#2d5a4c] text-white px-3 py-1 text-sm font-bold rounded shadow-sm">
                                            {item.year}
                                        </span>

                                        {/* Título */}
                                        <h3 className="text-xl font-bold text-[#1a3c32] font-serif mt-2 mb-2 group-hover:text-[#2d5a4c] transition-colors">
                                            {item.title}
                                        </h3>

                                        {/* Texto Completo (Truncado) */}
                                        <p className="text-stone-600 text-sm leading-relaxed mb-4">
                                            {truncateText(item.fullText, 280)}
                                        </p>

                                        {/* Categorias */}
                                        {item.categories && item.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {item.categories.map((category, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-[#8ba894]/20 text-[#2d5a4c] text-xs rounded-md font-medium border border-[#8ba894]/30"
                                                    >
                                                        {category}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Link para detalhes */}
                                        <div className="flex items-center text-[#2d5a4c] font-bold text-xs uppercase tracking-wide gap-2 group-hover:underline">
                                            <BookOpen size={14} />
                                            Ler detalhes
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Mensagem se não houver eventos */}
                    {currentEvents.length === 0 && (
                        <div className="text-center py-20 opacity-50">
                            <p className="text-stone-600 text-lg">
                                Nenhum evento registrado nesta década.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Detalhes */}
            {selectedEvent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setSelectedEvent(null)}
                >
                    <div
                        className="bg-[#fcfbf9] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header do Modal */}
                        <div className="bg-[#2d5a4c] text-white p-6 relative overflow-hidden">
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 text-white/70 hover:text-white rounded-full p-1"
                                aria-label="Fechar"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex items-center gap-2 text-green-200 text-sm font-bold uppercase tracking-widest mb-2">
                                <Leaf size={14} />
                                Evento Histórico
                            </div>

                            <h2 className="text-3xl font-serif font-bold relative z-10">
                                {selectedEvent.title}
                            </h2>
                            <span className="text-xl font-mono text-green-200 block mt-1">
                                {selectedEvent.year}
                            </span>
                        </div>

                        {/* Corpo do Modal */}
                        <div className="p-8 md:p-10 overflow-y-auto max-h-[60vh]">
                            {/* Categorias no Modal */}
                            {selectedEvent.categories && selectedEvent.categories.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-3">
                                        Categorias:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedEvent.categories.map((category, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    // Adicionar categoria aos filtros se não estiver já selecionada
                                                    if (!selectedCategories.includes(category)) {
                                                        handleToggleCategory(category);
                                                    }
                                                    // Fechar modal
                                                    setSelectedEvent(null);
                                                }}
                                                className="px-3 py-1.5 bg-[#8ba894] hover:bg-[#2d5a4c] text-white text-sm rounded-md font-medium shadow-sm transition-colors cursor-pointer"
                                            >
                                                {category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <p className="text-stone-700 text-lg leading-loose text-justify">
                                {selectedEvent.fullText}
                            </p>
                        </div>

                        {/* Footer do Modal */}
                        <div className="bg-stone-100 p-4 border-t border-stone-200 flex justify-end">
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="px-6 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg font-medium transition-colors"
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimelineSection;
