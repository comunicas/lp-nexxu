import {
  Clock, LayoutGrid, Layers, Users, Activity, Grid2x2,
  Bot, FileVideo, MessagesSquare, LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export type AccentColor = "blue" | "purple" | "teal";

export type SolucaoData = {
  id: string;
  slug: string;
  icon: LucideIcon;
  accentColor: AccentColor;
  title: string;
  cardDescription: string;
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  sintomas: string[]; // array de exatamente 3 strings
  paraQuem: string;
  oProblema: string;
  comoFunciona: { step: number; titulo: string; descricao: string }[];
  entregaveis: string[];
  faseOrdem: string;
  relacionadas: string[]; // slugs das 3 soluções relacionadas
};

export const SOLUCOES: SolucaoData[] = [
  {
    id: "diagnostico",
    slug: "diagnostico-operacional",
    icon: Clock,
    accentColor: "blue",
    title: "Diagnóstico Operacional",
    cardDescription: "Identificamos onde o negócio trava — gargalos, retrabalho e dependências do dono — em 45 dias.",
    metaTitle: "Diagnóstico Operacional para PMEs | Nexxu",
    metaDescription: "Em 45 dias mapeamos onde o seu negócio trava — gargalos, retrabalho e dependências do dono. Primeiro passo do Método ORDEM™.",
    tagline: "Antes de mudar qualquer coisa, você precisa enxergar o que está acontecendo de verdade.",
    sintomas: [
      "Você sabe que tem problemas, mas não sabe exatamente onde estão",
      "O dia vira uma sequência de apagar incêndio sem entender a causa",
      "Já tentou várias soluções mas nada mudou de verdade",
    ],
    paraQuem: "Donos de PMEs que sentem que a empresa não cresce, mas não sabem exatamente onde está o gargalo. Que apagam incêndio todo dia mas não conseguem identificar a origem.",
    oProblema: "A maioria das operações tem problemas óbvios que são tratados como naturais. Retrabalho que 'sempre aconteceu'. Dependência do dono que 'é assim mesmo'. O diagnóstico torna visível o que está invisível.",
    comoFunciona: [
      { step: 1, titulo: "Entrevista estruturada", descricao: "Com o dono e equipe-chave — mapeamos fluxos reais, não o que deveria acontecer." },
      { step: 2, titulo: "Análise de processos críticos", descricao: "Identificamos onde vaza tempo, dinheiro e energia na operação atual." },
      { step: 3, titulo: "Relatório com prioridades", descricao: "Índice ORDEM™ (nível 1 a 4) + plano priorizado de correção com próximos passos claros." },
    ],
    entregaveis: [
      "Índice ORDEM™ com nível de maturidade operacional",
      "Mapa Geral de Processos (1 página)",
      "Plano priorizado com próximos passos",
    ],
    faseOrdem: "O — Organização",
    relacionadas: ["mapeamento-de-processos", "kpis-e-gestao-com-dados", "mentoria-para-o-dono"],
  },
  {
    id: "processos",
    slug: "mapeamento-de-processos",
    icon: LayoutGrid,
    accentColor: "purple",
    title: "Mapeamento de Processos",
    cardDescription: "Quem faz, como faz, onde trava. Nada muda antes de estar claro no papel — esse é o ponto de partida.",
    metaTitle: "Mapeamento de Processos para PMEs | Nexxu",
    metaDescription: "Quem faz, como faz, onde trava. Nada muda antes de estar claro no papel. Estruturamos os processos do seu negócio com o Método ORDEM™.",
    tagline: "Sem processo claro, a solução de hoje vira o problema de amanhã.",
    sintomas: [
      "Cada funcionário faz do seu jeito — o resultado nunca é consistente",
      "Quando alguém sai, o conhecimento vai embora junto",
      "Delegou uma tarefa e precisou refazer porque 'não ficou como eu queria'",
    ],
    paraQuem: "Empresas que cresceram e as coisas foram se resolvendo sem padronização. Donos que tentaram delegar e receberam resultados inconsistentes. Times que cometem os mesmos erros repetidamente.",
    oProblema: "Processo não documentado depende de memória. Quando a pessoa que sabe como fazer sai, o conhecimento vai embora. Quando o time cresce, o caos escala junto.",
    comoFunciona: [
      { step: 1, titulo: "Workshop de processo", descricao: "Com quem executa, não com quem acha que sabe como acontece. A realidade importa mais que o organograma." },
      { step: 2, titulo: "Documentação visual", descricao: "Fluxos simples, sem burocracia, em linguagem que o time usa no dia a dia." },
      { step: 3, titulo: "Teste de operabilidade", descricao: "O processo funciona sem você explicar? Se não, voltamos ao passo 1." },
    ],
    entregaveis: [
      "Mapa de processos por área crítica",
      "Checklists operacionais por função",
      "Definição de 'pronto' para cada etapa",
      "Responsáveis definidos e documentados",
    ],
    faseOrdem: "O — Organização",
    relacionadas: ["diagnostico-operacional", "autonomia-operacional", "mentoria-para-o-dono"],
  },
  {
    id: "ia",
    slug: "implementacao-com-ia",
    icon: Layers,
    accentColor: "teal",
    title: "Implementação com IA",
    cardDescription: "IA aplicada nos pontos certos — depois do processo. Automações que eliminam retrabalho de verdade.",
    metaTitle: "Implementação com IA para Operações de PMEs | Nexxu",
    metaDescription: "IA aplicada nos pontos certos — depois do processo. Automações que eliminam retrabalho de verdade, sem gambiarra e sem hype.",
    tagline: "IA sem processo não resolve. Só adiciona gambiarra mais cara.",
    sintomas: [
      "Já testou ferramentas de IA mas não sabe se estão gerando resultado real",
      "O time usa IA de forma improvisada, sem padrão e sem processo",
      "Quer automatizar mas tem medo de escalar o caos junto",
    ],
    paraQuem: "Empresas que já têm processos mapeados e querem ganhar velocidade sem contratar mais pessoas. Donos que ouviram falar de IA mas não sabem por onde começar sem perder o controle.",
    oProblema: "A maioria das implementações de IA falha porque coloca automação em cima de caos. A IA da Nexxu entra depois do processo estar claro — e amplifica o que já funciona.",
    comoFunciona: [
      { step: 1, titulo: "Diagnóstico de pontos automatizáveis", descricao: "Identificamos onde a IA gera resultado real, não onde parece legal ou inovador." },
      { step: 2, titulo: "Implementação progressiva", descricao: "Um processo por vez, com teste controlado antes de escalar para toda a operação." },
      { step: 3, titulo: "Treinamento do time", descricao: "A IA só funciona se o time sabe usar. Entregamos o playbook e acompanhamos a adoção." },
    ],
    entregaveis: [
      "1 copiloto de IA configurado e testado",
      "1 fluxo automatizado em produção",
      "Playbook de IA para o time",
    ],
    faseOrdem: "E — Eficiência Inteligente",
    relacionadas: ["agentes-autonomos-com-ia", "mapeamento-de-processos", "dashboards-de-gestao"],
  },
  {
    id: "mentoria",
    slug: "mentoria-para-o-dono",
    icon: Users,
    accentColor: "blue",
    title: "Mentoria para o Dono",
    cardDescription: "Acompanhamento direto para o dono sair da operação e o time passar a funcionar sem depender dele.",
    metaTitle: "Mentoria Operacional para Donos de PMEs | Nexxu",
    metaDescription: "Acompanhamento direto para o dono sair da operação e o time passar a funcionar sem depender dele. Método ORDEM™ na prática.",
    tagline: "O dono que resolve tudo é o maior gargalo da empresa.",
    sintomas: [
      "Você é o único que sabe fazer tudo — e isso travou o crescimento",
      "Já tentou delegar antes e o resultado sempre voltou para você resolver",
      "Não consegue tirar férias sem o telefone tocando o dia todo",
    ],
    paraQuem: "Donos que são o hub central de todas as decisões. Que não conseguem tirar férias sem o telefone tocando. Que sabem que precisam delegar mas toda tentativa volta para eles.",
    oProblema: "A síndrome do bombeiro-chefe não é falta de esforço — é falta de estrutura. Quando não existe padrão, a delegação sempre falha. A mentoria cria o padrão e ensina o dono a liderar pelo processo, não pela presença.",
    comoFunciona: [
      { step: 1, titulo: "Sessões quinzenais estruturadas", descricao: "Foco em decisões de estrutura, não em apagar incêndio. Cada sessão gera uma entrega concreta." },
      { step: 2, titulo: "Missões entre sessões", descricao: "Implementação real no negócio — não é só conversa. O progresso é medido pelo Índice ORDEM™." },
      { step: 3, titulo: "Acompanhamento de progresso", descricao: "Índice ORDEM™ usado como métrica de evolução real ao longo do engajamento." },
    ],
    entregaveis: [
      "Plano de delegação estruturado",
      "Processos de tomada de decisão documentados",
      "Rotina semanal de gestão",
    ],
    faseOrdem: "M — Maturidade Operacional",
    relacionadas: ["diagnostico-operacional", "mapeamento-de-processos", "autonomia-operacional"],
  },
  {
    id: "kpis",
    slug: "kpis-e-gestao-com-dados",
    icon: Activity,
    accentColor: "purple",
    title: "KPIs e Gestão com Dados",
    cardDescription: "Painel simples e confiável para decisões reais — sem achismo, sem planilha interminável.",
    metaTitle: "KPIs e Gestão com Dados para PMEs | Nexxu",
    metaDescription: "Painel simples e confiável para decisões reais — sem achismo, sem planilha interminável. Saiba exatamente onde sua operação ganha e onde perde.",
    tagline: "Decisão no feeling é aposta. Decisão com dado é gestão.",
    sintomas: [
      "Você toma decisões importantes sem certeza se os números batem",
      "Tem dados em planilhas mas ninguém sabe o que fazer com eles",
      "Sente que a empresa cresce, mas não tem como provar nem medir",
    ],
    paraQuem: "Donos que tomam decisões importantes sem ter certeza se os números batem. Que abrem uma planilha e fecham sem entender nada. Que precisam de visão clara do negócio sem precisar de analista de dados.",
    oProblema: "Informação existe em toda empresa — está em planilhas, WhatsApp, sistemas. O problema é que não está organizada para gerar decisão. KPIs mal escolhidos geram falsa sensação de controle.",
    comoFunciona: [
      { step: 1, titulo: "Seleção de KPIs essenciais", descricao: "Máximo 5 indicadores que realmente movem o negócio. Menos é mais quando o dado gera ação." },
      { step: 2, titulo: "Fonte de dados limpa", descricao: "Organizamos de onde vêm os números antes de exibir qualquer coisa. Dado errado é pior que sem dado." },
      { step: 3, titulo: "Painel operacional simples", descricao: "Uma tela, uma olhada, você sabe o que fazer. Sem complexidade desnecessária." },
    ],
    entregaveis: [
      "Lista de KPIs por área do negócio",
      "Painel de gestão operacional configurado",
      "Rotina de revisão semanal dos dados",
    ],
    faseOrdem: "D — Dados",
    relacionadas: ["diagnostico-operacional", "dashboards-de-gestao", "autonomia-operacional"],
  },
  {
    id: "autonomia",
    slug: "autonomia-operacional",
    icon: Grid2x2,
    accentColor: "teal",
    title: "Autonomia Operacional",
    cardDescription: "Empresa funcionando sem o dono no centro. Delegação estruturada, time treinado, processo documentado.",
    metaTitle: "Autonomia Operacional para PMEs | Nexxu",
    metaDescription: "Empresa funcionando sem o dono no centro. Delegação estruturada, time treinado, processo documentado. Resultado do Método ORDEM™ em até 90 dias.",
    tagline: "Empresa autônoma não significa empresa sem dono. Significa dono que lidera em vez de operar.",
    sintomas: [
      "A empresa só funciona quando você está presente",
      "Quer escalar mas sente que vai virar um caos maior",
      "Sonha em trabalhar no negócio, mas ainda está preso dentro dele",
    ],
    paraQuem: "Donos que chegaram no teto do que conseguem fazer pessoalmente. Que querem escalar sem inflar custo fixo. Que sonham em trabalhar no negócio, não dentro dele.",
    oProblema: "Autonomia não acontece por acidente. Ela é construída — processo por processo, delegação por delegação. Sem estrutura, o time volta a depender do dono em qualquer mudança de rotina.",
    comoFunciona: [
      { step: 1, titulo: "Estruturação do modelo de decisão", descricao: "O que o time resolve, o que sobe para o dono. Claro, documentado, sem ambiguidade." },
      { step: 2, titulo: "Treinamento do time", descricao: "Não basta ter processo; o time precisa saber executar sem perguntar. Treinamento com validação prática." },
      { step: 3, titulo: "Validação da autonomia", descricao: "Testamos o funcionamento sem o dono antes de considerar entregue. Se não funcionar, não entregamos." },
    ],
    entregaveis: [
      "Matriz de decisão (o que delega, o que não delega)",
      "Time treinado com playbooks por função",
      "Plano de evolução para os próximos processos",
    ],
    faseOrdem: "M — Maturidade Operacional",
    relacionadas: ["mentoria-para-o-dono", "mapeamento-de-processos", "kpis-e-gestao-com-dados"],
  },
  {
    id: "agentes",
    slug: "agentes-autonomos-com-ia",
    icon: Bot,
    accentColor: "purple",
    title: "Agentes Autônomos com IA",
    cardDescription: "Agentes que executam tarefas repetitivas por conta própria — sem depender de pessoa, sem esquecer, sem errar o passo.",
    metaTitle: "Agentes Autônomos com IA para PMEs | Nexxu",
    metaDescription: "Agentes de IA que executam tarefas repetitivas sem depender de pessoa — qualificação de leads, atendimento inicial, atualização de registros. Processo primeiro, automação depois.",
    tagline: "Um agente bem construído trabalha enquanto você dorme. Um mal construído cria problema enquanto você dorme.",
    sintomas: [
      "Seu time perde horas em tarefas que sempre são as mesmas",
      "O volume de interações aumentou mas a qualidade caiu",
      "Já tentou automação antes e o resultado foi um bot que irritava o cliente",
    ],
    paraQuem: "Empresas com tarefas repetitivas que consomem tempo de pessoas qualificadas. Donos que percebem que o time gasta energia em atividades que sempre são as mesmas. Negócios que recebem volume alto de interações.",
    oProblema: "Agente de IA construído sem processo vira um bot que erra e irrita o cliente. A Nexxu projeta o processo antes de automatizar — o agente executa o que foi validado por humanos, não o que parece certo para a IA.",
    comoFunciona: [
      { step: 1, titulo: "Mapeamento da tarefa a automatizar", descricao: "Detalhamos cada decisão que o agente precisará tomar. Sem clareza aqui, o agente vai errar ali." },
      { step: 2, titulo: "Construção e teste controlado", descricao: "O agente começa em paralelo com humano antes de operar sozinho. Só escala quando validado." },
      { step: 3, titulo: "Handoff documentado", descricao: "O time sabe quando o agente pode resolver e quando precisa escalar para pessoa. Sem zona cinza." },
    ],
    entregaveis: [
      "Agente configurado e testado em produção",
      "Documentação do fluxo de decisão do agente",
      "Playbook de monitoramento",
      "Critérios de escalação para humano",
    ],
    faseOrdem: "E — Eficiência Inteligente",
    relacionadas: ["implementacao-com-ia", "atendimento-escalavel-com-ia", "dashboards-de-gestao"],
  },
  {
    id: "conteudo",
    slug: "gestao-de-conteudo-com-ia",
    icon: FileVideo,
    accentColor: "teal",
    title: "Gestão de Conteúdo com IA",
    cardDescription: "Roteiros, imagens, áudio e vídeos produzidos com consistência — sem improvisar brief, sem perder identidade de marca a cada peça.",
    metaTitle: "Gestão de Conteúdo com IA para PMEs | Nexxu",
    metaDescription: "Roteiros, imagens, áudio e vídeos produzidos com consistência de marca — sem improvisar brief, sem perder identidade a cada peça. IA aplicada no processo de conteúdo.",
    tagline: "Conteúdo produzido no improviso parece feito no improviso. O cliente percebe.",
    sintomas: [
      "Produz conteúdo no improviso — sem calendário, sem padrão, sem resultado",
      "Depende de agência ou freelancer para cada peça e perdeu o controle da voz",
      "Quer usar IA para produzir mais, mas o conteúdo não parece da sua empresa",
    ],
    paraQuem: "PMEs que precisam produzir conteúdo regularmente mas não têm equipe dedicada. Donos que dependem de agência para cada post e perdem o controle da narrativa. Negócios que querem usar IA para escalar produção sem perder a voz da marca.",
    oProblema: "A maioria das empresas produz conteúdo sem processo: sem calendário fixo, sem briefing padrão, sem linha editorial definida. O resultado é inconsistência — que enfraquece a marca e desperdiça o investimento.",
    comoFunciona: [
      { step: 1, titulo: "Definição da linha editorial", descricao: "Pilares de conteúdo, tom de voz, formatos prioritários alinhados ao ICP. Clareza antes de produção." },
      { step: 2, titulo: "Estruturação do fluxo de produção", descricao: "Quem aprova, quem executa, qual a cadência realista para o seu time e orçamento." },
      { step: 3, titulo: "Configuração das ferramentas de IA", descricao: "Prompts calibrados para a voz da marca, templates reutilizáveis, fluxo que o time consegue operar." },
    ],
    entregaveis: [
      "Calendário editorial 30 dias",
      "Templates de roteiro por formato",
      "Prompts de IA calibrados para a marca",
      "Fluxo de aprovação documentado",
    ],
    faseOrdem: "R — Rotinas",
    relacionadas: ["agentes-autonomos-com-ia", "atendimento-escalavel-com-ia", "implementacao-com-ia"],
  },
  {
    id: "atendimento",
    slug: "atendimento-escalavel-com-ia",
    icon: MessagesSquare,
    accentColor: "blue",
    title: "Atendimento Escalável com IA",
    cardDescription: "IA que analisa padrões de comportamento em redes sociais e atendimento — e responde com contexto, não com script genérico.",
    metaTitle: "Atendimento Escalável com IA para PMEs | Nexxu",
    metaDescription: "IA que analisa padrões de comportamento em redes sociais e atendimento — e responde com contexto, não com script genérico. Escale sem perder qualidade.",
    tagline: "Atendimento ruim escala rápido. Atendimento bom precisa de processo antes de IA.",
    paraQuem: "Negócios que recebem volume alto de mensagens e não conseguem responder com qualidade. Donos que percebem que o atendimento está perdendo vendas mas não sabem onde. Empresas que já tentaram chatbot e o cliente odiou.",
    oProblema: "A maioria dos chatbots falha porque tenta substituir o atendimento humano antes de entender o que o cliente realmente pergunta. A Nexxu mapeia os padrões de interação reais e treina a IA com o que funciona.",
    comoFunciona: [
      { step: 1, titulo: "Análise comportamental", descricao: "Mapeamos os padrões de interação no Instagram, WhatsApp e outros canais ativos. O que o cliente realmente quer." },
      { step: 2, titulo: "Categorização de intenções", descricao: "Classificamos o que o cliente quer em cada tipo de mensagem antes de construir qualquer automação." },
      { step: 3, titulo: "Construção do fluxo de atendimento", descricao: "IA resolve o que pode, escala para humano o que precisa. Sem chatbot genérico, sem frustração do cliente." },
    ],
    entregaveis: [
      "Mapa de intenções do cliente por canal",
      "Fluxo de atendimento por canal configurado",
      "IA com respostas contextuais",
      "Critérios de escalação documentados",
      "Relatório de padrões comportamentais",
    ],
    faseOrdem: "E — Eficiência Inteligente",
    relacionadas: ["agentes-autonomos-com-ia", "gestao-de-conteudo-com-ia", "kpis-e-gestao-com-dados"],
  },
  {
    id: "dashboards",
    slug: "dashboards-de-gestao",
    icon: LayoutDashboard,
    accentColor: "teal",
    title: "Dashboards de Gestão Customizados",
    cardDescription: "Painel feito para o seu negócio — com os indicadores certos, na visão certa, para quem precisa tomar decisão.",
    metaTitle: "Dashboards Customizados para Gestão de PMEs | Nexxu",
    metaDescription: "Painel feito para o seu negócio — com os indicadores certos, na visão certa, para quem precisa tomar decisão. Conectado às fontes reais de dados da operação.",
    tagline: "Dashboard genérico não serve para nenhum negócio. Dashboard certo serve para o seu.",
    paraQuem: "Donos que abrem uma planilha e fecham sem entender. Gestores que recebem relatório cheio de dados mas não sabem o que fazer. Empresas que cresceram e precisam de visão centralizada do negócio.",
    oProblema: "Dado isolado não gera decisão. O problema não é falta de informação — é excesso de informação mal organizada. Um bom dashboard mostra o que importa, esconde o que não importa, e deixa claro o que precisa de ação.",
    comoFunciona: [
      { step: 1, titulo: "Levantamento das fontes de dado", descricao: "CRM, WhatsApp, planilhas, ERP — qualquer lugar onde o dado existe. Mapeamos antes de conectar." },
      { step: 2, titulo: "Definição dos KPIs por perfil", descricao: "O dono vê uma coisa, o gerente vê outra, o time operacional vê outra. Cada visão tem seu propósito." },
      { step: 3, titulo: "Construção e validação", descricao: "O dashboard só é aprovado quando o usuário consegue tomar uma decisão com ele. Sem isso, não entregamos." },
    ],
    entregaveis: [
      "Dashboard operacional por perfil de usuário",
      "Conexão com fontes de dado existentes",
      "Documentação de manutenção",
      "Treinamento de uso para o time",
    ],
    faseOrdem: "D — Dados",
    relacionadas: ["kpis-e-gestao-com-dados", "implementacao-com-ia", "agentes-autonomos-com-ia"],
  },
];

export function getSolucaoBySlug(slug: string): SolucaoData | undefined {
  return SOLUCOES.find((s) => s.slug === slug);
}

export function getSolucoesBySlugList(slugs: string[]): SolucaoData[] {
  return slugs.map((slug) => SOLUCOES.find((s) => s.slug === slug)).filter(Boolean) as SolucaoData[];
}
