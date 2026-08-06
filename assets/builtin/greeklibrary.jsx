import { useState, useEffect } from "react";

const SECTIONS = {
  cosmology: {
    label: "Cosmos",
    greek: "Κόσμος",
    content: `Greek cosmology begins not with creation but with emergence. In the beginning was Chaos — not disorder in the modern sense but a yawning gap, a void, an undifferentiated opening. From Chaos emerged Gaia, the earth; Tartarus, the deep abyss below; Eros, the force of attraction; Erebus, primordial darkness; and Nyx, night. These were not created. They arose.

This distinction matters. The Greek universe does not have a maker who stands outside it and produces it. It generates itself through a process of differentiation — things becoming more distinct from each other, the formless developing form, the undifferentiated separating into entities with their own natures. The gods are not creators; they are among the things that emerged.

**Hesiod's Theogony** — the birth of the gods — is the primary account, written around 700 BCE. It traces the genealogy of divine forces from the first abstractions down through the Olympians, framing the history of the cosmos as a family history with all the violence and succession that implies. Ouranos, sky, was castrated by his son Kronos with a sickle. Kronos swallowed his own children. Zeus overthrew Kronos and divided the world with his brothers — Poseidon received the sea, Hades the underworld, Zeus the sky. The earth and Olympus were shared.

**The four ages** — gold, silver, bronze, and iron — described the decline of humanity from an original state of ease and virtue down to the present age of labor and suffering. Hesiod, writing in the iron age, understood himself to be living in the worst of times, when the gods had withdrawn and justice was hard to find. This is not optimism. It is an accurate account of what the tradition believed about historical time.

**The Moirai** — the Fates — were older than the Olympians and in some accounts more powerful. Clotho spun the thread of life. Lachesis measured it. Atropos cut it. Even Zeus could not override the Fates without consequences, and the tradition was ambiguous about whether he truly could at all. Fate and the will of the gods existed in tension that was never fully resolved, which was the honest position — the universe was not entirely governed by personal will, divine or otherwise.

**The Orphic cosmogony** offered a different account: in the beginning was an egg, from which Phanes emerged — the first god, radiant, both male and female, the origin of all things. The Orphics were a mystery tradition that understood the soul as divine and imprisoned in the body, cycling through lives until purification released it. Their cosmology was not Hesiod's; it was concerned with the soul's journey rather than the genealogy of power.

**The Pythagoreans** understood the cosmos as fundamentally mathematical — ratio, proportion, and number as the underlying structure of reality. Music was the audible form of the same proportions that governed the movement of the planets. This was not metaphor. The harmony of the spheres was a real sound, inaudible to human ears only because we had heard it since birth and lost the ability to perceive it. The cosmos was a musical instrument playing itself.`
  },

  pantheon: {
    label: "Gods",
    greek: "Θεοί",
    content: `The Greek gods are fully, overwhelmingly personal. They desire, they fear, they take offense, they fall in love, they hold grudges across generations. They are not abstractions wearing faces. They are personalities with domains — and the domain is the part of reality the god is made of.

**Zeus** — sky, lightning, the principle of sovereignty and law. Not kind by necessity but just by function. He enforced the structure that made civilization possible while being personally capable of anything — deception, transformation, violence, desire. The king of the gods is not a moral exemplar. He is power in its organized form.

**Hera** — marriage, the structure of the household, legitimate union. Her pursuit of Zeus's lovers and illegitimate children was not petty jealousy. She was the goddess of what she was protecting, and those affairs were attacks on the principle she embodied. The tradition sometimes shows her as merely jealous; the deeper reading is that she was maintaining cosmic order.

**Poseidon** — the sea, earthquakes, horses. The deep irrational force under the surface of the world. He was tempestuous in the same way the sea was — not evil but unpredictable, easily offended, capable of extraordinary destruction and capable of great gifts. The horse was his, which connects the sea with wildness, with power that had been partly tamed by human civilization but not entirely.

**Athena** — wisdom, craft, warfare as strategy. She emerged fully armed from Zeus's head. She had no mother in the usual sense — she was the product of pure mind, divine intelligence giving birth to itself. Her warfare was not Ares's — not the physical exhilaration of combat but the intelligent prosecution of a necessary conflict. She was the goddess of the city, of civilization's ordering intelligence. She chose Odysseus as her favorite because he thought his way through things.

**Apollo** — the sun, light, music, poetry, prophecy, medicine, plague. His oracle at Delphi was the most important religious institution in Greece for centuries. The oracle spoke truth but always obliquely — the god of reason and clarity communicated through riddles, because the truth about the future could not be spoken straight without unmaking the freedom that made it meaningful. He was beautiful, precise, deadly. The arrows that brought plague from a distance were his.

**Artemis** — the moon, the hunt, the wilderness, childbirth. Apollo's twin, his opposite in temperament. She wanted no part of civilization — she ran with her maidens in the forests, she protected wild animals even as she hunted, she was ferociously protective of her own virgin state. She punished violations of her sacred space with disproportionate force. Actaeon saw her bathing and she turned him into a stag, after which his own hounds tore him apart. She did not apologize.

**Hermes** — the messenger, the traveler, the guide of souls to the underworld, the patron of thieves and merchants and crossroads. He could move between all worlds freely. He was the only Olympian who regularly entered Hades and returned. He was present at thresholds — literal and metaphorical. He was the trickster of the Greek pantheon, but where Loki's tricks tended toward catastrophe, Hermes's were lighter, more playful. He stole Apollo's cattle the day he was born and negotiated his way out of punishment by inventing the lyre on the spot.

**Dionysus** — wine, ecstasy, dissolution, theater, madness, the vine, the return from the dead. He was the most complicated Olympian. Born of a mortal woman and a god, he died and returned. His worship involved the deliberate dissolution of ordinary selfhood — through wine, through the mask, through communal frenzy. He was dangerous. Cities that refused his worship suffered. But what he offered — the temporary release from the bound self, the experience of something larger — was real. The mask that conceals also reveals. Theater, which he governed, was the space where society could watch itself and see what it could not see in ordinary life.

**Hekate** — she stands at the crossroads holding two torches. She is not Olympian but pre-Olympian — older than the current order. She governs magic, the night, ghosts, the underworld's threshold. She is triple — three bodies facing three directions at a crossroads. She knew where Persephone was taken. She chose Persephone's company. She is propitiated at the dark of the moon, at crossroads, with offerings left without looking back.`
  },

  craft: {
    label: "Craft",
    greek: "Τέχνη",
    content: `Greek magical practice was not separate from Greek religious life but operated in a distinct register — the official religion of the polis dealt in public sacrifice and civic ritual; the magical tradition worked with forces and methods that were personal, private, and often in tension with the official order.

**Theurgy** — the working of the divine — was the highest form of Greek magical practice as articulated in the Neoplatonic tradition. It was not about compelling the gods to do human bidding. It was about purifying the soul sufficiently to receive divine influence, to rise through the levels of reality toward the One, the source of all being. Iamblichus distinguished theurgy from philosophy: philosophy alone could not effect the union with the divine that theurgy could, because the soul needed to be transformed, not merely instructed. The ritual was necessary. Understanding without practice was insufficient.

**The Greek Magical Papyri** — a body of texts from Hellenistic and Roman Egypt, written between 100 BCE and 400 CE — preserve the actual working methods of practitioners. They are composite texts, drawing on Egyptian, Greek, Jewish, and other traditions simultaneously. They include invocations, love spells, curses, protective charms, methods for obtaining divine visions, ways to compel spirits, and instructions for making talismans. They are practical. They assume the system works and proceed from there.

**Katadesmoi** — binding tablets. Lead tablets inscribed with curse formulae and the name of the target, rolled or folded and deposited in graves, wells, sanctuaries of chthonic deities, or the foundations of buildings. Thousands have been found across the Greek world. They bound the target — their tongue, their actions, their ability to harm the petitioner — by associating them with the binding power of the underworld. The lead was soft and easily inscribed but would last indefinitely in the ground.

**Pharmakeia** — the art of the drug, the potion, the herb. Circe and Medea were its mythological exemplars, both dangerous women whose knowledge of plants gave them power that exceeded ordinary human limits. The same word was used for medicine and for poison and for magical preparation — the distinction was in the application, not the substance. Hecate governed this art; she knew the properties of plants because she moved through the night world where they were gathered, under the moon, at crossroads, in silence.

**Divination** had many forms. The oracle at Delphi — the Pythia inhaling vapors, speaking in altered states, her words interpreted by the priests — was the most prestigious. But there was also augury from birds, hepatoscopy from the liver of sacrificed animals, cleromancy from the drawing of lots, oneiromancy from dreams, and necromancy — the summoning of the dead for advice. Odysseus descended to the edge of the underworld to consult Tiresias, the blind prophet who retained his knowledge even in death, offering him blood to drink so that he could speak.

**The mystery traditions** — at Eleusis above all, but also Orphic, Dionysian, and others — offered initiates a direct experience rather than merely knowledge about the divine. The Eleusinian Mysteries, held twice yearly for nearly two thousand years, involved days of ritual preparation, a nocturnal ceremony, and something that was seen — something that was not permitted to be spoken of afterward. Initiates reported that after the experience they no longer feared death. Not because they had been given information about the afterlife, but because they had experienced something that changed what death meant to them. The secret was never fully disclosed, which means it was never fully lost.

**Eros as magical force** — the Greeks understood desire itself as a cosmic principle, older than the gods, and as a practical magical force. Love magic in the Papyri is among the most elaborate and desperate of the workings. The binding of another person's desire was understood as a real possibility through the manipulation of forces that were already operating — you were not creating desire ex nihilo but redirecting what was already there. The ethics of this were understood to be complex even at the time.`
  },

  books: {
    label: "Texts",
    greek: "Κείμενα",
    content: null,
    books: [
      {
        id: "theogony",
        title: "Theogony",
        subtitle: "Hesiod · c. 700 BCE · The Birth of the Gods",
        description: "Hesiod's account of the emergence of the cosmos and the genealogy of the gods. This is the opening — the Muses speak to Hesiod on Mount Helicon and give him the gift and the task of poetry.",
        text: `From the Heliconian Muses let us begin to sing,
who hold the great and holy mount of Helicon,
and dance on soft feet about the deep-blue spring
and the altar of the almighty son of Cronos,
and, when they have washed their tender bodies in Permessus
or in the Horse's Spring or Olmeius,
make their fair, lovely dances upon highest Helicon
and move with vigorous feet.

Thence they arise and go abroad by night,
veiled in thick mist, and utter their song
with lovely voice, praising Zeus the aegis-holder
and queenly Hera of Argos who walks on golden sandals
and the daughter of Zeus the aegis-holder bright-eyed Athene
and Phoebus Apollo, and Artemis who delights in arrows.

They once taught Hesiod glorious song
while he was shepherding his lambs under holy Helicon,
and this word first the goddesses said to me —
the Muses of Olympus, daughters of Zeus who holds the aegis:

"Shepherds of the wilderness, wretched things of shame,
mere bellies, we know how to speak many false things
as though they were true; but we know, when we will,
to utter true things."

So said the ready-voiced daughters of great Zeus,
and they plucked and gave me a rod, a shoot of sturdy laurel,
a marvellous thing, and breathed into me a divine voice
to celebrate things that shall be and things there were aforetime;
and they bade me sing of the race of the blessed gods that are eternally,
but ever to sing of themselves both first and last.`
      },
      {
        id: "hymn",
        title: "Homeric Hymn to Demeter",
        subtitle: "The Abduction of Persephone · 7th century BCE",
        description: "The myth that explains the seasons and underlies the Eleusinian Mysteries. Persephone is taken to the underworld; Demeter's grief makes the earth barren; a compromise is reached that creates winter and spring.",
        text: `I begin to sing of rich-haired Demeter, awful goddess,
of her and her trim-ankled daughter whom Aidoneus rapt away,
given to him by all-seeing Zeus the loud-thunderer.

Apart from Demeter, lady of the golden sword and glorious fruits,
she was playing with the deep-bosomed daughters of Oceanus
and gathering flowers over a soft meadow, roses and crocuses
and beautiful violets, irises also and hyacinths
and the narcissus, which Earth made to grow at the will of Zeus
and to please the Host of Many, to be a snare for the bloom-like girl —
a marvellous, radiant flower. It was a thing of awe
whether for deathless gods or mortal men to see:
from its root grew a hundred blooms and it smelled most sweetly,
so that all wide heaven above and the whole earth
and the salt swell of the sea laughed for joy.

And the girl was amazed and reached out with both hands
to take the lovely toy; but the wide-pathed earth yawned
there in the plain of Nysa, and the lord, Host of Many,
with his immortal horses sprang out upon her —
the Son of Cronos, He who has many names.

He caught her up reluctant on his golden car
and bare her away lamenting. Then she cried out shrilly
with her voice, calling upon her father, the Son of Cronos,
who is most high and excellent.

But no one, either of the deathless gods or of mortal men,
heard her voice.`
      },
      {
        id: "papyri",
        title: "Greek Magical Papyri",
        subtitle: "PGM IV · A Vision of the Sun God",
        description: "From the practical working texts of Hellenistic Egypt — a ritual for obtaining a direct vision of Helios. This shows the layered, composite nature of late Greek magic: Egyptian, Greek, and Jewish elements combined.",
        text: `The spell for a direct vision:

Take a clean linen cloth and write on it with ink of myrrh the following names: ACHCHOR ACHCHOR ACHACHACH PTOTHEN CHAKAXCHTHON AUOMOUN AIOOOOOUOOOOOEE — these names must be written in a circle.

After writing them, roll up the cloth, anoint it with oil of lilies and keep it lying by you.

When you want to make inquiry of the god, wrap your right hand in a clean piece of linen and go up on your roof about sunrise, face east, and look steadily at the rising sun, keeping your eyes still and not blinking.

Say this: I call upon you, greatest god, eternal lord, world ruler, who are over the world and under the world, mighty ruler of the sea, rising at dawn, shining from the east for the whole world, setting in the west. Come to me, thou who risest from the four winds, joyous AGATHOS DAIMON, for whom heaven has become the processional way.

I call your beautiful and great name, which is honored, which quakes the earth, the name to which the sun-disk gives answer, the name at the sound of which the seven heavens and the earth are shaken:

AEEIOUO IAO AI.

Look upon me with a kindly eye, hear my sacred chants.

Then keep looking until you see the rays becoming denser and the light filling heaven and earth.`
      }
    ]
  }
};

export default function GreekLibrary() {
  const [activeSection, setActiveSection] = useState("cosmology");
  const [openBook, setOpenBook] = useState(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let frame;
    const animate = (ts) => {
      setTime(ts);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const section = SECTIONS[activeSection];

  // Subtle marble shimmer — one animated gradient line across header
  const shimmerX = 30 + Math.sin(time / 4000) * 20;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .grk-app {
          min-height: 100vh;
          background: #08090e;
          color: #c8c4d4;
          font-family: 'Cormorant Garamond', Georgia, serif;
          display: flex;
          flex-direction: column;
        }

        .grk-marble-line {
          height: 2px;
          width: 100%;
        }

        .grk-header {
          padding: 1.75rem 2.5rem 1.5rem;
          border-bottom: 1px solid #12141e;
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
          position: relative;
        }

        .grk-title {
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: 400;
          color: #a0a0c0;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .grk-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #1e2030;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .grk-header-greek {
          margin-left: auto;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          color: #1e2035;
          letter-spacing: 0.1em;
          font-style: italic;
        }

        .grk-body {
          display: flex;
          flex: 1;
        }

        .grk-nav {
          width: 160px;
          flex-shrink: 0;
          border-right: 1px solid #12141e;
          padding: 2rem 0;
        }

        .grk-nav-item {
          padding: 0.9rem 1.25rem;
          cursor: pointer;
          border-left: 2px solid transparent;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .grk-nav-item:hover { background: #0c0e16; }
        .grk-nav-item.active {
          border-left-color: #8080b0;
          background: #0c0e16;
        }

        .grk-nav-greek {
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          color: #1e2035;
          font-style: italic;
          line-height: 1;
        }

        .grk-nav-item.active .grk-nav-greek { color: #5050a0; }

        .grk-nav-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #1e2030;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .grk-nav-item.active .grk-nav-label { color: #a0a0c0; }

        .grk-content {
          flex: 1;
          overflow-y: auto;
          padding: 2.5rem 3rem;
          max-width: 800px;
        }

        .grk-section-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #12141e;
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
        }

        .grk-section-greek {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          color: #1e2035;
          font-style: italic;
          line-height: 1;
        }

        .grk-section-label {
          font-family: 'Cinzel', serif;
          font-size: 0.78rem;
          font-weight: 400;
          color: #8080b0;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .grk-prose {
          font-size: 0.95rem;
          line-height: 1.95;
          color: #9a98a8;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
        }

        .grk-prose p { margin-bottom: 1.5rem; }

        .grk-prose strong {
          color: #c0bcd0;
          font-weight: 400;
          font-style: italic;
        }

        .grk-books {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: #12141e;
          border: 1px solid #12141e;
        }

        .grk-book-card {
          background: #08090e;
          padding: 1.5rem;
          cursor: pointer;
          transition: background 0.15s;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          align-items: start;
        }

        .grk-book-card:hover { background: #0a0c14; }
        .grk-book-card.open { background: #0a0c14; }

        .grk-book-title {
          font-family: 'Cinzel', serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: #8080b0;
          letter-spacing: 0.1em;
          margin-bottom: 0.2rem;
        }

        .grk-book-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #1e2030;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .grk-book-desc {
          font-size: 0.78rem;
          color: #2a2e40;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
        }

        .grk-book-toggle {
          color: #1e2035;
          font-size: 1.2rem;
          transition: transform 0.25s, color 0.2s;
        }

        .grk-book-card.open .grk-book-toggle {
          transform: rotate(45deg);
          color: #8080b0;
        }

        .grk-book-text {
          padding: 2rem;
          background: #060710;
          border-top: 1px solid #12141e;
          font-size: 0.9rem;
          line-height: 2.1;
          color: #6a6880;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-weight: 300;
          white-space: pre-wrap;
        }

        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #08090e; }
        ::-webkit-scrollbar-thumb { background: #12141e; }
      `}</style>

      <div className="grk-app">
        {/* Marble shimmer line */}
        <svg className="grk-marble-line" viewBox="0 0 800 2" preserveAspectRatio="none">
          <defs>
            <linearGradient id="marble" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#08090e" />
              <stop offset={`${shimmerX - 10}%`} stopColor="#12141e" />
              <stop offset={`${shimmerX}%`} stopColor="#3a3a5a" />
              <stop offset={`${shimmerX + 10}%`} stopColor="#12141e" />
              <stop offset="100%" stopColor="#08090e" />
            </linearGradient>
          </defs>
          <rect width="800" height="2" fill="url(#marble)" />
        </svg>

        <header className="grk-header">
          <h1 className="grk-title">Greek</h1>
          <span className="grk-subtitle">Olympian · Chthonic · Mystery</span>
          <span className="grk-header-greek">Ἑλλάς</span>
        </header>

        <div className="grk-body">
          <nav className="grk-nav">
            {Object.entries(SECTIONS).map(([key, s]) => (
              <div
                key={key}
                className={`grk-nav-item ${activeSection === key ? "active" : ""}`}
                onClick={() => { setActiveSection(key); setOpenBook(null); }}
              >
                <span className="grk-nav-greek">{s.greek}</span>
                <span className="grk-nav-label">{s.label}</span>
              </div>
            ))}
          </nav>

          <div className="grk-content">
            <div className="grk-section-header">
              <span className="grk-section-greek">{section.greek}</span>
              <span className="grk-section-label">{section.label}</span>
            </div>

            {section.content && (
              <div className="grk-prose">
                {section.content.split("\n\n").map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{
                    __html: para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  }} />
                ))}
              </div>
            )}

            {section.books && (
              <div className="grk-books">
                {section.books.map(book => (
                  <div key={book.id}>
                    <div
                      className={`grk-book-card ${openBook === book.id ? "open" : ""}`}
                      onClick={() => setOpenBook(openBook === book.id ? null : book.id)}
                    >
                      <div>
                        <div className="grk-book-title">{book.title}</div>
                        <div className="grk-book-subtitle">{book.subtitle}</div>
                        <div className="grk-book-desc">{book.description}</div>
                      </div>
                      <div className="grk-book-toggle">+</div>
                    </div>
                    {openBook === book.id && (
                      <div className="grk-book-text">{book.text}</div>
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
