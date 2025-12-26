import React from 'react';
import { Leaf } from 'lucide-react';

const Apresentacao = () => {
    return (
        <div className="min-h-screen bg-[#f0f4f1] flex items-center justify-center p-6 relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-multiply"
                style={{
                    backgroundImage: `url('/Texture.svg')`,
                    backgroundSize: '300px',
                    backgroundRepeat: 'repeat'
                }}>
            </div>
            <div className="max-w-4xl mx-auto animate-in fade-in duration-500">

                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-8 border-[#2d5a4c] relative overflow-hidden">

                    {/* Elemento decorativo de fundo */}
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Leaf size={400} className="text-[#8ba894]" />
                    </div>

                    <h2 className="text-4xl font-serif font-bold text-[#1a3c32] mb-8 border-b-2 border-[#8ba894]/30 pb-4 relative z-10">
                        2025: um ano importante para a história da Bioética no Brasil
                    </h2>

                    <div className="prose prose-stone prose-lg text-stone-700 leading-relaxed text-justify relative z-10">
                        <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-[#2d5a4c] first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:mt-1">
                            Em 2025 a Sociedade Brasileira de Bioética (SBB) completou 30 anos e os 20 anos da Declaração Universal sobre Bioética e Direitos Humanos da UNESCO. Nesse mesmo ano a Coordenação Nacional de Ética em Pesquisa (CONEP) também completou os seus 30 anos. Ainda, em 2025, foi realizado conjuntamente o XVI Congresso Brasileiro de Bioética, o V Congresso de Bioética do Rio de Janeiro e o I Simpósio de Contribuições da Bioética para o SUS na Universidade Federal do Rio de Janeiro (UFRJ), campus da Praia Vermelha. Sob o tema "Bioética Crítica, Interseccionalidade e Pluralidade", o evento contou com a participação de professores/as, pesquisadores/as, estudantes e sociedade civil de diferentes regiões do Brasil e exterior. Essa iniciativa expressou o compromisso da Bioética com seus diversos campos de atuação, tais como: Bioética Animal, Bioética clínica, Bioética e educação, Bioética e ética em pesquisa, Bioética e inteligência artificial, Bioética e interseccionalidade: gênero, raça/cor/etnia e classe, Bioética e saúde coletiva, Bioética social e ambiental, Bioética, biotecnologia e biotecnociência, Bioética, cidadania e multiculturalismo, Bioética, direitos humanos e biodireto, Bioética: questões de início e final de vida, e Fundamentos teóricos da Bioética.
                        </p>

                        <p>
                            É nesse mesmo ano de significativa importância para a Bioética que o Programa de Pós-graduação em Bioética, Ética Aplicada e Saúde Coletiva, o PPGBIOS, completa 15 anos. Em associação entre quatro Instituições de Ensino Superior de grande importância no país – UFRJ, Fiocruz, UERJ e UFF, o Programa se consolidou com um espaço de referência no campo da Bioética no Brasil, formando doutores e mestres que têm levado para os seus exercícios profissionais os debates, conhecimentos e as reflexões que a área propõe.
                        </p>

                        <p>
                            O acúmulo dos esforços da comunidade de docentes, discentes e técnicos administrativos do PPGBIOS ao longo desses 15 anos se refletem neste trabalho, uma iniciativa de mestrandos/as e doutorandos/as do Programa. Entusiasmados/as com as inúmeras atividades acadêmicas em torno da Bioética e o aniversário do PPGBIOS em 2025, produziram um breve histórico da Bioética no Brasil e mundo, marcando o encerramento das atividades do corrente ano na XI Jornada de Bioética do PPGBIOS.
                        </p>

                        <p className="text-lg font-medium text-[#1a3c32] bg-[#8ba894]/10 p-4 rounded-lg border-l-4 border-[#2d5a4c]">
                            A linha do tempo apresentada neste material é um resultado do esforço coletivo e colaborativo que visa demonstrar a inserção e relevância da Bioética em diferentes momentos históricos. Destaca-se, ainda, a Bioética como um campo de produção e disseminação de saberes científicos transdisciplinares, comprometida com demandas básicas que clamam por justiça social e a defesa de um mundo mais igualitário e equânime para todas e todos nós.
                        </p>

                        <div className="mt-12 mb-4 p-8 bg-stone-50 rounded-xl border border-stone-200">
                            <h3 className="text-2xl font-serif font-bold text-[#2d5a4c] mb-6 text-center">
                                Grupo de Trabalho
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-bold text-[#1a3c32] mb-3 uppercase tracking-wider text-sm border-b border-[#8ba894] pb-1">
                                        Discentes
                                    </h4>
                                    <ul className="space-y-1 text-lg text-stone-700 leading-relaxed">
                                        <li>Gabriel Isola Braga</li>
                                        <li>Juliana Soares da Silva</li>
                                        <li>Diogo Felipe Corecha do Nascimento</li>
                                        <li>Bruno Peres Lima</li>
                                        <li>Maria da Conceição Antônio</li>
                                        <li>Celina Szuchmacher Oliveira</li>
                                        <li>Márcia Marques Marinho Castro</li>
                                        <li>Anna Catarina Skacel</li>
                                        <li>Iraneide Castro</li>
                                        <li>Elisa de Santana Batalha</li>
                                        <li>Ana Paula Marques</li>
                                        <li>Jussara Bravin</li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-bold text-[#1a3c32] mb-3 uppercase tracking-wider text-sm border-b border-[#8ba894] pb-1">
                                        Docentes
                                    </h4>
                                    <ul className="space-y-1 text-lg text-stone-700 leading-relaxed">
                                        <li>Marisa Palácios</li>
                                        <li>Simone Maria</li>
                                        <li>Sérgio Rego</li>
                                        <li>Fábio Oliveira</li>
                                        <li>Andreia Gomes</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Logos */}
                        <div className="flex flex-col items-center gap-2 mt-12 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                            {/* Logo PPGBIOS */}
                            <img
                                src="/logo_ppgbios.png"
                                alt="Logo PPGBIOS"
                                className="h-36 md:h-48 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                            />

                            {/* Logos Universidades */}
                            <div className="flex flex-wrap justify-center items-center gap-8 mt-1">
                                <img
                                    src="/ufrj-horizontal-cor-rgb-completa-telas.png"
                                    alt="UFRJ"
                                    className="h-16 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                                />
                                <img
                                    src="/marcafiocruz_vertical_POSITIVA_24052024.png"
                                    alt="Fiocruz"
                                    className="h-16 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                                />
                                <img
                                    src="/Logo_UFF_(blue).svg.png"
                                    alt="UFF"
                                    className="h-16 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                                />
                                <img
                                    src="/logomarca-uerj.png"
                                    alt="UERJ"
                                    className="h-16 md:h-24 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Apresentacao;
