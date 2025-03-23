/* Program Data

  in this file you can declare variables to store important data for your program
  the data can only be primitives, objects or arrays
  do not store dom elements in these variables!!!!

  these variables will be imported by your handlers when necessary
    not by your logic
    not by your listeners
*/

export const quizData = {
  currentQuestionIndex: 0,
  // the questions in the quiz
  questions: [
    {
      text: 'Who was the first king to sit on the Iron Throne?',
      answers: {
        a: 'A guy who really liked sharp chairs',
        b: 'Aegon I Targaryen',
        c: 'The only one who ignored the Do not sit sign',
        d: 'A blacksmith testing his new project',
      },
      correct: 'b',
      selected: null,
      backgroundImage: "images/JonSnow.jpg",
      links: [
        {
          text: 'History of Aegon the Conqueror',
          href: 'https://gameofthrones.fandom.com/wiki/Aegon_I_Targaryen',
        },
      ],
    },
    {
      text: 'Who was Jon Snow’s real father?',
      answers: {
        a: 'Eddard Stark (so he thought)',
        b: 'The Snowman',
        c: 'A very persuasive raven',
        d: 'Rhaegar Targaryen',
      },
      correct: 'd',
      selected: null,
      backgroundImage: "src/images/JonSnow.jpg",
      links: [
        {
          text: 'The truth behind Jon Snow’s parentage',
          href: 'https://gameofthrones.fandom.com/wiki/Rhaegar_Targaryen',
        },
      ],
    },
    {
      text: 'What is the motto of House Stark?',
      answers: {
        a: 'Winter is Coming',
        b: 'Close the gate, for once!',
        c: 'No family reunion ends well',
        d: 'A free wolf with every winter-born child',
      },
      correct: 'a',
      selected: null,
      backgroundImage: "images/JonSnow.jpg",
      links: [
        {
          text: 'House Stark and their legacy',
          href: 'https://gameofthrones.fandom.com/wiki/House_Stark',
        },
      ],
    },
    {
      text: 'What is the name of Arya Stark’s sword?',
      answers: {
        a: 'The Sharp Argument Winner',
        b: 'Needle',
        c: 'Tiny Stab-Stab',
        d: 'Toothpick',
      },
      correct: 'b',
      selected: null,
      backgroundImage: "images/JonSnow.jpg",
      links: [
        {
          text: 'Arya Stark’s deadly weapon',
          href: 'https://gameofthrones.fandom.com/wiki/Needle',
        },
      ],
    },
    {
      text:
        'Who was the last ruler of the Six Kingdoms at the end of the series?',
      answers: {
        a: 'Bran Stark',
        b: 'Whoever was still standing',
        c: 'A Starbucks cup',
        d: 'The dragon, unofficially',
      },
      correct: 'a',
      selected: null,
      backgroundImage: "images/JonSnow.jpg",
      links: [
        {
          text: 'Why Bran Stark was chosen as king',
          href: 'https://gameofthrones.fandom.com/wiki/Bran_Stark',
        },
      ],
    },
    {
      text: 'Who killed the Night King?',
      answers: {
        a: 'Jon Snow (but only in his dreams)',
        b: 'Gravity and bad reflexes',
        c: 'Arya Stark',
        d: 'A surprise knife delivery',
      },
      correct: 'c',
      selected: null,
      backgroundImage: "images/JonSnow.jpg",
      links: [
        {
          text: 'The fall of the Night King',
          href: 'https://gameofthrones.fandom.com/wiki/Night_King',
        },
      ],
    },
    {
      text: 'What is the name of Daenerys Targaryen’s largest dragon?',
      answers: {
        a: 'Flameboi',
        b: 'Drogon',
        c: 'Mommy’s Flying Furnace',
        d: 'The Budget Burner',
      },
      correct: 'b',
      selected: null,
      backgroundImage: "images/JonSnow.jpg",
      links: [
        {
          text: 'Daenerys’ bond with Drogon',
          href: 'https://gameofthrones.fandom.com/wiki/Drogon',
        },
      ],
    },
    {
      text: 'Who was responsible for creating the White Walkers?',
      answers: {
        a: 'The Children of the Forest',
        b: 'A failed winter festival organizer',
        c: 'The Night’s Watch HR department',
        d: 'An ice sculptor with issues',
      },
      correct: 'a',
      selected: null,
      backgroundImage: "images/JonSnow.jpg",
      links: [
        {
          text: 'The origins of the White Walkers',
          href: 'https://gameofthrones.fandom.com/wiki/White_Walker',
        },
      ],
    },
    {
      text: 'What was the name of the giant crossbow used to kill dragons?',
      answers: {
        a: 'Arrowzilla',
        b: 'Wooden Regret',
        c: 'Scorpion',
        d: 'The ‘Please Work’ 3000',
      },
      correct: 'c',
      selected: null,
      backgroundImage: "images/JonSnow.jpg",
      links: [
        {
          text: 'The Scorpion’s role in warfare',
          href: 'https://gameofthrones.fandom.com/wiki/Scorpion_(weapon)',
        },
      ],
    },
    {
      text:
        'What is the name of the ancestral Valyrian steel sword of House Stark?',
      answers: {
        a: 'Gone Before Its Time',
        b: 'Ned’s Big Mistake',
        c: 'Cold Cuts',
        d: 'Ice',
      },
      correct: 'd',
      selected: null,
      backgroundImage: "images/JonSnow.jpg",
      links: [
        {
          text: 'House Stark’s legendary sword',
          href: 'https://gameofthrones.fandom.com/wiki/Ice_(sword)',
        },
      ],
    },
  ],
};
