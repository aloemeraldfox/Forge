import { useState, useEffect, useRef } from "react";

const SECTIONS = {
  cosmology: {
    label: "Cosmology",
    kanji: "宇宙",
    reading: "Uchū",
    content: `In the beginning, heaven and earth were not yet separated. The universe existed as something like an egg — undifferentiated, without form or direction. Within this formlessness, the lighter and purer elements rose to become heaven, the heavier and murkier sank to become earth. This is the opening of the Kojiki, the Record of Ancient Matters, compiled in 712 CE — the oldest surviving account of Japanese cosmology.

From this separation emerged the first kami: alone, invisible, without form, existing as pure potentiality. These earliest deities did not act. They came into being and then concealed themselves. Creation was not a single act but a gradual process of refinement, each generation of kami more defined than the last.

The pair who finally acted were Izanagi and Izanami — He Who Invites and She Who Invites. Standing on the Floating Bridge of Heaven, they stirred the primordial ocean with a jeweled spear. When they withdrew it, the drops that fell became the first island. They descended, built a pillar, and walked around it — and from their union came the islands of Japan and many of the kami who inhabit them.

This cosmology does not posit a single moment of creation or a creator apart from creation. The kami emerge from the process itself. Heaven and earth are not opposites but the two faces of one reality as it becomes more defined. The movement is always from formlessness toward form, from concealment toward manifestation.

**Musubi** is the generative force underlying all of this — the power of growth, of things coming together and becoming more than they were. It is not a deity but a quality that flows through kami and humans and the natural world alike. Shinto practice is largely about remaining open to musubi, not blocking the current.

The cosmos in Onmyōdō was further structured by the interaction of **In and Yō** — the Japanese reading of yin and yang — and the **Go-gyō**, the five phases: wood, fire, earth, metal, water. These were not static elements but processes in perpetual cycle. Wood feeds fire, fire creates earth (ash), earth yields metal, metal collects water, water nourishes wood. Each phase also controls another — the controlling cycle running in a different direction. An Onmyōji read the moment by understanding which phase was dominant, which was waning, where disruption was likely.

Time itself had texture. Certain days, hours, and directions carried specific qualities determined by the interaction of the ten Heavenly Stems and twelve Earthly Branches — the same system that underlies the Chinese zodiac, but applied with greater precision to the practice of determining what was and was not auspicious.`
  },

  pantheon: {
    label: "Kami",
    kanji: "神",
    reading: "Kami",
    content: `The kami are not gods in the Western sense. They do not stand apart from the world and govern it from above. They are the quality of presence, of aliveness, that inhabits places, objects, phenomena, and certain exceptional people. The word itself resists clean translation — the scholar Motoori Norinaga in the 18th century described kami as anything that possessed an extraordinary quality that inspired awe, whether benevolent or terrible, large or small.

**Amaterasu Ōmikami** — The Great Divinity Illuminating Heaven. Born when Izanagi washed his left eye after returning from the underworld, she became the ruler of the heavens and the ancestor of the imperial line. Her withdrawal into the cave Ama-no-Iwato — provoked by her brother Susanoo's violent behavior — plunged the world into darkness. She was drawn out not by force but by curiosity: the gods made merry outside, and she opened the cave to see what could possibly be worth celebrating in a darkened world. This story is the template for the return of light — it comes by its own will, drawn by genuine joy, not compelled.

**Susanoo-no-Mikoto** — Born from Izanagi's nose, ruler of the seas, impetuous and powerful. He wept for his dead mother and caused storms. Cast out of heaven for his destruction, he descended to earth and became a different kind of figure — the slayer of Yamata no Orochi, the eight-headed serpent, from whose tail he drew the sacred sword Kusanagi. The same force that destroys and is cast out also protects and creates.

**Tsukuyomi** — The moon, born from Izanagi's right eye. He killed the food goddess Uke Mochi when she prepared a meal in a manner he found disgusting — producing food from her body, from her mouth and nose. Amaterasu was so offended by this act that she refused to look at him again. This is why the sun and moon never share the same sky. The estrangement of sun and moon is not cosmic but personal — a consequence of a specific act.

**Inari Ōkami** — The kami of rice, agriculture, foxes, industry, and worldly success. One of the most widely worshipped kami in Japan, with more shrines dedicated to Inari than any other. Inari is not fixed in form — depicted as a woman, an old man, an androgynous figure, a fox. The kitsune, the fox, serves as Inari's messenger. The red torii gates that mark Inari shrines mark the boundary between ordinary space and sacred space.

**Raijin and Fūjin** — Thunder and wind, depicted as fierce, muscular demons in a posture of perpetual motion. They are not evil but they are dangerous — the forces of storm as kami. They appear together in temple paintings, held back from the world within by the sacred structure itself.

**Izanami** — She Who Invites, the first mother, who died giving birth to the fire kami. Izanagi descended into Yomi, the land of the dead, to retrieve her. She told him she would speak to the kami of the underworld and asked him not to look at her. He could not hold his restraint — he lit a tooth of his comb and saw her: a rotting, maggot-covered corpse. She chased him with the forces of the underworld. He sealed the entrance to Yomi with a great boulder. Across that boulder they spoke their final words — she promised to kill a thousand people a day. He answered he would cause fifteen hundred births. Death and birth established their ratio, and the world has run on it since.

**Abe no Seimei** — Not mythological but historical, a real Onmyōji of the Heian period (921–1005 CE) who became legendary. Said to be the son of a human father and a kitsune mother. He served the imperial court for decades, divining auspicious times, performing purification rites, countering curses, and identifying malevolent kami. His pentagram — the seiman — remains one of the most recognized protective symbols in Japanese esoteric tradition.`
  },

  craft: {
    label: "Craft",
    kanji: "術",
    reading: "Jutsu",
    content: `**Onmyōdō** — The Way of Yin and Yang — was the formal system of esoteric practice in Japan from the 6th century through the Heian period and beyond. It drew from Chinese cosmological systems but developed a distinctly Japanese character, particularly in its integration with Shinto practice and its focus on the specific geography and time-quality of Japan itself.

The Onmyōji was a specialist. He read the forces operating in time and space and advised rulers on what was and was not auspicious. His tools were calendrical, astronomical, and ritual. He did not improvise — he worked within an extremely precise system where errors in calculation had real consequences.

**Katatagae** — Direction avoidance. Certain directions were blocked on certain days by the deity Nakagami, who moved through the compass according to a fixed schedule. To travel in a blocked direction invited disaster. The solution was elegant: you traveled first in a different direction, stayed there overnight, and then proceeded. The obstacle was not defied but circumvented through correct navigation of time and space together.

**Kotodama** — The soul of language. Words were not merely descriptive but causative. The correct utterance, performed in the correct context, did not describe a reality — it made one. The Norito, the ancient Shinto ritual prayers, operated on this principle. They were not petitions to the kami so much as invocations that made the kami's presence actual in the ritual space. The word called the thing into being.

**Fuda** — Talismans inscribed with kami names, protective phrases, or ritual formulae. Paper was the medium because paper was thin enough to carry writing but substantial enough to hold it in the world. A fuda placed at a threshold did not merely symbolize protection — it enacted it. The writing was the living object.

**Harae and Misogi** — Purification, the foundational practice. Harae was ritual purification through ceremony and offering. Misogi was purification through water — standing beneath a waterfall, immersing in the ocean or a cold river. Impurity in Shinto is not moral but ontological — a disruption of the natural order, a kind of static that accumulates through contact with death, blood, illness, and certain emotional states. Purification restored the natural state of clarity through which musubi could flow.

**The five phases in practice** — An Onmyōji diagnosing a problem or determining an auspicious time worked by identifying which phase was dominant and which was disrupted. Illness could be read as a phase imbalance. A building project could be timed to phases favorable to its purpose — a structure meant to endure required earth phase support. A journey required correct phase-direction alignment. This was not superstition but applied cosmology — reading the current state of the world's forces and acting in accordance with them rather than against them.

**Shikigami** — Spirit servants commanded by advanced Onmyōji. Not ghosts but conjured entities, given form and purpose through ritual. Abe no Seimei was said to keep twelve shikigami, which his wife found disturbing enough that he agreed to seal them away in a bridge. Their nature is debated — some traditions hold them as neutral forces shaped by the practitioner's intent, others as genuinely dangerous entities that required careful control.

**The I Ching** entered Japanese esoteric practice through Onmyōdō, providing a system for reading the moment through the casting of hexagrams. The hexagrams were understood not as fortune-telling but as accurate descriptions of the current configuration of forces — and therefore of what kind of action was and was not aligned with the moment.`
  },

  books: {
    label: "Texts",
    kanji: "書",
    reading: "Sho",
    content: null,
    books: [
      {
        id: "kojiki",
        title: "Kojiki",
        subtitle: "Record of Ancient Matters · 712 CE",
        description: "The oldest surviving chronicle of Japan, recording the age of the gods, the creation of the islands, and the descent of the imperial line from Amaterasu. This is the opening passage, the separation of heaven and earth.",
        text: `At the time of the beginning of heaven and earth, there came into existence in Takamanohara a deity named Amenominakanushi no Kami; next, Takamimusubi no Kami; next, Kamimusubi no Kami. These three deities all came into existence as single deities, and their forms were not visible.

The land was young, resembling floating oil and drifting like a jellyfish. From it something like sprouting reeds came into existence, and from this Umashiashikabihikoji no Kami came into existence; next, Amenotokotachi no Kami came into existence.

These five deities are the Separate Heavenly Deities.

Next the deities that came into existence were: Kuninotokotachi no Kami; next, Toyogumo no Kami. These two deities also came into existence as single deities, and their forms were not visible.

The deities that came into existence next were Uhijini no Kami and Suhijini no Kami; next Tsunuguhi no Kami and Ikuguhi no Kami; next Ohotonoji no Kami and Ohotonobe no Kami; next Omodaru no Kami and Aya-kashikone no Kami; next Izanagi no Kami and Izanami no Kami.

Here, the heavenly deities commanded Izanagi no Mikoto and Izanami no Mikoto: "Complete and solidify this drifting land."

Giving them the Heavenly Jeweled Spear, they entrusted the mission to the two deities.

Thereupon, the two deities stood on the Floating Bridge of Heaven and, lowering the jeweled spear, stirred with it. They stirred the brine with a churning-churning sound; and when they lifted up the spear, the brine that dripped down from the tip of the spear piled up and became an island. This was the island Onogoro.`
      },
      {
        id: "amaterasu",
        title: "Kojiki",
        subtitle: "The Cave of Heaven · Ama-no-Iwato",
        description: "The withdrawal of Amaterasu into the cave, the darkening of heaven and earth, and her return. The central mythological event of Japanese tradition.",
        text: `Then Susanoo-no-Mikoto's behavior was exceedingly rude. In the season when the rice plants were growing green, he broke down the divisions between the rice paddies, and covered up the ditches. Again, when Amaterasu was about to perform the great weaving, he opened a hole in the roof of the sacred weaving hall and dropped through it a heavenly piebald horse which he had skinned with a backward skinning.

At this time, the heavenly weaving maiden was startled and struck her genitals against the shuttle and died.

At this, Amaterasu, thinking it was frightful and dreadful, opened the door of Ama-no-Iwato and concealed herself inside.

Then Takamanohara became completely dark. The many calamities all arose at once.

Thereupon, the eight million deities assembled in the dry bed of the Tranquil River of Heaven, and Omoikane no Kami, with profound thought and counsel, gathered the long-crying birds of eternal night and made them cry. They took the hard rocks of Heaven and the iron of the Heavenly Metal Mountains and called Amatsumara and bid him make things. They bid Ishikoridome to make a mirror.

Before the cave they danced a great and joyous ceremony. Eight million deities laughed at once.

Then Amaterasu, thinking this strange — for the world was dark, yet the eight million deities were laughing — slightly opened the door of the rock-cave of heaven and said from inside:

"Since I have hidden myself, thinking that Takamanohara would be dark and the Central Land of the Reed Plains would also be completely dark, how is it that Amenouzume is dancing and all the eight million deities are laughing?"

Then Amenouzume spoke: "We rejoice and are glad because here is a deity more illustrious than you."

While she was speaking thus, Futodama and Amenokoyane brought out the mirror and showed it to Amaterasu.

Amaterasu thought this more and more strange, and gradually coming out of the door, looked at it. Then the Heavenly-Hand-Strength-Male Deity who was hidden behind took Amaterasu's hand and drew her out.

Immediately Futodama drew a rope across behind her and said: "You may not go back further than this."

So when Amaterasu came out, Takamanohara and the Central Land of the Reed Plains naturally became light.`
      },
      {
        id: "norito",
        title: "Norito",
        subtitle: "The Great Purification Prayer · Ōharae no Kotoba",
        description: "One of the oldest surviving Shinto ritual prayers, recited twice yearly to purify the nation of accumulated impurity. This is kotodama in practice — the word as living force.",
        text: `Hear, all of you assembled here.

By the great ritual power of the sovereign gods Nakatomi, who hold the first place in the ritual of the sovereign grandchild, and by the great command of the sovereign grandchild —

The sins that have been accumulated and committed by those in the four quarters under heaven, by the heavenly sins and the earthly sins:

Breaking down the divisions of rice fields, covering up irrigation ditches, releasing irrigation sluice-gates, double-planting, setting up stakes, flaying alive, flaying backwards, defecation — these are the heavenly sins.

Cutting living flesh, cutting dead flesh, leprosy, tumors, the sin of a son with his own mother, the sin of a father with his own daughter-in-law, the sin of a mother with her son-in-law, the sin of intercourse with animals, woes from creeping insects, woes from high deities, woes from birds — these are the earthly sins.

When priests of the Nakatomi, cutting the bottom and cutting the sides of the heavenly narrow pieces of wood, and setting them in abundance as an abundance of offerings — when these words of the great purification are thus spoken:

The gods of heaven, thrusting apart the myriad layers of heavenly clouds with a mighty, a mighty thrust —

Will hear.

The gods of earth, climbing to the tops of high mountains and to the tops of low mountains, thrusting apart the mists of the high mountains and the mists of the low mountains —

Will hear.

When they hear, the multitudinous sins and impurities — there will not remain any sins. They will be taken away, carried away.

Hear this, you assembled people. Know that this has been done.`
      }
    ]
  }
};

export default function JapaneseLibrary() {
  const [activeSection, setActiveSection] = useState("cosmology");
  const [openBook, setOpenBook] = useState(null);
  const [ripples, setRipples] = useState([]);
  const rippleTimer = useRef(null);

  useEffect(() => {
    const addRipple = () => {
      const id = Date.now();
      setRipples(r => [...r.slice(-3), { id, x: Math.random() * 100, y: Math.random() * 100 }]);
      rippleTimer.current = setTimeout(addRipple, 3000 + Math.random() * 2000);
    };
    rippleTimer.current = setTimeout(addRipple, 1500);
    return () => clearTimeout(rippleTimer.current);
  }, []);

  const section = SECTIONS[activeSection];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Noto+Serif+JP:wght@300;400&family=Inter:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .jp-app {
          min-height: 100vh;
          background: #050810;
          color: #e0d4c0;
          font-family: 'Noto Serif JP', Georgia, serif;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        .jp-water {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          pointer-events: none;
          z-index: 0;
        }

        .jp-ripple {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(74, 122, 155, 0.15);
          animation: ripple-expand 4s ease-out forwards;
          transform: translate(-50%, -50%);
        }

        @keyframes ripple-expand {
          0% { width: 0; height: 0; opacity: 0.4; }
          100% { width: 300px; height: 300px; opacity: 0; }
        }

        .jp-header {
          position: relative;
          z-index: 1;
          padding: 1.75rem 2.5rem;
          border-bottom: 1px solid #0e1520;
          display: flex;
          align-items: center;
          gap: 2rem;
          background: rgba(5, 8, 16, 0.9);
        }

        .jp-header-kanji {
          font-size: 2.2rem;
          color: #c44040;
          line-height: 1;
          opacity: 0.85;
          font-family: 'Noto Serif JP', serif;
          font-weight: 300;
        }

        .jp-header-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .jp-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.35em;
          color: #4a7a9b;
          text-transform: uppercase;
        }

        .jp-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #1e3040;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .jp-body {
          display: flex;
          flex: 1;
          position: relative;
          z-index: 1;
          min-height: 0;
        }

        .jp-nav {
          width: 160px;
          flex-shrink: 0;
          border-right: 1px solid #0e1520;
          padding: 2rem 0;
          background: rgba(5, 8, 16, 0.7);
        }

        .jp-nav-item {
          padding: 1rem 1.25rem;
          cursor: pointer;
          transition: background 0.2s;
          border-left: 2px solid transparent;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.2rem;
        }

        .jp-nav-item:hover { background: rgba(14, 21, 32, 0.8); }
        .jp-nav-item.active {
          border-left-color: #c44040;
          background: rgba(14, 21, 32, 0.8);
        }

        .jp-nav-kanji {
          font-size: 1.3rem;
          color: #1e3a50;
          font-family: 'Noto Serif JP', serif;
          font-weight: 300;
          line-height: 1;
        }

        .jp-nav-item.active .jp-nav-kanji { color: #4a7a9b; }

        .jp-nav-reading {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          color: #1e3040;
          text-transform: uppercase;
        }

        .jp-nav-item.active .jp-nav-reading { color: #c44040; }

        .jp-content {
          flex: 1;
          overflow-y: auto;
          padding: 2.5rem 3rem;
          max-width: 800px;
        }

        .jp-section-header {
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #0e1520;
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
        }

        .jp-section-kanji {
          font-size: 2.5rem;
          color: #0e2030;
          font-family: 'Noto Serif JP', serif;
          font-weight: 300;
          line-height: 1;
        }

        .jp-section-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 0.25em;
          color: #4a7a9b;
          text-transform: uppercase;
        }

        .jp-prose {
          font-size: 0.9rem;
          line-height: 2;
          color: #b0a890;
          font-family: 'Noto Serif JP', Georgia, serif;
          font-weight: 300;
        }

        .jp-prose p { margin-bottom: 1.5rem; }

        .jp-prose strong {
          color: #e0d4c0;
          font-weight: 400;
          font-style: normal;
        }

        .jp-books {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: #0a0f18;
          border: 1px solid #0e1520;
        }

        .jp-book-card {
          background: #050810;
          padding: 1.5rem;
          cursor: pointer;
          transition: background 0.15s;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          align-items: start;
        }

        .jp-book-card:hover { background: #080c14; }
        .jp-book-card.open { background: #080c14; }

        .jp-book-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          color: #4a7a9b;
          margin-bottom: 0.2rem;
          font-weight: 300;
        }

        .jp-book-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #1e3040;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .jp-book-desc {
          font-size: 0.78rem;
          color: #2a4050;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
        }

        .jp-book-toggle {
          color: #1e3040;
          font-size: 1.2rem;
          transition: transform 0.25s, color 0.2s;
          padding-top: 0.1rem;
          font-weight: 300;
        }

        .jp-book-card.open .jp-book-toggle {
          transform: rotate(45deg);
          color: #c44040;
        }

        .jp-book-text {
          padding: 2rem;
          background: #030508;
          border-top: 1px solid #0a0f18;
          font-size: 0.83rem;
          line-height: 2.1;
          color: #8a9aaa;
          font-family: 'Noto Serif JP', Georgia, serif;
          font-weight: 300;
          font-style: italic;
          white-space: pre-wrap;
        }

        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #050810; }
        ::-webkit-scrollbar-thumb { background: #0e1520; }
      `}</style>

      <div className="jp-app">
        {/* Water ripples */}
        <div className="jp-water">
          {ripples.map(r => (
            <div
              key={r.id}
              className="jp-ripple"
              style={{ left: `${r.x}%`, top: `${r.y}%` }}
            />
          ))}
        </div>

        {/* Header */}
        <header className="jp-header">
          <div className="jp-header-kanji">神</div>
          <div className="jp-header-text">
            <div className="jp-title">Nihon · Japan</div>
            <div className="jp-subtitle">Shinto · Onmyōdō · Kotodama</div>
          </div>
        </header>

        <div className="jp-body">
          {/* Nav */}
          <nav className="jp-nav">
            {Object.entries(SECTIONS).map(([key, s]) => (
              <div
                key={key}
                className={`jp-nav-item ${activeSection === key ? "active" : ""}`}
                onClick={() => { setActiveSection(key); setOpenBook(null); }}
              >
                <span className="jp-nav-kanji">{s.kanji}</span>
                <span className="jp-nav-reading">{s.reading}</span>
              </div>
            ))}
          </nav>

          {/* Content */}
          <div className="jp-content">
            <div className="jp-section-header">
              <span className="jp-section-kanji">{section.kanji}</span>
              <span className="jp-section-label">{section.label}</span>
            </div>

            {section.content && (
              <div className="jp-prose">
                {section.content.split("\n\n").map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{
                    __html: para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  }} />
                ))}
              </div>
            )}

            {section.books && (
              <div className="jp-books">
                {section.books.map(book => (
                  <div key={book.id}>
                    <div
                      className={`jp-book-card ${openBook === book.id ? "open" : ""}`}
                      onClick={() => setOpenBook(openBook === book.id ? null : book.id)}
                    >
                      <div>
                        <div className="jp-book-title">{book.title}</div>
                        <div className="jp-book-subtitle">{book.subtitle}</div>
                        <div className="jp-book-desc">{book.description}</div>
                      </div>
                      <div className="jp-book-toggle">+</div>
                    </div>
                    {openBook === book.id && (
                      <div className="jp-book-text">{book.text}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
