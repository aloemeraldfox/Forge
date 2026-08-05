import { useState, useEffect, useRef } from "react";

const SECTIONS = {
  cosmology: {
    label: "World",
    ogham: "ᚌᚏᚐᚔᚅ",
    content: `The Celts did not write down their cosmology. This is the first thing to understand about the tradition — its keepers chose oral transmission over inscription. Twenty years of Druidic training, none of it recorded. What survives comes filtered through Roman observers who misunderstood much of what they saw, through Christian monks who preserved what they could tolerate, and through the internal logic of the myths themselves.

What emerges is a world without hard edges. The boundary between this world and the Otherworld was not a wall but a membrane — thin in certain places, thinner at certain times. The Celts did not imagine the sacred as distant or elevated. It was beside, always beside, separated by a threshold that anyone might cross if they came to the right place at the right moment with the right knowledge.

**The Otherworld** had many names. In Irish tradition, Tír na nÓg — the Land of Eternal Youth — or Tír Tairngire — the Land of Promise. In Welsh, Annwn. It was not above the clouds or beneath the earth but coexistent with this world, occupying the same space in a different register. Islands far to the west, hollow hills, the far shore of water. Places where the two worlds pressed closest together.

The sacred year turned on four fire festivals that marked the thinning of the membrane at their transitions. **Samhain** — the end of October — when the dead could return and the living could cross over. **Imbolc** — early February — the first breath of spring, sacred to Brigid. **Beltane** — May — fire lit on the hills, cattle driven between flames for purification. **Lughnasadh** — August — the harvest festival of the god Lugh, a time of games and assembly.

At each of these thresholds, the ordinary rules of the world loosened. What was fixed became fluid. This was not dangerous so much as powerful — the power that exists at edges, at the meeting of different states.

**The number three** ran through everything. Triple goddesses, triple aspects, triads of wisdom. Not because the Celts were symbolically fond of threes but because the structure of their understanding was genuinely triadic — every thing had its nature, its function, and its relationship to what surrounded it. These were not separable.

The land itself was sacred not as a symbol of something else but as a thing in itself. Rivers had names because they had presences. Springs were sites of offering not because the offering traveled somewhere but because the spring itself received it. The Celts did not project the sacred onto nature — they recognized it already there.`
  },

  pantheon: {
    label: "Gods",
    ogham: "ᚇᚓᚔᚈᚆ",
    content: `The Celtic pantheon was not a single unified system. The Gauls worshipped different gods than the Irish, who differed from the Welsh and the Britons. What holds them together is a shared structure — the same kinds of forces appearing under different names, the same refusal to divide what other traditions kept separate.

**The Dagda** — the Good God, though good here means skilled rather than moral. Father figure of the Tuatha Dé Danann, the divine race of Irish tradition. He carried a club that killed with one end and restored life with the other. He owned a cauldron that never emptied — the cauldron of plenty that fed everyone and left none unsatisfied. He was enormous, crude in appearance, dressed poorly — and one of the most powerful forces in the tradition. Strength without refinement. Abundance without elegance. He did not need to look like what he was.

**The Morrigan** — Great Queen, Phantom Queen. She appeared as crow, as washerwoman at the ford washing the armor of those about to die, as a seductress whose rejection meant death in battle, as a collective of three — Badb, Macha, and Nemain, or in some accounts Anu. She was not evil. She was the truth of battle — its cost, its necessity, its aftermath. She circled over the dying because she was what death in violence actually was. She offered Cú Chulainn her love and he refused her, which was one of the reasons he died. You could not refuse the Morrigan and survive the refusal intact.

**Lugh** — The Long-Armed, the Many-Skilled. Solar deity, master of every craft. When he arrived at the hall of the Tuatha Dé Danann and asked for entry, the doorkeeper asked his skill. He named one after another — smith, warrior, harper, poet, sorcerer, physician. Each time the doorkeeper said they already had someone with that skill. Lugh asked: do you have anyone who has all of them? They let him in. He killed his grandfather Balor of the Evil Eye at the Battle of Mag Tuired with a sling-stone through the eye — the same eye whose gaze withered armies. He is the template for the hero who succeeds not through any single gift but through the complete integration of all gifts.

**Brigid** — Triple goddess of poetry, healing, and smithcraft. Fire is her element in all three forms — the fire of inspiration, the fire that cauterizes and heals, the fire of the forge. Her sacred flame at Kildare was kept burning for centuries by nineteen priestesses who tended it in rotation. When Christianity absorbed her into Saint Brigid, the flame continued — it was too important to extinguish. Some things don't change when the name does.

**Cernunnos** — The Horned One. Seated in lotus position, antlered, surrounded by animals. He appears on the Gundestrup Cauldron and in scattered inscriptions but almost nowhere in surviving myth — his worship may have been too old, too elemental, to survive in narrative form. He is the lord of wild things, of the in-between, of the animals that move through the forest without acknowledgment of human boundary. He does not rule the Otherworld but he knows the way there.

**Danu** — The mother whose name the Tuatha Dé Danann carry. She appears almost nowhere in Irish myth directly and yet her name is on everything. The river Danube carries her name through Europe. She may be the oldest stratum of the tradition, too ancient for the myths that were recorded to reach her clearly.`
  },

  craft: {
    label: "Craft",
    ogham: "ᚉᚏᚐᚃᚈ",
    content: `Celtic magical practice was inseparable from the structure of Celtic society. The practitioners were not a separate priestly class standing apart — they were woven into the social fabric at its highest levels, with authority that exceeded even kings in certain matters.

**The Druids** were the keepers of everything the tradition needed to survive — law, history, cosmology, ritual, medicine, divination, poetry. Their training lasted twenty years not because the curriculum was slow but because oral transmission at that depth required years of practice to make reliable. Nothing was written down by choice. This is often interpreted as primitive, but it was a deliberate epistemological position: knowledge that could not be held in a living mind and passed to another living mind was not real knowledge. The written word was a corpse of meaning.

**The sacred nemeton** — the grove. Celtic ritual did not primarily happen in constructed temples. It happened in clearings among trees, at springs, at the edges of lakes, at places where the land itself had thinned. The Romans destroyed the nemetons when they wanted to break Celtic religious resistance, which confirms how central they were. You cannot occupy a forest the way you can occupy a building.

**Ogham** — the early Irish script, carved into stone and wood. Twenty letters, each named for a tree. The alphabet was a forest. Reading was botanical. Each letter carried the qualities of its tree — the birch of beginnings, the oak of strength, the yew of death and eternity. Writing in Ogham was not merely inscription — it was a placement of forces. A stone carved with Ogham at a threshold was not a sign, it was a working.

**The sacred head** — across Celtic tradition, the head was the seat of the soul. Severed heads were preserved, spoken to, sometimes spoke back. This is not trophy-taking in the crude sense — it was the preservation of the living force of a person after death. The Celts believed the soul resided in the head, not the heart. To keep the head was to keep something of the person.

**The cauldron** — one of the four treasures of the Tuatha Dé Danann was the Dagda's cauldron that left none unsatisfied. The Welsh Pair Dadeni — the Cauldron of Rebirth — restored the dead to life (though without speech — they could be brought back but not entirely). The cauldron was the vessel of transformation, of abundance, of the passage between states. It preceded the Grail by millennia and shaped it completely.

**Satire** — a Druid's satire was not merely an insult. It was a working. A poet of sufficient skill and authority could raise blemishes on a king's face through satire alone. This was understood literally, not metaphorically. The word had force. Poetic skill was a form of power that could do physical damage. The Irish word for poet — fili — was cognate with the word for seer. The same person saw and shaped what they saw into words that changed things.

**The geis** — a sacred prohibition or obligation placed on a person, often a hero. Cú Chulainn could not eat dog meat, could not refuse hospitality. Violating a geis invited destruction not as punishment but as the natural consequence of breaking the pattern that held a person's fate together. The geis was structural — it revealed the shape of a person's destiny by naming what would unravel it.`
  },

  books: {
    label: "Texts",
    ogham: "ᚈᚓᚇᚌ",
    content: null,
    books: [
      {
        id: "mabinogion",
        title: "The Mabinogion",
        subtitle: "Pwyll, Prince of Dyfed · The First Branch",
        description: "The oldest Welsh prose tales, preserved in manuscripts from the 14th century but drawing on much older oral tradition. This is the opening of the First Branch — Pwyll's encounter with Arawn, king of Annwn, the Welsh Otherworld.",
        text: `Pwyll, Prince of Dyfed, was lord over the seven cantrevs of Dyfed. One day he was at Arberth, his chief seat, and seized with a desire to go hunting. The part of his domain which he wished to hunt was Glyn Cuch. He set out that evening from Arberth, and journeyed as far as Llwyn Diarwyd. That night he tarried there, and at the dawn of the following day he arose and came to Glyn Cuch, where he let loose the hounds in the wood and sounded the horn. He set off at a brisk pace following the hounds, and became separated from his companions.

While he was listening to the sound of his pack, he heard the cry of another pack, and these had a different note from his own, and they were coming in the opposite direction. He saw a clearing in the wood forming a level plain, and as his pack reached the edge of the plain, he saw a stag before the other pack.

Towards the middle of the plain, lo, the other pack had overtaken the stag and brought it down. Pwyll then fixed his eye, not on the pack, but on the pack's colour. Of all the hounds that he had seen in the world, he had seen no dogs of this colour: they were a brilliant shining white with red ears; and as the whiteness of the dogs shone, so shone the redness of their ears.

He drove away the strange pack and fed his own pack upon the stag. While he was doing so, he heard a horseman coming towards him, upon a large light grey steed, with a hunting horn round his neck, clad in garments of grey woollen in the fashion of a hunting garb.

The horseman drew near and addressed him thus: "Chieftain, I know who thou art, and I greet thee not. I will tell thee. My greeting thee is not of less worth to thee than thou dost imagine."

"What rank, chieftain, art thou of?"

"I am king in the country from which I come."

"Lord," said Pwyll, "good day to thee, and from what country dost thou come?"

"From Annwn," he answered; "Arawn, king of Annwn, am I."`
      },
      {
        id: "cath",
        title: "Cath Maige Tuired",
        subtitle: "The Battle of Mag Tuired",
        description: "The central mythological battle of Irish tradition — the Tuatha Dé Danann against the Fomorians. This passage describes Lugh's arrival at the court and the encounter with the doorkeeper.",
        text: `The Tuatha Dé Danann were in Tara, and Lugh came to them there with his foster-brothers the sons of Manannan. He came to the doorkeeper and said to him:

"I am Lugh of the Long Arms, grandson of Balor and son of Cian."

The doorkeeper said: "We shall not open for you. No one without an art enters Tara."

Lugh said: "Question me — I am a wright."

The doorkeeper said: "We need you not. We have a wright, Luchta mac Luachada."

Lugh said: "Question me, doorkeeper — I am a smith."

The doorkeeper said: "We have a smith, Goibniu the smith."

Lugh said: "Question me — I am a champion."

The doorkeeper said: "We need you not. We have a champion, Ogma."

Lugh said: "I am a harper."

"We need you not. We have a harper, Abcan mac Bicelmois."

"I am a warrior."

"We have a warrior."

"I am a poet and historian."

"We have a poet."

"I am a sorcerer."

"We need you not. We have druids and people of power."

"I am a physician."

"We have Dian Cecht for our physician."

"I am a cupbearer."

"We have cupbearers nine times."

"I am a brazier."

"We have Credne Cerd."

Then Lugh said: "Ask the king whether he has one man who possesses all these arts; if he has, I will not seek entry to Tara."

The doorkeeper went inside and said all this to Nuada. The king said: "Let him in. A man like that has never before come to this fortress."

The door was opened then for Lugh, and he entered Tara.`
      },
      {
        id: "colloquy",
        title: "The Colloquy of the Ancients",
        subtitle: "Acallam na Senórach · 12th century",
        description: "Cailte and Oisín, the last of the Fianna, walk through Ireland with Saint Patrick. They name every place and tell every story. This is the beginning — the last warriors of the old world meeting the new one.",
        text: `After the battle of Gabhra, when the Fianna of Ireland fell, Cailte mac Rónáin and a small number of the survivors went their way across Ireland, and they traveled until they reached the Hill of Allen.

There was no man in Ireland in their time better at telling stories or histories than Cailte, and there was no man better at making verses or poems than Oisín.

Cailte said: "It is a pity that Finn is not here, for he would know what to do."

Oisín said: "There is no one here now. Let us go."

So they went their way through Ireland, two old men, and Ireland had changed around them. The forests where they hunted were gone or given over to farms. The halls where they feasted were ruins or churches. The gods that had been close were drawing back.

They came at last to Saint Patrick, who was writing the word of God, and his clerics writing with him.

Patrick looked on them and was not afraid, though they were tall men of the old world, still carrying themselves like warriors, though the years were heavy on them.

And Patrick said: "I am glad of your coming. Tell me of Finn mac Cumhaill and the Fianna of Ireland, that their deeds may be written and not lost."

And Cailte said: "It is a great thing you ask. But we will tell you. We have nothing else left to give."

And so they walked with Patrick through Ireland, and at every hill and river and stone, Cailte named it and told the story of how the name was given, and what happened there in the time of Finn, and Patrick's scribes wrote it all down.

This is how the old world passed into writing.`
      }
    ]
  }
};

// Simple SVG knotwork border — one continuous interlacing path
const KnotBorder = () => (
  <svg width="100%" height="12" viewBox="0 0 800 12" preserveAspectRatio="none" style={{ display: "block" }}>
    <path
      d="M0,6 C20,1 30,11 50,6 C70,1 80,11 100,6 C120,1 130,11 150,6 C170,1 180,11 200,6 C220,1 230,11 250,6 C270,1 280,11 300,6 C320,1 330,11 350,6 C370,1 380,11 400,6 C420,1 430,11 450,6 C470,1 480,11 500,6 C520,1 530,11 550,6 C570,1 580,11 600,6 C620,1 630,11 650,6 C670,1 680,11 700,6 C720,1 730,11 750,6 C770,1 780,11 800,6"
      fill="none"
      stroke="#3a5a2a"
      strokeWidth="1.5"
      opacity="0.6"
    />
    <path
      d="M0,6 C20,11 30,1 50,6 C70,11 80,1 100,6 C120,11 130,1 150,6 C170,11 180,1 200,6 C220,11 230,1 250,6 C270,11 280,1 300,6 C320,11 330,1 350,6 C370,11 380,1 400,6 C420,11 430,1 450,6 C470,11 480,1 500,6 C520,11 530,1 550,6 C570,11 580,1 600,6 C620,11 630,1 650,6 C670,11 680,1 700,6 C720,11 730,1 750,6 C770,11 780,1 800,6"
      fill="none"
      stroke="#2a4a1a"
      strokeWidth="1"
      opacity="0.5"
    />
  </svg>
);

export default function CelticLibrary() {
  const [activeSection, setActiveSection] = useState("cosmology");
  const [openBook, setOpenBook] = useState(null);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const initial = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 3 + Math.random() * 4,
      opacity: 0.04 + Math.random() * 0.06,
      speed: 0.3 + Math.random() * 0.4
    }));
    setLeaves(initial);
  }, []);

  const section = SECTIONS[activeSection];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=IM+Fell+English:ital@0;1&family=Inter:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cel-app {
          min-height: 100vh;
          background: #060a06;
          color: #d0c8a8;
          font-family: 'IM Fell English', Georgia, serif;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .cel-leaves {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .cel-leaf {
          position: absolute;
          border-radius: 50% 0 50% 0;
          background: #2a4a1a;
        }

        .cel-header {
          position: relative;
          z-index: 1;
          padding: 1.75rem 2.5rem 0;
          background: rgba(6, 10, 6, 0.95);
        }

        .cel-header-inner {
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
          padding-bottom: 1.5rem;
        }

        .cel-title {
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: 400;
          color: #7ab87a;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .cel-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #2a4a1a;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .cel-ogham-header {
          font-size: 1rem;
          color: #3a5a2a;
          letter-spacing: 0.3em;
          margin-left: auto;
          opacity: 0.6;
        }

        .cel-body {
          display: flex;
          flex: 1;
          position: relative;
          z-index: 1;
        }

        .cel-nav {
          width: 160px;
          flex-shrink: 0;
          border-right: 1px solid #0e1a0e;
          padding: 2rem 0;
          background: rgba(6, 10, 6, 0.9);
        }

        .cel-nav-item {
          padding: 0.9rem 1.25rem;
          cursor: pointer;
          border-left: 2px solid transparent;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .cel-nav-item:hover { background: rgba(14, 26, 14, 0.8); }

        .cel-nav-item.active {
          border-left-color: #7ab87a;
          background: rgba(14, 26, 14, 0.8);
        }

        .cel-nav-ogham {
          font-size: 0.85rem;
          color: #2a4a1a;
          letter-spacing: 0.2em;
        }

        .cel-nav-item.active .cel-nav-ogham { color: #4a8a4a; }

        .cel-nav-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: #2a4a1a;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .cel-nav-item.active .cel-nav-label { color: #7ab87a; }

        .cel-content {
          flex: 1;
          overflow-y: auto;
          padding: 2.5rem 3rem;
          max-width: 800px;
        }

        .cel-section-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
        }

        .cel-section-label {
          font-family: 'Cinzel', serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: #7ab87a;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 0.5rem;
        }

        .cel-prose {
          font-size: 0.9rem;
          line-height: 1.95;
          color: #a0a880;
          font-family: 'IM Fell English', Georgia, serif;
        }

        .cel-prose p { margin-bottom: 1.5rem; }

        .cel-prose strong {
          color: #c8c0a0;
          font-weight: normal;
          font-style: italic;
        }

        .cel-books {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: #0a140a;
          border: 1px solid #0e1a0e;
        }

        .cel-book-card {
          background: #060a06;
          padding: 1.5rem;
          cursor: pointer;
          transition: background 0.15s;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          align-items: start;
        }

        .cel-book-card:hover { background: #09100a; }
        .cel-book-card.open { background: #09100a; }

        .cel-book-title {
          font-family: 'Cinzel', serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: #7ab87a;
          letter-spacing: 0.1em;
          margin-bottom: 0.2rem;
        }

        .cel-book-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #2a4a1a;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .cel-book-desc {
          font-size: 0.78rem;
          color: #3a5a2a;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
        }

        .cel-book-toggle {
          color: #2a4a1a;
          font-size: 1.2rem;
          transition: transform 0.25s, color 0.2s;
        }

        .cel-book-card.open .cel-book-toggle {
          transform: rotate(45deg);
          color: #7ab87a;
        }

        .cel-book-text {
          padding: 2rem;
          background: #040704;
          border-top: 1px solid #0a140a;
          font-size: 0.85rem;
          line-height: 2.1;
          color: #7a8a60;
          font-family: 'IM Fell English', Georgia, serif;
          font-style: italic;
          white-space: pre-wrap;
        }

        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #060a06; }
        ::-webkit-scrollbar-thumb { background: #0e1a0e; }
      `}</style>

      <div className="cel-app">
        {/* Ambient leaves */}
        <div className="cel-leaves">
          {leaves.map(l => (
            <div
              key={l.id}
              className="cel-leaf"
              style={{
                left: `${l.x}%`,
                top: `${l.y}%`,
                width: `${l.size}px`,
                height: `${l.size * 1.4}px`,
                opacity: l.opacity,
              }}
            />
          ))}
        </div>

        {/* Header */}
        <header className="cel-header">
          <div className="cel-header-inner">
            <h1 className="cel-title">Celtic</h1>
            <span className="cel-subtitle">Druid · Fili · Sidhe</span>
            <span className="cel-ogham-header">ᚉᚓᚂᚈᚔᚉ</span>
          </div>
          <KnotBorder />
        </header>

        <div className="cel-body">
          {/* Nav */}
          <nav className="cel-nav">
            {Object.entries(SECTIONS).map(([key, s]) => (
              <div
                key={key}
                className={`cel-nav-item ${activeSection === key ? "active" : ""}`}
                onClick={() => { setActiveSection(key); setOpenBook(null); }}
              >
                <span className="cel-nav-ogham">{s.ogham}</span>
                <span className="cel-nav-label">{s.label}</span>
              </div>
            ))}
          </nav>

          {/* Content */}
          <div className="cel-content">
            <div className="cel-section-header">
              <span className="cel-section-label">{section.label}</span>
              <KnotBorder />
            </div>

            {section.content && (
              <div className="cel-prose">
                {section.content.split("\n\n").map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{
                    __html: para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  }} />
                ))}
              </div>
            )}

            {section.books && (
              <div className="cel-books">
                {section.books.map(book => (
                  <div key={book.id}>
                    <div
                      className={`cel-book-card ${openBook === book.id ? "open" : ""}`}
                      onClick={() => setOpenBook(openBook === book.id ? null : book.id)}
                    >
                      <div>
                        <div className="cel-book-title">{book.title}</div>
                        <div className="cel-book-subtitle">{book.subtitle}</div>
                        <div className="cel-book-desc">{book.description}</div>
                      </div>
                      <div className="cel-book-toggle">+</div>
                    </div>
                    {openBook === book.id && (
                      <div className="cel-book-text">{book.text}</div>
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
