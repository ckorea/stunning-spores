import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gamepad2, Music, Calculator, Mic2, Cross, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

const characters = [
  { name: 'Matthew', icon: <Music />, color: 'bg-blue-500', description: 'Musical genius, gentle giant, League bot laner' },
  { name: 'Josh', icon: <Calculator />, color: 'bg-green-500', description: 'Goofy tax accountant, reformed toxic gamer' },
  { name: 'Kevin', icon: <Mic2 />, color: 'bg-pink-500', description: 'K-pop stan, preschool teacher' },
  { name: 'Shane', icon: <Cross />, color: 'bg-purple-500', description: 'Church worker, whisky lover, tactical gamer' },
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

export default function LeagueNightStory() {
  const [currentEvent, setCurrentEvent] = useState(0);
  const [nextEvent, setNextEvent] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const changeEvent = (newEvent) => {
    if (newEvent !== currentEvent && !isTransitioning) {
      setNextEvent(newEvent);
      setIsTransitioning(true);
    }
  };

  const goToNext = () => {
    changeEvent(Math.min(currentEvent + 1, storyEvents.length - 1));
  };

  const goToPrevious = () => {
    changeEvent(Math.max(currentEvent - 1, 0));
  };

  const goToStart = () => {
    changeEvent(0);
  };

  const goToEnd = () => {
    changeEvent(storyEvents.length - 1);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">A Night of League, Friendship, and Chaos</CardTitle>
          <CardDescription>Four childhood friends reunite for an unforgettable gaming night</CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={textContainerRef} className="h-48 overflow-y-auto mb-4 relative">
            <div className="absolute inset-0 transition-opacity duration-500 ease-in-out" 
                 style={{opacity: isTransitioning ? 0 : 1}}>
              <p className="text-lg">{storyEvents[currentEvent]}</p>
            </div>
            <div className="absolute inset-0 transition-opacity duration-500 ease-in-out" 
                 style={{opacity: isTransitioning ? 1 : 0}}>
              <p className="text-lg">{storyEvents[nextEvent]}</p>
            </div>
          </div>
          <div className="flex justify-between mb-4">
            {characters.map((char) => (
              <div key={char.name} className={`${char.color} p-2 rounded-full`} title={char.description}>
                {char.icon}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button onClick={goToStart} disabled={currentEvent === 0 || isTransitioning}>
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button onClick={goToPrevious} disabled={currentEvent === 0 || isTransitioning}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
          <span className="text-sm text-gray-500">
            Event {currentEvent + 1} of {storyEvents.length}
          </span>
          <div className="flex space-x-2">
            <Button onClick={goToNext} disabled={currentEvent === storyEvents.length - 1 || isTransitioning}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button onClick={goToEnd} disabled={currentEvent === storyEvents.length - 1 || isTransitioning}>
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
      <div className="grid grid-cols-2 gap-4">
        {characters.map((char) => (
          <Card key={char.name}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className={`${char.color} p-2 rounded-full mr-2`}>{char.icon}</span>
                {char.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{char.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}