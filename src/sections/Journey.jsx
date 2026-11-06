import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks/motion'
import { outside } from '../data/profile'
import { asset } from '../utils/asset'

const COLORS = ['var(--c-interface)', 'var(--c-infra)', 'var(--c-ia)', 'var(--c-backend)']

const photo = (file, w, h, alt, extension = 'webp', zoom = 1, objectPosition = 'center') => ({
  src: asset(`/assets/img/me/${file}.${extension}`),
  w,
  h,
  alt,
  zoom,
  objectPosition,
})

const STEPS = [
  {
    title: 'Onde tudo começou: Brilha Veículos',
    text: [
      'Meu primeiro emprego foi em um almoxarifado de peças automotivas. Por lá, fazia um pouco de tudo: desmontava carros, organizava peças e até criava anúncios na OLX. Foi nesse ambiente, longe de qualquer empresa de tecnologia, que comecei a perceber como a programação poderia facilitar o dia a dia.',
      'Em meio à rotina, criei um script para ajudar o dono a republicar os anúncios e colocá-los novamente no topo da plataforma. Era algo simples, mas foi uma das primeiras vezes em que consegui usar código para resolver um problema real. Sem perceber, já estava dando meus primeiros passos na área.',
    ],
    photos: [
      photo('almoxarifado-1', 720, 960, 'Octávio ainda jovem, de óculos, ao lado de um carro cinza com o capô aberto, na loja de veículos'),
      photo('almoxarifado-2', 720, 960, 'Octávio ainda jovem, de óculos, sentado à mesa de atendimento da loja, ao lado do computador e do telefone'),
    ],
  },
  {
    title: 'Os primeiros passos: Jovem Aprendiz',
    text: 'Depois da Brilha Veículos, fui trabalhar como jovem aprendiz em uma garagem de ônibus aqui em Belo Horizonte. Ainda muito novo, estava conhecendo diferentes ambientes de trabalho e descobrindo o que queria para o futuro. Foi nessa época que percebi o que realmente queria, e meu interesse pela tecnologia começou a crescer, mesmo sem saber exatamente onde isso me levaria.',
    photos: [
      photo('garagem-onibus-1', 960, 640, 'Ônibus vermelhos estacionados lado a lado em um pátio de garagem'),
      photo('garagem-onibus-2', 960, 720, 'Galpão de uma garagem de ônibus, com os ônibus guardados ao fundo'),
    ],
  },
  {
    title: 'SENAI e SESI: uma oportunidade que abriu portas',
    text: [
      'Nessa época, conquistei uma bolsa de estudos para cursar o ensino médio no SESI e, ao mesmo tempo, fazer o curso técnico em Desenvolvimento de Sistemas no SENAI, tudo gratuitamente.',
      'Foi uma oportunidade muito importante para mim. Enquanto ainda estava no ensino médio, já começava a conhecer o mundo da programação e a descobrir uma área que, até então, era completamente nova. Foi ali que construí minha primeira base técnica e comecei a enxergar a tecnologia como uma possibilidade real para o meu futuro.',
    ],
    photos: [
      photo('senai-formatura', 900, 675, 'Octávio com colegas de turma, sorrindo e posando juntos na formatura do SENAI, diante de um telão com a mensagem Obrigado pela atenção'),
    ],
  },
  {
    title: 'Da garagem para uma multinacional',
    text: [
      'Depois das experiências na garagem, encarei um processo seletivo longo e cheio de etapas até conquistar minha primeira oportunidade na área de tecnologia, na Stellantis. Foi uma conquista enorme para mim, principalmente porque, na mesma época, também comecei minha graduação na PUC Minas.',
      'De repente, estava em uma multinacional, trabalhando em um ambiente internacional, tendo contato com diretores, gestores e pessoas de diferentes países. Foi ali que tive minhas primeiras experiências profissionais com inglês e espanhol, atuando nas áreas de TI e eventos. Uma fase de muito aprendizado na planta de Betim da Fiat, que abriu meus olhos para as possibilidades que a tecnologia poderia me proporcionar.',
    ],
    photos: [
      photo('stellantis-1', 900, 675, 'Equipe de TI reunida em uma sala com quadro branco escrito Plant Simulation, com uma mesa de comes e bebes à frente'),
      photo('stellantis-2', 900, 496, 'Octávio sorrindo, com o polegar para cima, sentado à mesa de um restaurante com um colega de camisa cinza'),
    ],
  },
  {
    title: 'Faculdade e os primeiros passos na TI',
    text: [
      'Depois disso, em meio à pandemia, comecei a cursar Sistemas de Informação na PUC Minas e conquistei minha primeira oportunidade de trabalho em home office, na área de suporte do Grupo Hinova. Foi uma fase de adaptação, dividindo a rotina entre faculdade e trabalho, aprendendo a lidar com problemas reais e entendendo cada vez mais como funcionava o dia a dia de uma empresa de tecnologia. Aos poucos, fui ganhando experiência e descobrindo os caminhos que queria seguir na área.',
      'Passei também pelo time de implantação da Sisloc, ainda dentro do grupo, e rodei bastante, mas meu ponto fixo era o suporte. Eu gostava muito dos colegas e do ambiente, porém sentia que ainda não era ali o meu lugar: sempre buscava me mover, entender e aprender ao máximo.',
    ],
    photos: [
      photo('hinova-equipe', 828, 606, 'Equipe do Grupo Hinova reunida à noite, em um jardim, em uma confraternização'),
      photo('hinova-equipe-2', 739, 556, 'Selfie da equipe de suporte, com camisetas e crachás, na calçada em frente ao escritório'),
    ],
  },
  {
    title: 'Garçom, para fechar a renda',
    text: 'Durante essa fase, eu sempre quis ter uma renda extra, e surgiu a oportunidade de trabalhar de garçom nos fins de semana. Ali conheci bastante gente e vivi muitas experiências que me moldaram, no trabalho duro do dia a dia, enquanto continuava aprendendo e crescendo no suporte. Foi um momento onde entendi bastante o valor do dinheiro e consegui realizar um dos meus sonhos que era conhecer a neve.',
    photos: [
      photo('garcom-equipe', 600, 1068, 'Equipe de salão de um restaurante posando ao lado de uma estátua grande do Hulk'),
      photo('garcom-equipe-2', 900, 676, 'Equipe de garçons e atendentes sorrindo e posando atrás do balcão do bar'),
    ],
  },
  {
    title: 'Minha primeira viagem internacional',
    text: [
      'Com o dinheiro que juntei trabalhando como garçom, consegui realizar minha primeira viagem internacional, para o Chile, com meus amigos. Sempre gostei da ideia de conhecer o mundo por outras perspectivas, descobrir culturas, ouvir outros idiomas e trocar experiências com pessoas que vivem realidades diferentes da minha.',
      'Essa viagem foi muito mais do que conhecer um país novo. Foi ali que percebi o quanto aprender outro idioma poderia abrir portas, tanto na vida pessoal quanto profissional. Voltei com ainda mais vontade de conhecer o mundo e, principalmente, com a decisão de retomar meus estudos de inglês.',
    ],
    photos: [
      photo('chile', 590, 784, 'Octávio de roupa preta, com um snowboard nas mãos, em uma pista de neve com montanhas ao fundo, no Chile'),
      photo('chile-2', 720, 960, 'Octávio sorrindo, de jaqueta preta, em frente a uma lagoa e montanhas cobertas de neve, no Chile'),
    ],
  },
  {
    title: 'Nérus: minha primeira oportunidade como desenvolvedor',
    text: [
      'Mesmo já sendo analista de suporte, aceitei ganhar menos para começar como estagiário de desenvolvimento na Nérus. Queria colocar em prática o que estudava e viver o dia a dia de um desenvolvedor.',
      'Comecei no ERP da empresa e evoluí para desenvolvedor júnior, assumindo projetos como o self-checkout da Livraria Leitura: interface em React, integração com o time C e APIs fiscais, com serviços em Docker e Nginx.',
      'Continuo na Nérus, aprendendo a manter sistemas em produção, trabalhar em equipe e transformar necessidades reais em software.',
    ],
    photos: [
      photo('nerus', 828, 1472, 'Octávio em uma videochamada durante o trabalho na Nérus', 'jpg', 1.35, 'right center'),
      { ...photo('nerus-3', 1124, 1600, 'Octávio usando uma camiseta da Nérus', 'jpeg'), objectFit: 'contain' },
    ],
  },
  {
    title: 'Explorando novos caminhos: Marketing e automações',
    text: [
      'Na Planads, empresa de marketing de São Paulo, explorei IA e automação de processos. Com n8n, webhooks e APIs REST, conectei o atendimento no WhatsApp ao Pipedrive para qualificar e registrar leads automaticamente.',
      'Essa experiência me ensinou a olhar além do código: entender o processo comercial e criar integrações que reduzem o trabalho manual da equipe.',
    ],
    photos: [
      { ...photo('planads', 720, 372, 'Planads: marketing e automações', 'png'), objectFit: 'contain' },
    ],
  },
  {
    title: 'Hoje: construindo meu próprio caminho',
    text: [
      'Hoje, continuo minha trajetória como desenvolvedor na Nérus e, fora do expediente, me dedico à Lume Soluções Digitais, onde desenvolvo projetos para clientes e aprendo cada vez mais sobre negócios e tecnologia.',
      'Também sigo estudando inglês e me aprofundando em inteligência artificial, LLMs, RAG, agentes de IA, arquitetura de software e System Design. Estou quase terminando minha graduação por completo também.',
      'Ainda tenho muito a aprender, lugares para conhecer e sonhos para realizar. Quero continuar evoluindo, participar de projetos desafiadores e construir uma carreira que me permita explorar o mundo e novas oportunidades.',
    ],
    photos: [
      {
        src: asset('/assets/img/me/hoje-sorrindo.jpg'),
        w: 720,
        h: 1280,
        alt: 'Octávio sorrindo com os braços cruzados',
        objectPosition: 'center 60%',
      },
      photo('hoje-espelho', 960, 1280, 'Octávio tirando uma foto no espelho do elevador', 'jpg'),
    ],
  },
]

export default function Journey() {
  const mobile = useMediaQuery('(max-width: 900px)')
  const [expandedPhoto, setExpandedPhoto] = useState(null)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!expandedPhoto) return undefined
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [expandedPhoto])

  return (
    <section id="trajetoria" data-section="trajetoria" className="journey" aria-labelledby="journey-title">
      <div className="journey__grid container">
        <header className="journey__head">
          <h2 id="journey-title" className="h2" data-reveal>
            De onde eu vim
          </h2>
          <p className="lede" data-reveal>
            Entrei na área ainda muito novo e fui crescendo por etapas, do suporte ao desenvolvimento.
          </p>
        </header>

        <ol className="timeline">
          {STEPS.map((st, i) => (
            <li
              key={st.title}
              className={st.photos ? 'has-photos' : undefined}
              data-reveal
              style={{ '--d': `${i * 60}ms` }}
            >
              <div className="timeline__text">
                <h3>{st.title}</h3>
                {[].concat(st.text).map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
              {st.photos && (
                <div className="timeline__media">
                  <div
                    className="timeline__photos"
                    style={{ '--ar': st.photosAspect || (st.photos.reduce((a, p) => a + p.w / p.h, 0)).toFixed(3) }}
                  >
                    {st.photos.map((p) => (
                      <figure key={p.src} style={{ flexGrow: p.w / p.h }}>
                        <button type="button" className="timeline__photo-open" disabled={!mobile}
                          aria-label={`Ampliar foto: ${p.alt}`} onClick={() => setExpandedPhoto(p)}>
                        <img
                          src={p.src}
                          alt={p.alt}
                          loading="lazy"
                          width={p.w}
                          height={p.h}
                          style={{ '--zoom': p.zoom, '--photo-position': p.objectPosition, objectFit: p.objectFit }}
                        />
                        </button>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="journey__outside container">
        <h3 className="journey__sub" data-reveal>Fora do código</h3>
        <ul>
          {outside.map((o, i) => (
            <li key={o.title} data-reveal style={{ '--g': COLORS[i % COLORS.length], '--d': `${i * 70}ms` }}>
              <h4>{o.title}</h4>
              <p>{o.text}</p>
              {o.image && (
                <img className="journey__outside-photo" src={o.image} alt={o.imageAlt} width={o.imageWidth || 960} height={o.imageHeight || 1280} loading="lazy" />
              )}
            </li>
          ))}
        </ul>
      </div>
      <dialog ref={dialogRef} className="journey__lightbox" aria-label="Foto ampliada"
        onClose={() => setExpandedPhoto(null)}
        onClick={(event) => { if (event.target === event.currentTarget) setExpandedPhoto(null) }}>
        <button type="button" className="journey__lightbox-close" aria-label="Fechar foto" onClick={() => setExpandedPhoto(null)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
        {expandedPhoto && <img src={expandedPhoto.src} alt={expandedPhoto.alt} />}
      </dialog>
    </section>
  )
}
