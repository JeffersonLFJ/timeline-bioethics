import React, { useState } from 'react';

const Footer = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <footer
            className="bg-[#2d5a4c] text-green-50 py-2 px-6 border-t-2 border-[#1a3c32] cursor-pointer sm:cursor-auto transition-all duration-300"
            onClick={() => setIsExpanded(!isExpanded)}
        >
            <div className="max-w-7xl mx-auto text-center space-y-1">
                <p className="text-sm font-medium">
                    Desenvolvido em 2025 por{' '}
                    <a
                        href="https://terraescrita.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold hover:text-green-200 transition-colors underline decoration-[#8ba894] hover:decoration-green-200"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking link
                    >
                        Terra Escrita
                    </a>
                </p>

                <div className={`${isExpanded ? 'flex' : 'hidden'} sm:flex pt-0.5 flex-col gap-0.5 animate-in slide-in-from-top-1 duration-200`}>
                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">
                        ACESSO ABERTO / CREATIVE COMMONS
                    </p>
                    <p className="text-[10px] text-green-100/90 max-w-2xl mx-auto">
                        Este conteúdo é público e destinado à disseminação do conhecimento. O uso e a reprodução são permitidos mediante <strong className="text-white">citação da fonte</strong>.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
