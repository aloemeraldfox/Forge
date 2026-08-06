import { useState, useEffect, useRef } from "react";

// ─── Hieroglyph band content ───────────────────────────────────────────────
const GLYPHS = "𓂀𓂋𓁹𓆣𓇯𓊪𓈖𓏏𓆑𓅓𓎡𓂝𓄿𓇋𓌀𓏌𓅱𓎛𓌳𓏴𓂧𓏭𓄂𓆓𓅆𓋴𓎸𓇌𓆈𓂻𓃒𓆙𓁶𓃀𓆤𓇍𓊽𓌻𓏲𓅐𓃭𓆗𓂸𓊖𓇓𓏤𓅯𓃛𓆶";

// ─── Content ────────────────────────────────────────────────────────────────
const SECTIONS = {
  cosmology: {
    label: "Cosmology",
    glyph: "𓇯",
    content: `Before anything existed, there was Nun — the primordial waters, dark, formless, infinite. Not chaos in the Greek sense, not a void, but a deep potential without boundary or direction. From this, the first act of creation was not a command but an emergence: Atum rising from himself, the self-created one, standing on the first mound of earth as it surfaced from the flood.

Egyptian cosmology is not a single system. It was never meant to be. Different cities held different creation accounts — Heliopolis named Atum, Memphis named Ptah who created through thought and word, Hermopolis described the Ogdoad, eight primordial beings who embodied the qualities of pre-creation. These accounts were not competing. They were understood as different angles on the same incomprehensible truth.

The structure of existence rested on Maat — order, truth, balance, rightness. Not a moral code but a cosmic principle. The sun rose because Maat held. The Nile flooded because Maat held. When Maat was disrupted — through injustice, through failure of ritual, through the weakening of the divine order — existence itself was threatened. The pharaoh's primary function was to maintain Maat, to stand between the human and divine worlds and keep the current flowing.

Time operated in two registers: Neheh, cyclical time — the eternal return of the sun, the seasons, the flood — and Djet, linear time, the permanent record, the unchanging. The dead entered Djet. The living moved through Neheh. The goal was not escape from time but right relationship with both.

The cosmos was layered: the visible world, the Duat (underworld), and the sky as a divine ceiling through which the stars moved as gods. The sun traveled through the Duat each night, dying and regenerating, and this nightly passage was the central drama of existence — the template for all transformation.`
  },

  pantheon: {
    label: "Pantheon",
    glyph: "𓁹",
    content: `The Egyptian gods are not distant or abstract. They are forces that move through the world continuously, with faces, with histories, with conflicts and resolutions that mirror everything that happens below.

**Ra / Ra-Horakhty** — The sun in his full force. Not simply light but the principle of manifestation, of becoming visible. He ages through the day: Khepri at dawn (the scarab, self-created, pushing the sun over the horizon), Ra at noon, Atum at dusk. He travels the Duat each night aboard his barque, facing dissolution and regeneration. His enemies are real — Apep, the serpent of chaos, waits in the deep waters to swallow him. He survives because the ritual is performed.

**Osiris** — The first to die and return. King, judge, green-skinned god of the dead and of grain — death and fertility are not opposites here. Murdered by his brother Set, dismembered and scattered, reconstructed by Isis, he became the model for every resurrection. Every dead person in Egypt was identified with Osiris. To die was to become him.

**Isis** — The magician, the mother, the great assembler. Her magic was the most powerful in the pantheon. She reconstructed Osiris from fourteen scattered pieces (or forty-two, accounts differ), animated him enough to conceive Horus, and then protected that child across years of pursuit. Her knot — the tyet — was a sign of protective power and blood magic.

**Set** — Not simply evil. Set was the force of the storm, the desert, the foreign, the disruption that is necessary for creation. He stood at the prow of Ra's barque each night and fought Apep with a spear. He was dangerous, uncanny, essential. His worship was widespread before being suppressed politically. He represents the truth that chaos is not the enemy of order — it is what order must continually overcome and incorporate.

**Anubis** — The guide between states, the weigher of paths, the embalmer. Black-headed, jackal-formed. He does not judge — he facilitates. He brings the dead to the scales, he oversees the weighing of the heart, he leads the accepted into the Field of Reeds.

**Thoth** — The record, the word, the moon. Ibis-headed, baboon-formed. He recorded the outcome of the heart weighing. He invented writing, mathematics, time. He was called the twice-great and later three-times-great — Hermes Trismegistus carries his name into the Western tradition.

**Sekhmet** — Lion-headed, fierce, the eye of Ra turned to destruction. She was sent to destroy humanity when they turned against the gods. She was stopped only by tricking her into drinking red-dyed beer, mistaking it for blood. The same goddess who brings plague also heals. The same heat that kills protects.

**Hathor** — Cow-eared, mirror-carrying, goddess of love, music, intoxication, the west, the sky. She received the dead. She was the solar disk between her horns. She and Sekhmet are sometimes the same force in different phases — a pattern the tradition understood.

**Khnum** — The ram-headed potter who shaped souls on his wheel before birth. He made the body and the ka simultaneously.

**Sobek** — The crocodile, raw power of the Nile, dangerous abundance. Worshipped where the river was most violent.`
  },

  craft: {
    label: "Craft",
    glyph: "𓌀",
    content: `Egyptian magic — heka — was not a separate practice from religion or medicine. It was the fundamental force through which creation operated. When Atum spoke and things came into being, that was heka. The universe ran on it.

**The name** was the thing itself. To know the true name of a being was to have power over it. This is why the gods had multiple names — the hidden name, the common name, the name used in ritual. Isis obtained power over Ra by tricking him into revealing his secret name when he was weakened by age. The preservation of a person's name after death was essential to their survival in the afterlife. To erase a name was to destroy the person completely.

**The word spoken aloud** was an act of creation. This is why ritual utterances had to be exact — not approximate, not paraphrased. The wrong word could undo the working. Temple walls were covered in texts not merely to record but to perform — as long as the words existed in any form, they continued to operate.

**Amulets** were charged objects carrying specific protective forces. The Eye of Horus — the udjat — protected against the evil eye and physical harm. The djed pillar stabilized. The tyet knot of Isis protected. These were not symbols of protection, they were the protection itself, made portable.

**The ritual calendar** was not arbitrary. Specific days carried specific qualities — some were the anniversaries of mythological events and carried the power of those events. Others were dangerous because of what had happened on them in divine time. The practitioner needed to know which day held which force.

**Direction and orientation** mattered structurally. East was birth and rising, West was death and the land of the dead, North was the imperishable stars that never set, South was the source of the Nile. The body laid with the head to the north faced east. Temples were aligned to solar or stellar events with precision that required generations of observation.

**Color** was not decorative but informational. Green was Osiris, vegetation, resurrection. Red was Set, blood, fire, danger, and power. White was purity, silver, the moon. Black was Anubis, the fertile Nile mud, the afterlife — black was not malevolent but regenerative, the color of what contains life before it emerges.

**Perfume and incense** were the breath of the gods. Kyphi, the sacred blend, contained sixteen ingredients — calamus, juniper, acacia, cinnamon, myrrh and others — and was burned at sunset to accompany Ra into the Duat. Its formula was a religious text as much as a recipe.

**The 42 Assessors** judged the dead on 42 specific sins — the negative confession, Spell 125 of the Book of the Dead, where the deceased declared what they had not done. Each sin belonged to a specific deity in a specific nome. The afterlife was not one judgment but a passage through the entire moral geography of Egypt.`
  },

  books: {
    label: "Books",
    glyph: "𓏏",
    content: null,
    books: [
      {
        id: "bod",
        title: "The Book of the Dead",
        subtitle: "Spell 1 — Coming Forth by Day",
        description: "The primary funerary text of ancient Egypt, a collection of spells to guide the deceased through the Duat. This is Spell 1, the opening invocation, from the Budge translation (1895).",
        text: `HERE BEGIN THE SPELLS OF COMING FORTH BY DAY, AND OF THE SONGS OF PRAISE AND GLORIFYING, AND OF COMING FORTH FROM AND GOING INTO THE GLORIOUS KHERT-NETER, WHICH IS PROFITABLE FOR THE DEAD, AND IS TO BE RECITED ON THE DAY OF THE BURIAL, AND THE GOING IN AFTER COMING FORTH.

The Osiris Ani, whose word is truth, saith:—

I am Yesterday, To-day, and To-morrow, and I have the power to be born a second time. I am the divine hidden Soul who createth the gods, and who giveth sepulchral meals to the denizens of the Tuat (Underworld), Amentet, and heaven.

I am the rudder of the east, and I have taken possession of its heart. I look upon the disk of the night, and I have come into being as a god.

His glory shineth upon my body, and I make to flourish things which are not yet come into being. My soul is God, and my soul is the Great Cat who dwelleth in the Seat of Truth.

I am the Dweller in the Egg. I shine forth. I live. I grow strong. I am the Eldest of the gods, and I have become the Seker boat and the Tet.

He who made me hath put me in the path of the flame, and the breath of my mouth shineth upon them that weep for me.

I have come among the Watchers, the Wardens of the sky, and I have brought peace to the gods of the horizon.

The path of yesterday is behind me. The paths of Ra are the paths which I have trodden. I am the hidden Soul who liveth in the Tuat (Underworld).

I have come. I have seen mine own father, the Lord of Maat. I have come equipped. I have carried away Maat from the place where she was.

I have broken open the door of heaven. I have rent asunder the darkness. I have journeyed through the valley of the Light-god.`
      },
      {
        id: "pyramid",
        title: "The Pyramid Texts",
        subtitle: "Utterance 213 — The Ascension",
        description: "The oldest religious texts in the world, carved into the inner chambers of pyramids beginning around 2400 BCE. These are the spells that carried the pharaoh to the stars.",
        text: `The sky is overcast, the stars are darkened,
The celestial expanse quivers, the bones of the earth-gods tremble,
The planets stand still, for they have seen the King appearing in power
As a god who lives on his fathers and feeds on his mothers.

The King is a master of wisdom, whose mother knows not his name.
The glory of the King is in the sky, his power is in the horizon
Like Atum, his father who begot him.

When Atum begot him, he was more glorious than Atum.
The powers of the King are behind him, his terror is at his feet,
His magic spells are before him.

The King is the bull of the sky,
Who conquers at will, who lives on the being of every god,
Who eats their entrails, even of those who come with their bodies full of magic
From the Island of Fire.

The King is equipped, he is a god, living on his father, feeding on his mother.
He will ascend to the sky. He is permanent.

See the King: his soul is in his body, and his body is with his soul.
The sky gives birth to him like Orion.`
      },
      {
        id: "amduat",
        title: "The Amduat",
        subtitle: "The Book of What is in the Underworld — First Hour",
        description: "The oldest complete book of the underworld, describing Ra's nightly journey through the twelve hours of darkness. Found in the tombs of pharaohs beginning with Thutmose I.",
        text: `THE FIRST HOUR OF THE NIGHT

This is the knowledge of the power of those who are in the Duat.
This is the beginning of the Horn of the West.

When this great god reaches the western horizon, the goddess Maat stands to receive him. The faces of all the gods are glad when they see this great god coming to them, when he illuminates the darkness of the West.

The name of this gate is MESET. The name of this hour which guides this great god is USHET-NEFERU — She Who Guides the Beautiful Ones.

This great god sails in his bark of seven cubits, and the Maat-deities who stand in this city say to this great god:

"Come to us, Ra. Advance to us, Ra. Behold the Mystery, Ra, thou who art protected through thy forms."

The gods who dwell in this hour say to Ra: "Hail to thee who comest as Khepri, the self-created, who dispels the night. Thy light fills the darkness. Thy form hides itself in the depths."

The beings who are in the Duat open their arms to receive him. They give him light with which to illuminate the darkness. Their arms hold him. Their hands carry him through.

When this great god passes them, they remain in darkness. When he departs, they weep.`
      }
    ]
  }
};

// ─── Component ──────────────────────────────────────────────────────────────
export default function EgyptianLibrary() {
  const [activeSection, setActiveSection] = useState("cosmology");
  const [openBook, setOpenBook] = useState(null);
  const [glyphOffset, setGlyphOffset] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    let start = null;
    const animate = (ts) => {
      if (!start) start = ts;
      setGlyphOffset(((ts - start) / 60000) * 100);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const glyphBand = (GLYPHS + " " + GLYPHS + " " + GLYPHS).repeat(3);

  const section = SECTIONS[activeSection];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Georgia&family=Inter:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0c0a06; }

        .egy-app {
          min-height: 100vh;
          background: #0c0a06;
          color: #d4c4a0;
          font-family: Georgia, serif;
          display: flex;
          flex-direction: column;
        }

        .egy-glyph-band {
          overflow: hidden;
          height: 38px;
          background: #1e1a10;
          border-bottom: 1px solid #2a2010;
          display: flex;
          align-items: center;
          position: relative;
        }
        .egy-glyph-inner {
          white-space: nowrap;
          font-size: 1.2rem;
          color: #8b6914;
          opacity: 0.5;
          letter-spacing: 0.3em;
          will-change: transform;
          transition: none;
        }

        .egy-header {
          padding: 2rem 2.5rem 1.5rem;
          border-bottom: 1px solid #2a2010;
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
        }
        .egy-title {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          font-weight: 400;
          color: #c8a040;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }
        .egy-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem;
          color: #5a4a20;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .egy-body {
          display: flex;
          flex: 1;
          min-height: 0;
        }

        .egy-nav {
          width: 180px;
          flex-shrink: 0;
          border-right: 1px solid #1e1a10;
          padding: 2rem 0;
        }
        .egy-nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.85rem 1.5rem;
          cursor: pointer;
          transition: background 0.15s;
          border-left: 2px solid transparent;
        }
        .egy-nav-item:hover {
          background: #1a1508;
        }
        .egy-nav-item.active {
          border-left-color: #c8a040;
          background: #1a1508;
        }
        .egy-nav-glyph {
          font-size: 1.1rem;
          color: #8b6914;
          width: 20px;
          text-align: center;
        }
        .egy-nav-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #8a7a50;
        }
        .egy-nav-item.active .egy-nav-label {
          color: #c8a040;
        }

        .egy-content {
          flex: 1;
          overflow-y: auto;
          padding: 2.5rem 3rem;
          max-width: 780px;
        }

        .egy-section-header {
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #2a2010;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .egy-section-glyph {
          font-size: 1.8rem;
          color: #8b6914;
          opacity: 0.7;
        }
        .egy-section-title {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: #c8a040;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .egy-prose {
          font-size: 0.92rem;
          line-height: 1.9;
          color: #c4b488;
          font-family: Georgia, serif;
        }
        .egy-prose p {
          margin-bottom: 1.4rem;
        }
        .egy-prose strong {
          color: #d4c4a0;
          font-weight: normal;
          font-style: italic;
        }

        .egy-books-grid {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: #1e1a10;
          border: 1px solid #1e1a10;
        }

        .egy-book-card {
          background: #0c0a06;
          padding: 1.5rem;
          cursor: pointer;
          transition: background 0.15s;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          align-items: start;
        }
        .egy-book-card:hover {
          background: #100e08;
        }
        .egy-book-card.open {
          background: #100e08;
        }

        .egy-book-title {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: #c8a040;
          letter-spacing: 0.1em;
          margin-bottom: 0.25rem;
        }
        .egy-book-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.68rem;
          color: #5a4a20;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }
        .egy-book-desc {
          font-size: 0.8rem;
          color: #7a6840;
          line-height: 1.5;
          font-family: 'Inter', sans-serif;
        }
        .egy-book-toggle {
          font-size: 1rem;
          color: #5a4a20;
          font-family: 'Cinzel', serif;
          padding-top: 0.1rem;
          transition: transform 0.2s;
        }
        .egy-book-card.open .egy-book-toggle {
          transform: rotate(45deg);
          color: #c8a040;
        }

        .egy-book-text {
          padding: 1.5rem;
          background: #0a0804;
          border-top: 1px solid #1e1a10;
          font-size: 0.85rem;
          line-height: 2;
          color: #b0a078;
          font-family: Georgia, serif;
          font-style: italic;
          white-space: pre-wrap;
        }

        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0c0a06; }
        ::-webkit-scrollbar-thumb { background: #2a2010; }
      `}</style>

      <div className="egy-app">
        {/* Glyph band */}
        <div className="egy-glyph-band">
          <div
            className="egy-glyph-inner"
            style={{ transform: `translateX(-${(glyphOffset % 50)}%)` }}
          >
            {glyphBand}
          </div>
        </div>

        {/* Header */}
        <header className="egy-header">
          <h1 className="egy-title">𓂀 Egypt</h1>
          <span className="egy-subtitle">Kemet · The Black Land</span>
        </header>

        {/* Body */}
        <div className="egy-body">
          {/* Nav */}
          <nav className="egy-nav">
            {Object.entries(SECTIONS).map(([key, s]) => (
              <div
                key={key}
                className={`egy-nav-item ${activeSection === key ? "active" : ""}`}
                onClick={() => { setActiveSection(key); setOpenBook(null); }}
              >
                <span className="egy-nav-glyph">{s.glyph}</span>
                <span className="egy-nav-label">{s.label}</span>
              </div>
            ))}
          </nav>

          {/* Content */}
          <div className="egy-content">
            <div className="egy-section-header">
              <span className="egy-section-glyph">{section.glyph}</span>
              <span className="egy-section-title">{section.label}</span>
            </div>

            {section.content && (
              <div className="egy-prose">
                {section.content.split("\n\n").map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{
                    __html: para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  }} />
                ))}
              </div>
            )}

            {section.books && (
              <div className="egy-books-grid">
                {section.books.map((book) => (
                  <div key={book.id}>
                    <div
                      className={`egy-book-card ${openBook === book.id ? "open" : ""}`}
                      onClick={() => setOpenBook(openBook === book.id ? null : book.id)}
                    >
                      <div>
                        <div className="egy-book-title">{book.title}</div>
                        <div className="egy-book-subtitle">{book.subtitle}</div>
                        <div className="egy-book-desc">{book.description}</div>
                      </div>
                      <div className="egy-book-toggle">+</div>
                    </div>
                    {openBook === book.id && (
                      <div className="egy-book-text">{book.text}</div>
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
