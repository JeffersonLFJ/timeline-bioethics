import React, { useState } from 'react';
import { Heart, X, Calendar, Award } from 'lucide-react';

// Importar dados de homenageados
import tributesData from '../data/tributes.json';

const HomenagensPostumas = () => {
    const [selectedPerson, setSelectedPerson] = useState(null);

    return (
        <div className="min-h-screen bg-[#f0f4f1] py-12 px-4 sm:px-6 lg:px-8 relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: `url('/Texture.svg')`,
                    backgroundSize: '300px',
                    backgroundRepeat: 'repeat'
                }}>
            </div>
            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-[#8ba894]/20 rounded-full mb-6">
                        <Heart size={40} className="text-[#2d5a4c] fill-[#2d5a4c]" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 font-serif mb-4">
                        Homenagem Póstuma
                    </h1>
                    <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
                        Em memória dos pensadores e pioneiros que dedicaram suas vidas à construção da bioética.
                        Suas contribuições continuam iluminando nossos caminhos éticos.
                    </p>
                </div>

                {/* Grid de Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tributesData.map((pessoa) => (
                        <div
                            key={pessoa.id}
                            onClick={() => setSelectedPerson(pessoa)}
                            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group border-l-4 border-[#2d5a4c]"
                        >
                            {/* Conteúdo */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-stone-900 mb-2 font-serif group-hover:text-[#2d5a4c] transition-colors">
                                    {pessoa.name}
                                </h3>
                                <div className="flex items-center gap-2 text-stone-500 text-sm mb-3">
                                    <Calendar size={16} />
                                    <span>{pessoa.years}</span>
                                </div>
                                <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                                    {pessoa.bio.substring(0, 150)}...
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-[#2d5a4c] text-sm font-medium group-hover:text-[#1a3c32] transition-colors">
                                    <Award size={16} />
                                    <span>Ler mais</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal de Detalhes */}
                {selectedPerson && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setSelectedPerson(null)}
                    >
                        <div
                            className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative transform transition-all scale-100 max-h-[90vh] flex flex-col"
                            role="dialog"
                            aria-modal="true"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header do Modal */}
                            <div className="relative bg-gradient-to-br from-[#2d5a4c] to-[#6b8c7e] p-8 flex-shrink-0 text-white">
                                <button
                                    onClick={() => setSelectedPerson(null)}
                                    className="absolute top-4 right-4 text-white/70 hover:bg-white/20 rounded-full p-2 transition-colors"
                                    aria-label="Fechar"
                                >
                                    <X size={24} />
                                </button>

                                <div className="text-center">
                                    <Heart size={40} className="text-white fill-white mx-auto mb-4 opacity-80" />
                                    <h2 className="text-3xl font-serif font-bold mb-2">
                                        {selectedPerson.name}
                                    </h2>
                                    <div className="flex items-center justify-center gap-2 text-green-100">
                                        <Calendar size={20} />
                                        <span className="text-xl">{selectedPerson.years}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Corpo do Modal - rolável */}
                            <div className="p-8 md:p-10 overflow-y-auto flex-1">
                                <div className="prose prose-stone prose-lg max-w-none">
                                    <p className="text-lg leading-relaxed text-stone-700 first-letter:text-5xl first-letter:font-serif first-letter:text-[#2d5a4c] first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                                        {selectedPerson.bio}
                                    </p>
                                </div>
                            </div>

                            {/* Footer do Modal */}
                            <div className="bg-stone-100 p-4 border-t border-stone-200 flex justify-end flex-shrink-0">
                                <button
                                    onClick={() => setSelectedPerson(null)}
                                    className="px-6 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg font-medium transition-colors"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default HomenagensPostumas;
