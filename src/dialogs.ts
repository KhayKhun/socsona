/**
 * TraitKey represents the unique personality trait identifiers used in the quiz scoring system.
 *
 * Each trait corresponds to a specific aspect of a user's social media personality:
 *
 * - "C" (Creator): Enjoys generating original content, ideas, or creative posts.
 * - "E" (Engager): Actively interacts with content (e.g., likes, comments) even if not creating much.
 * - "L" (Lurker): Primarily observes without actively participating or posting.
 *
 * - "O" (Outspoken): Expresses strong, bold opinions and is unafraid of being direct.
 * - "D" (Diplomatic): Maintains tact and balance, mediating conflicts and handling criticism gracefully.
 * - "S" (Subtle): Prefers a reserved, understated approach in communication.
 *
 * - "P" (Public): Comfortable with sharing personal details and engaging with a wide audience.
 * - "V" (Private): Values privacy and tends to keep personal information and interactions limited.
 * 
 * CEL are in a group, ODS are in a group, PV are a group. 
 * When the result is counted, I will chose the one from CEL, the highest one. one from ODS and one from PV. So the result will be something like COP, COV, EDV,... A person must have
 * a trait from CEL, a trait from ODS, a trait from PV.
 */
export type TraitKey =
  | "C" // Creator
  | "E" // Engager
  | "L" // Lurker
  | "O" // Outspoken
  | "D" // Diplomatic
  | "S" // Subtle
  | "P" // Public
  | "V"; // Private

export interface DialogAnswer {
  text: string;
  answerFollowUp: string[];
  responseFollowUp: string[];
  scores: Partial<Record<TraitKey, number>>;
}

export interface Dialog {
  id: number;
  questions: string;
  answers: DialogAnswer[];
}
export const dialogs: Dialog[] = [
  {
    id: 0,
    questions: "Hi there! Welcome from Socsona. We're here to let you know about yourself by just knowing how you use social media.",
    answers: [
      {
        text: "Okay, I'm interested.",
        answerFollowUp: [],
        responseFollowUp: ["Great! Let's begin."],
        scores: {},
      },
    ],
  },
  {
    id: 99,
    questions: "Before we start, I will ask you some simple questions about how you use social media. Then, I will tell you what I learn about you.",
    answers: [
      {
        text: "Okay, let's do it.",
        answerFollowUp: [],
        responseFollowUp: ["Alright! Here is the first question."],
        scores: {},
      },
    ],
  },
  {
    id: 1,
    questions: "Imagine a new social media app is becoming very popular. Everyone is talking about it. What do you do?",
    answers: [
      {
        text: "I already made an account and posted something!",
        answerFollowUp: ["I like to try new things first!"],
        responseFollowUp: ["Wow! You are quick to join new trends."],
        scores: { C: 3, O: 2, P: 2 },
      },
      {
        text: "I will make an account but just look around first.",
        answerFollowUp: ["I want to see if it’s interesting."],
        responseFollowUp: ["Smart! You take your time to decide."],
        scores: { E: 2, S: 1, D: 2 },
      },
      {
        text: "I will ignore it for now.",
        answerFollowUp: ["I don’t change apps often."],
        responseFollowUp: ["You like to stick with what you know. That makes sense!"],
        scores: { L: 3, V: 2, S: 1 },
      },
    ],
  },

  {
    id: 2,
    questions: "Your friend tags you in a public post without asking you first. What do you do?",
    answers: [
      {
        text: "It’s okay, I will leave it.",
        answerFollowUp: ["They didn’t mean any harm."],
        responseFollowUp: ["You are easygoing and don’t worry too much."],
        scores: { E: 2, P: 3, S: 1 },
      },
      {
        text: "I will ask them to remove it. I prefer privacy.",
        answerFollowUp: ["I like to control what is on my profile."],
        responseFollowUp: ["You care about privacy, and that is important."],
        scores: { V: 3, S: 1, D: 2 },
      },
      {
        text: "I don’t like it, but I won’t say anything.",
        answerFollowUp: [],
        responseFollowUp: ["You try to keep things peaceful."],
        scores: { D: 2, V: 2, S: 1 },
      },
    ],
  },

  {
    id: 3,
    questions: "There is a new trend on social media. Are you joining in?",
    answers: [
      {
        text: "Yes! I will make my own version right away.",
        answerFollowUp: ["It looks fun!"],
        responseFollowUp: ["You enjoy making content and trying new things!"],
        scores: { C: 3, O: 2, P: 3 },
      },
      {
        text: "Maybe, but I will do a simple version.",
        answerFollowUp: [],
        responseFollowUp: ["You like to be part of trends, but in a careful way."],
        scores: { D: 2, C: 2, S: 2, P: 1 },
      },
      {
        text: "No, I will just watch other people do it.",
        answerFollowUp: ["I prefer to observe."],
        responseFollowUp: ["You enjoy watching trends, but you don’t feel the need to join."],
        scores: { L: 3, E: 2, S: 1 },
      },
    ],
  },

  {
    id: 4,
    questions: "Someone leaves a rude comment on your post. What do you do?",
    answers: [
      {
        text: "I will reply to them. I can’t let them say that!",
        answerFollowUp: [],
        responseFollowUp: ["You are not afraid to speak up!"],
        scores: { O: 3, C: 2, P: 2 },
      },
      {
        text: "I will delete the comment or block them.",
        answerFollowUp: ["No need for drama."],
        responseFollowUp: ["You keep things peaceful. That’s a good strategy."],
        scores: { S: 3, V: 2, E: 1 },
      },
      {
        text: "I will reply and try to understand why they said that.",
        answerFollowUp: ["Maybe they misunderstood me."],
        responseFollowUp: ["You like to solve problems with words. That is very thoughtful."],
        scores: { D: 3, E: 2, S: 1 },
      },
    ],
  },

  {
    id: 5,
    questions: "You check your phone and see that you have spent 6 hours on social media today. What do you think?",
    answers: [
      {
        text: "That’s fine. I enjoy my time online.",
        answerFollowUp: ["It’s just part of my day."],
        responseFollowUp: ["You are comfortable spending time online!"],
        scores: { E: 3, P: 2, S: 1 },
      },
      {
        text: "That is too much! I need to use my phone less.",
        answerFollowUp: [],
        responseFollowUp: ["You like to keep a good balance. That is smart!"],
        scores: { D: 3, S: 1, V: 2 },
      },
      {
        text: "I was creating content, so it’s okay.",
        answerFollowUp: [],
        responseFollowUp: ["You see social media as a creative space! That’s great."],
        scores: { C: 3, O: 2, E: 2, P: 2 },
      },
    ],
  },

  {
    id: 6,
    questions: "You just watched a very interesting video. What do you do next?",
    answers: [
      {
        text: "I will share it right away! My friends need to see this.",
        answerFollowUp: ["They will love it!"],
        responseFollowUp: ["You enjoy sharing things that make you happy!"],
        scores: { E: 3, P: 3, O: 2 },
      },
      {
        text: "Only if it is really good.",
        answerFollowUp: ["I don’t want to spam people."],
        responseFollowUp: ["You like to share things in a meaningful way!"],
        scores: { D: 2, S: 2, P: 1 },
      },
      {
        text: "No, I will just enjoy it by myself.",
        answerFollowUp: ["Not everything needs to be shared."],
        responseFollowUp: ["You prefer a more private experience. That’s okay too!"],
        scores: { L: 3, V: 3, S: 1 },
      },
    ],
  },

  {
    id: 7,
    questions: "Think about when you are on social media. Do you start conversations, or do you wait for others?",
    answers: [
      {
        text: "I like to start conversations!",
        answerFollowUp: ["It’s fun to talk to people."],
        responseFollowUp: ["You are very social and enjoy connecting with others!"],
        scores: { O: 3, C: 2, P: 2 },
      },
      {
        text: "Sometimes, if I have something to say.",
        answerFollowUp: ["It depends on the topic."],
        responseFollowUp: ["You like to join conversations when it feels right!"],
        scores: { D: 2, E: 2, S: 1 },
      },
      {
        text: "I usually wait for others to start.",
        answerFollowUp: ["I prefer listening to talking."],
        responseFollowUp: ["You enjoy being part of conversations, but you don’t always start them. That’s okay!"],
        scores: { L: 3, V: 3, S: 1 },
      },
    ],
  },
];
