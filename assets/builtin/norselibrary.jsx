import { useState, useEffect } from "react";

const SECTIONS = {
  cosmology: {
    label: "World",
    rune: "ᚹ",
    runeName: "Wunjo",
    content: `Norse cosmology is built on a tree. Yggdrasil — the World Ash — holds nine worlds in its branches, trunk, and roots. This is not a metaphor. The tree is the actual structure of existence, and everything that happens anywhere happens within or upon it. Its roots reach into Asgard, where the gods dwell; into Jotunheim, realm of the giants; and into Niflheim, the primordial realm of ice and mist where the spring Hvergelmir feeds the rivers of the world. At its root in Niflheim coils Níðhöggr, the corpse-gnawer, who chews at the root without ceasing. The tree is always dying and always holding.

At the base of the world, before anything else, was a void — Ginnungagap. Not empty but charged, waiting. To the north, Niflheim, realm of ice. To the south, Muspelheim, realm of fire. Where the two met in the void, melt dripped and became Ymir, the first being — a frost giant, neither good nor evil, simply the first thing. He was fed by the cow Auðumbla, who licked blocks of ice and freed the first god, Búri, whose grandson Odin would eventually help kill Ymir and make the world from his body.

This is the Norse understanding of creation: the world is made from a body. The oceans are Ymir's blood. The earth is his flesh. The sky is his skull, held up by four dwarves at the cardinal directions. The clouds are his brains. The trees are his hair. Creation is not a gift — it is a transformation of what already existed, through an act of necessary violence. The world carries the substance of what it was made from.

**The nine worlds** held in Yggdrasil: Asgard, realm of the Aesir gods. Vanaheim, realm of the Vanir gods. Alfheim, realm of the light elves. Midgard, the middle world where humans live. Jotunheim, realm of the giants. Svartalfheim, realm of the dwarves and dark elves. Niflheim, realm of the dead who die of illness or old age. Muspelheim, the fire realm. Helheim, the cold hall of Hel, who receives all the dead who did not fall in battle.

**Ragnarök** — the fate of the gods — was not a surprise. The Norse gods knew it was coming. Odin spent his existence preparing for it, gathering heroes to Valhalla, trading his eye for knowledge at Mimir's well, hanging himself on Yggdrasil nine days to receive the runes. And still it would come: the Fimbulwinter, the great wolf swallowing the sun, the Midgard serpent rising from the sea, Loki breaking free, the gods falling one by one in paired combat with their enemies.

The point was never that the gods would win. The point was that they would fight knowing they would lose, and fight anyway. Courage without hope of victory. This is the quality the tradition most valued in its heroes.

After Ragnarök, the world would be reborn — green from the sea, new gods descending, the earth fertile again. Even the end was a cycle.`
  },

  pantheon: {
    label: "Gods",
    rune: "ᚨ",
    runeName: "Ansuz",
    content: `The Norse gods are not perfect. This is not a flaw in the mythology — it is the point. They know they are mortal, bound by fate, moving toward Ragnarök. What they do with that knowledge is who they are.

**Odin** — the Allfather, the wanderer, the hanged god, the seeker. He gave one eye to Mimir for a drink from the well of wisdom. He hung himself on Yggdrasil, wounded by a spear, nine days and nine nights, no food, no water, to receive the runes from the depths below. He sends his ravens Huginn and Muninn — Thought and Memory — across the world each day and fears that one morning they will not return. He collects heroes in Valhalla not from generosity but from need — he needs an army for Ragnarök. He is not kind. He is necessary.

**Thor** — the thunderer, protector of Midgard, son of Odin and the earth. His hammer Mjölnir was the most reliable protection against the giants who threatened both gods and humans. He was not subtle. He was enormous, red-bearded, direct, fond of eating and drinking beyond any reasonable limit. The gods needed him for strength in the same way they needed Odin for cunning. He wore iron gauntlets to hold the hammer, a belt that doubled his already tremendous strength. When he died at Ragnarök, he would kill the Midgard Serpent Jörmungandr and then fall nine steps from its venom.

**Loki** — the most difficult figure in the pantheon, the shape-changer, the necessary problem. He was not a god by birth but had sworn brotherhood with Odin. He helped the gods as often as he harmed them, usually through causing a problem and then solving it. He fathered the Midgard Serpent, the great wolf Fenrir, and Hel herself with the giantess Angrboða. He caused the death of Baldr through manipulation. For this he was eventually bound beneath the earth, a serpent dripping venom on his face, his wife Sigyn holding a bowl to catch it — when she must empty the bowl, the venom falls and his writhing causes earthquakes. He will break free at Ragnarök and lead the forces against the gods.

**Frigg** — Odin's wife, queen of Asgard, who knows the fate of all beings but speaks it to no one. When her son Baldr dreamed of his death, she extracted promises from every thing in the nine worlds not to harm him — except the mistletoe, which she judged too young to swear. Loki found the exception and used it. Baldr died. Frigg's knowing and not-speaking is one of the most haunting things in the mythology.

**Freya** — the Vanir goddess who taught Odin seiðr magic, goddess of love, fertility, war, and death. She chose half of all battle-slain for her hall Fólkvangr, Odin taking the other half for Valhalla. She wept tears of gold for her absent husband Óðr. She owned the necklace Brísingamen, for which she paid four nights with the four dwarves who made it. She owned a cloak of falcon feathers that gave the wearer flight, which she lent to Loki on more than one occasion. She was not gentle.

**Tyr** — the one-handed god of law and justice. When the gods decided to bind Fenrir, the great wolf, they needed someone to place their hand in his mouth as a pledge of good faith while they tied him. Everyone knew the binding would hold and the pledge would be broken. Tyr did it. When Fenrir found he could not break the binding, he bit off Tyr's hand. Tyr accepted this as the cost of what was necessary. He governs by sacrifice, not by power.

**Baldr** — the beautiful, the beloved, the one whose death proved that fate could not be prevented by love. He will return after Ragnarök, which makes his story not a tragedy but a temporary absence. The world that comes after needs him more than the world before.`
  },

  craft: {
    label: "Craft",
    rune: "ᚱ",
    runeName: "Raidho",
    content: `Norse magical practice centered on two distinct systems — **seiðr** and the **runes** — with a third layer in the cult practices of the sacred sites and the ancestral dead.

**The runes** were not invented. They were discovered. Odin hung on Yggdrasil nine days and nights, self-sacrificed to himself, and looked into the depths below until the runes rose up to meet him. They are marks that existed in the structure of reality before anyone used them to write — discovering them was learning to read something already there. Each rune was a force as well as a symbol. Fehu was wealth and cattle and the flowing of resources. Uruz was the wild ox, raw strength, the power before it was tamed. Thurisaz was the thorn, the giant, the force that destroys and clears. The runes were used inscribed on objects, carved into wood, painted with blood, spoken aloud. The inscription activated the force the rune represented.

**Seiðr** was a different kind of magic — trance-based, prophetic, concerned with fate. The völva, the seeress, would travel between settlements and be paid to sit on a high seat and enter trance to answer questions about the coming year, the fate of individuals, where lost things were. The trance was aided by chanting — varðlokur — which the völva could not usually perform herself but required a choir. Seiðr was associated with Freya, who taught it to Odin. It was considered ergi — unmanning — for men to practice, which is part of why Odin's practice of it was considered transgressive and part of his complicated position in the pantheon.

**The ancestral dead** remained in relationship with the living. The family farm had its landvættir — land spirits — and its ancestral dead who could be petitioned and offered to. Burial mounds were not merely graves but dwelling places of the dead who might still advise the living. The alf — the male ancestral spirit — was offered to at Álfablót, a private family sacrifice, women-led, closed to outsiders. The dead were not gone. They were present in a different register.

**Galdr** was spoken magical verse — the performative power of words structured in the particular rhythms that gave them force. Rune-work, invocation, cursing, and healing all used galdr. The structure of the verse mattered. The old forms — including ljóðaháttr, the meter used for magical speech in the Poetic Edda — were not aesthetic choices but functional ones. The pattern of the sound carried the working.

**The blót** — blood sacrifice — was the central communal ritual. Animals were sacrificed and their blood was used to bless the participants by sprinkling. The meat was eaten in a ritual feast where the gods were present through the sharing. Odin received hanged men. Thor received oxen. Freyr received a boar at Yule. The sacrifice was not merely offering but participation — the community entering into relationship with the divine through shared substance.

**Útiseta** — sitting out. A practice of going to a liminal place — a crossroads, a burial mound, a forest edge — and sitting through the night to receive visions or ancestral knowledge. The edges of things, the threshold hours, the places where different conditions met — these were where the membrane between registers was thinnest, and sitting at the threshold opened the practitioner to what moved through.`
  },

  books: {
    label: "Texts",
    rune: "ᛒ",
    runeName: "Berkano",
    content: null,
    books: [
      {
        id: "voluspa",
        title: "Völuspá",
        subtitle: "The Prophecy of the Völva · Poetic Edda",
        description: "A völva speaks to Odin, recounting the creation of the world, the age of the gods, and the coming of Ragnarök. The most complete and powerful mythological poem in the Norse tradition.",
        text: `Hearing I ask from the holy races,
From Heimdall's sons, both high and low;
Thou wilt, Valfather, that well I relate
Old tales I remember of men long ago.

I remember yet the giants of yore,
Who gave me bread in the days gone by;
Nine worlds I knew, the nine in the tree
With mighty roots beneath the mold.

Of old was the age when Ymir lived;
Sea nor cool waves nor sand there were;
Earth had not been, nor heaven above,
But a yawning gap, and grass nowhere.

Then Bur's sons lifted the level land,
Mithgarth the mighty there they made;
The sun from the south warmed the stones of earth,
And green was the ground with growing leeks.

The sun, the sister of the moon, from the south
Her right hand cast over heaven's rim;
No knowledge she had where her home should be,
The moon knew not what might was his,
The stars knew not where their stations were.

Then sought the gods their assembly-seats,
The holy ones, and council held;
Names then gave they to noon and twilight,
Morning they named, and the waning moon,
Night and evening, the years to number.

The Aesir met on the plains of Ida,
Shrines and temples they timbered high;
Forges they set, and they smithied ore,
Tongs they wrought, and tools they fashioned.`
      },
      {
        id: "havamal",
        title: "Hávamál",
        subtitle: "The Words of the High One · Stanzas 138–141",
        description: "Odin's own words — wisdom, survival, and the discovery of the runes. These are the stanzas describing his sacrifice on Yggdrasil.",
        text: `I know that I hung on the wind-tossed tree
All of nights nine,
Wounded by spear, bespoken to Odin,
Bespoken myself to myself,
Upon that tree of which none telleth
From what roots it doth rise.

Neither horn they upheld nor handed me bread;
I looked below me —
Aloud I cried —
Caught up the runes, caught them up wailing,
Thence to the ground fell again.

Nine mighty songs I learned from the great
Son of Bale-thorn, Bestla's father;
I drank a measure of the wondrous mead,
With the Soulstirrer's drops I was showered.

Ere long I bare fruit, and throve full well,
I grew and waxed in wisdom;
Word following word, I found me words,
Work following work, I found me works.`
      },
      {
        id: "gylfaginning",
        title: "Gylfaginning",
        subtitle: "The Fooling of Gylfi · Prose Edda",
        description: "Snorri Sturluson's 13th-century account of Norse cosmology, framed as a king's journey to Asgard in disguise. This passage describes Ragnarök — the fate of the gods.",
        text: `Then said Gangleri: "What tidings are to tell of Ragnarök? Of that fate I have not heard before."

High One answered: "Great things are to be said of it. First of all will come the winter called Fimbul-winter, in which snow will drive from all quarters; frosts will be severe, winds will be keen and biting, and there will be no joy in the sun. Three winters will follow in succession without any intervening summer.

Before that, three other winters will pass accompanied by great wars throughout all the world. Brothers will slay each other for greed's sake, and none will spare father or son.

Then happens that which will seem a great piece of news: the wolf will swallow the sun, and this will seem a great loss to men. The other wolf will seize the moon, and he too will do great scathe. The stars will vanish from the heavens.

The Midgard Serpent will blow so much poison that he will bespatter all the sky and sea with venom.

On this wise the sky is cloven, and the sons of Muspell ride forth from it. Surtr rides first, and before him and after him flames burning fire.

Then shall the gods, and all the einherjar, arm themselves and advance on to the plain of Vigrid.

Thor advances and kills the Midgard Serpent, and then falls dead, having gone nine steps, overcome by the venom.

Freyr fights with Surtr, and falls. He had given his sword to Skirnir, and so he had no weapon.

Then the hound Garm is loosed, which was bound before Gnipahellir. He is the greatest plague. He and Tyr make mutual slaughter.

Loki and Heimdall fight and slay each other.

After that, Surtr flings fire over the earth and burns all the world.

But after the world is burned, a new earth rises green from the sea. And Baldr comes back."`
      }
    ]
  }
};

const RUNE_STRIP = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";

export default function NorseLibrary() {
  const [activeSection, setActiveSection] = useState("cosmology");
  const [openBook, setOpenBook] = useState(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame;
    let last = null;
    const animate = (ts) => {
      if (!last) last = ts;
      setOffset(o => (o + (ts - last) * 0.008) % 100);
      last = ts;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const section = SECTIONS[activeSection];
  const runeRow = (RUNE_STRIP + " · ").repeat(8);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Crimson+Text:ital,wght@0,400;1,400&family=Inter:wght@300;400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nor-app {
          min-height: 100vh;
          background: #08090c;
          color: #c8c0b0;
          font-family: 'Crimson Text', Georgia, serif;
          display: flex;
          flex-direction: column;
        }

        .nor-rune-strip {
          height: 28px;
          background: #0c0e14;
          border-bottom: 1px solid #161820;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .nor-rune-inner {
          white-space: nowrap;
          font-size: 0.85rem;
          color: #2a2e40;
          letter-spacing: 0.4em;
          will-change: transform;
        }

        .nor-header {
          padding: 1.75rem 2.5rem 1.5rem;
          border-bottom: 1px solid #161820;
          display: flex;
          align-items: baseline;
          gap: 1.5rem;
        }

        .nor-title {
          font-family: 'Cinzel', serif;
          font-size: 1.1rem;
          font-weight: 400;
          color: #9090b0;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .nor-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #1e2030;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .nor-body {
          display: flex;
          flex: 1;
        }

        .nor-nav {
          width: 160px;
          flex-shrink: 0;
          border-right: 1px solid #101218;
          padding: 2rem 0;
        }

        .nor-nav-item {
          padding: 0.9rem 1.25rem;
          cursor: pointer;
          border-left: 2px solid transparent;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .nor-nav-item:hover { background: #0c0e14; }
        .nor-nav-item.active {
          border-left-color: #7070a0;
          background: #0c0e14;
        }

        .nor-nav-rune {
          font-size: 1.1rem;
          color: #1e2030;
          line-height: 1;
        }

        .nor-nav-item.active .nor-nav-rune { color: #4a4a70; }

        .nor-nav-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #1e2030;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .nor-nav-item.active .nor-nav-label { color: #9090b0; }

        .nor-content {
          flex: 1;
          overflow-y: auto;
          padding: 2.5rem 3rem;
          max-width: 800px;
        }

        .nor-section-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #101218;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .nor-section-rune {
          font-size: 2rem;
          color: #1e2030;
          line-height: 1;
        }

        .nor-section-label {
          font-family: 'Cinzel', serif;
          font-size: 0.78rem;
          font-weight: 400;
          color: #7070a0;
          letter-spacing: 0.25em;
          text-transform: uppercase;
        }

        .nor-prose {
          font-size: 0.92rem;
          line-height: 1.95;
          color: #9a9488;
          font-family: 'Crimson Text', Georgia, serif;
        }

        .nor-prose p { margin-bottom: 1.5rem; }

        .nor-prose strong {
          color: #c0b8a8;
          font-weight: normal;
          font-style: italic;
        }

        .nor-books {
          display: flex;
          flex-direction: column;
          gap: 1px;
          background: #101218;
          border: 1px solid #101218;
        }

        .nor-book-card {
          background: #08090c;
          padding: 1.5rem;
          cursor: pointer;
          transition: background 0.15s;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          align-items: start;
        }

        .nor-book-card:hover { background: #0a0b10; }
        .nor-book-card.open { background: #0a0b10; }

        .nor-book-title {
          font-family: 'Cinzel', serif;
          font-size: 0.82rem;
          font-weight: 400;
          color: #7070a0;
          letter-spacing: 0.1em;
          margin-bottom: 0.2rem;
        }

        .nor-book-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 0.62rem;
          color: #1e2030;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .nor-book-desc {
          font-size: 0.78rem;
          color: #2a2e40;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
        }

        .nor-book-toggle {
          color: #1e2030;
          font-size: 1.2rem;
          transition: transform 0.25s, color 0.2s;
        }

        .nor-book-card.open .nor-book-toggle {
          transform: rotate(45deg);
          color: #7070a0;
        }

        .nor-book-text {
          padding: 2rem;
          background: #060708;
          border-top: 1px solid #101218;
          font-size: 0.88rem;
          line-height: 2.1;
          color: #6a6880;
          font-family: 'Crimson Text', Georgia, serif;
          font-style: italic;
          white-space: pre-wrap;
        }

        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #08090c; }
        ::-webkit-scrollbar-thumb { background: #101218; }
      `}</style>

      <div className="nor-app">
        <div className="nor-rune-strip">
          <div
            className="nor-rune-inner"
            style={{ transform: `translateX(-${offset}%)` }}
          >
            {runeRow}
          </div>
        </div>

        <header className="nor-header">
          <h1 className="nor-title">Norse</h1>
          <span className="nor-subtitle">Aesir · Vanir · Yggdrasil</span>
        </header>

        <div className="nor-body">
          <nav className="nor-nav">
            {Object.entries(SECTIONS).map(([key, s]) => (
              <div
                key={key}
                className={`nor-nav-item ${activeSection === key ? "active" : ""}`}
                onClick={() => { setActiveSection(key); setOpenBook(null); }}
              >
                <span className="nor-nav-rune">{s.rune}</span>
                <span className="nor-nav-label">{s.label}</span>
              </div>
            ))}
          </nav>

          <div className="nor-content">
            <div className="nor-section-header">
              <span className="nor-section-rune">{section.rune}</span>
              <span className="nor-section-label">{section.label} · {section.runeName}</span>
            </div>

            {section.content && (
              <div className="nor-prose">
                {section.content.split("\n\n").map((para, i) => (
                  <p key={i} dangerouslySetInnerHTML={{
                    __html: para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                  }} />
                ))}
              </div>
            )}

            {section.books && (
              <div className="nor-books">
                {section.books.map(book => (
                  <div key={book.id}>
                    <div
                      className={`nor-book-card ${openBook === book.id ? "open" : ""}`}
                      onClick={() => setOpenBook(openBook === book.id ? null : book.id)}
                    >
                      <div>
                        <div className="nor-book-title">{book.title}</div>
                        <div className="nor-book-subtitle">{book.subtitle}</div>
                        <div className="nor-book-desc">{book.description}</div>
                      </div>
                      <div className="nor-book-toggle">+</div>
                    </div>
                    {openBook === book.id && (
                      <div className="nor-book-text">{book.text}</div>
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
