const { useState, useEffect, useRef } = React;
const { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } = lucide.icons;

const characters = [
  { name: 'Matthew', description: 'Musical genius, gentle giant, League bot laner' },
  { name: 'Josh', description: 'Goofy tax accountant, reformed toxic gamer' },
  { name: 'Kevin', description: 'K-pop stan, preschool teacher' },
  { name: 'Shane', description: 'Church worker, whisky lover, tactical gamer' },
];

const storyEvents = [
  "It was a crisp Bay Area evening when Matthew, a musical savant with the social grace of a well-meaning golden retriever on espresso, flung open the door to his apartment. He'd transformed the place into a gamer's paradise that looked like Summoner's Rift had a drunken one-night stand with a Guitar Center.",
  "'Holy shit, you made it!' Matthew exclaimed, his voice a cocktail of excitement and nerves. He was sporting a homemade Teemo hat that made him look like a six-foot-tall mushroom who'd stumbled into a League cosplay competition by mistake.",
  "Josh barreled in like a human pinball, bouncing off the doorframe. 'Who's ready to climb ranks and evade taxes?' he bellowed, his eyes wild with the manic energy of a man who'd replaced his blood with Red Bull.",
  "Kevin sashayed in, TWICE blasting from his phone at a volume that threatened to rupture eardrums. 'Bitches, you won't believe the choreo I learned for 'The Feels'!' he announced, demonstrating moves that would make his preschool students question their career choices.",
  "Shane sauntered in last, a bottle of top-shelf whisky in one hand and a bemused grin on his face. 'Lord give me strength,' he muttered, though the gleam in his eye suggested he was more than ready for the chaos.",
  "'Alright, you degenerates,' Matthew said, gesturing to a snack-laden table. 'I've got 'Baron Nashor Nachos' and 'Teemo Shrooms.' And no, they're not magic mushrooms. Probably. I mean, I didn't test them or anything.'",
  "As the match kicked off, so did the commentary, a beautiful disaster of friendship and profanity.",
  "'Jesus H. Christ, that gank was about as smooth as my client's attempt to write off his pet llama as a business expense!' Josh howled, slapping his knee.",
  "Kevin celebrated each kill with a burst of K-pop choreography that looked like a fusion of TWICE and a man desperately trying to put out a fire in his pants.",
  "Shane, three fingers of whisky in, started offering tactical advice that sounded suspiciously like repurposed Bible verses. 'And lo, the support did ward the river, and it was good.'",
  "As the night wore on, their shenanigans escalated. Matthew attempted to play the Worlds theme on his violin while headbanging, nearly concussing himself with his own Teemo hat.",
  "Josh started using Matthew's South Park figurines to demonstrate optimal team positioning. Kevin taught everyone the choreo to 'Cheer Up,' resulting in four grown men awkwardly bouncing around the living room.",
  "Shane found himself drawing increasingly convoluted parallels between League and the Book of Revelation.",
  "By the final match, they were a glorious mess: Josh passed out on the couch, mumbling about tax brackets; Kevin voiceless but still lip-syncing to TWICE; Shane contemplating how to sneak League terminology into his next sermon; and Matthew serenading his unamused neighbors with a violin rendition of 'Silver Scrapes' at 3 AM.",
  "As dawn broke, the four friends stumbled out, exhausted but grinning like idiots, their bond stronger than ever.",
  "'Same time next year, you beautiful bastards?' Matthew asked hopefully. The chorus of 'fuck yeah' was all the answer he needed."
];

function LeagueNightStory() {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [nextEvent, setNextEvent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pageTurnDirection, setPageTurnDirection] = useState('next');
  const textContainerRef = useRef(null);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentEvent(nextEvent);
        if (textContainerRef.current) {
          textContainerRef.current.scrollTop = 0;
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, nextEvent]);

  const changeEvent = (newEvent, direction) => {
    if (newEvent !== currentEvent && !isTransitioning) {
      setNextEvent(newEvent);
      setIsTransitioning(true);
      setPageTurnDirection(direction);
    }
  };

  const goToNext = () => {
    changeEvent(Math.min(currentEvent + 1, storyEvents.length - 1), 'next');
  };

  const goToPrevious = () => {
    changeEvent(Math.max(currentEvent - 1, 0), 'prev');
  };

  const goToStart = () => {
    changeEvent(0, 'prev');
  };

  const goToEnd = () => {
    changeEvent(storyEvents.length - 1, 'next');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-cover min-h-screen font-serif text-stone-800 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-yellow-50 border-8 border-double border-amber-900 p-8 shadow-2xl relative overflow-hidden">
        <h1 className="text-4xl font-bold text-center mb-6 text-amber-900 relative z-10">The Chronicles of League Night</h1>
        
        <div className="mb-8 relative">
          <div ref={textContainerRef} className="h-80 overflow-hidden mb-4 relative bg-amber-50 border-2 border-amber-900 p-6 shadow-inner">
            <div className={`absolute inset-0 transition-opacity duration-500 ease-in-out p-6 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <p className="text-lg first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:mt-1">{storyEvents[currentEvent]}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-8 relative z-10">
          <div className="flex space-x-2">
            <button onClick={goToStart} disabled={currentEvent === 0 || isTransitioning} className="bg-amber-700 hover:bg-amber-800 text-white p-2 rounded">
              <ChevronsLeft size={16} />
            </button>
            <button onClick={goToPrevious} disabled={currentEvent === 0 || isTransitioning} className="bg-amber-700 hover:bg-amber-800 text-white p-2 rounded">
              <ChevronLeft size={16} />
            </button>
          </div>
          <span className="text-sm text-amber-900 font-bold">
            Chapter {currentEvent + 1} of {storyEvents.length}
          </span>
          <div className="flex space-x-2">
            <button onClick={goToNext} disabled={currentEvent === storyEvents.length - 1 || isTransitioning} className="bg-amber-700 hover:bg-amber-800 text-white p-2 rounded">
              <ChevronRight size={16} />
            </button>
            <button onClick={goToEnd} disabled={currentEvent === storyEvents.length - 1 || isTransitioning} className="bg-amber-700 hover:bg-amber-800 text-white p-2 rounded">
              <ChevronsRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {characters.map((char) => (
            <div key={char.name} className="bg-amber-50 p-4 border-2 border-amber-900 shadow-md">
              <h3 className="text-xl font-bold mb-2 text-amber-900">{char.name}</h3>
              <p className="text-sm">{char.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
