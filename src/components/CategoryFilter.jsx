import React from 'react';
import { Filter, X } from 'lucide-react';

const CATEGORIES = [
    "Institucionalização",
    "Educação e Formação",
    "Legislação e Direitos",
    "Saúde Pública",
    "Ética Médica e Clínica",
    "Pesquisa e Experimentação",
    "Bioética Feminista",
    "Bioética Ambiental",
    "Bioética Animal"
];

const CategoryFilter = ({ selectedCategories, onToggleCategory, onClearAll }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="w-full bg-white py-6 shadow-md border-b-2 border-stone-200">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header do Filtro */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 text-[#2d5a4c] font-bold hover:text-[#3d6a5c] transition-colors"
                    >
                        <Filter size={20} />
                        <span>Filtrar por Categoria</span>
                        <span className="text-sm font-normal text-stone-500">
                            ({selectedCategories.length} {selectedCategories.length === 1 ? 'selecionada' : 'selecionadas'})
                        </span>
                    </button>

                    {selectedCategories.length > 0 && (
                        <button
                            onClick={onClearAll}
                            className="text-stone-500 hover:text-[#2d5a4c] transition-colors"
                            title="Limpar filtros de categoria"
                        >
                            <X size={16} />
                            Limpar filtros
                        </button>
                    )}
                </div>

                {/* Lista de Categorias */}
                {isOpen && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in duration-200">
                        {CATEGORIES.map((category) => {
                            const isSelected = selectedCategories.includes(category);
                            return (
                                <button
                                    key={category}
                                    onClick={() => onToggleCategory(category)}
                                    className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200 text-left ${isSelected
                                        ? 'bg-[#1e40af] border-[#1e40af] text-white shadow-md' // Verde Escuro Selecionado
                                        : 'bg-white border-stone-200 text-stone-700 hover:border-[#2563eb] hover:text-[#1e40af] hover:shadow-sm' // Hover verde azulado
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 flex items-center gap-2 ${isSelected
                                                ? 'bg-[#2d5a4c] text-white border-[#2d5a4c] shadow-sm'
                                                : 'bg-white text-stone-600 border-stone-200 hover:border-[#8ba894] hover:text-[#2d5a4c]'
                                                }`}
                                        >
                                            {isSelected && (
                                                <div className="w-2 h-2 bg-[#1e40af] rounded-sm"></div>
                                            )}
                                            {category}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryFilter;
