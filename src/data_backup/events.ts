import { GustoEvent } from "./types";

export const GUSTO_EVENTS: GustoEvent[] = [
  // 1. Paper Presentation
  {
    id: "paper-presentation",
    title: "Paper Presentation",
    category: "Technical",
    subCategory: "Group / Abstract",
    eventType: "ABSTRACT",
    date: "2026-03-06",
    time: "11:00 AM",
    venue: "Seminar Hall & HOD Lab",
    description:
      "The Paper Presentation technical event provides a platform for students to present their innovative ideas and research work. The event focuses on evaluating participants' understanding of the topics, originality of ideas, communication skills, and presentation abilities.",
    teamSize: "1-3 Members",
    image: "/events/tech/paper-present.png",
    submissionName: "Abstract Submission Email",
    submissionEmail: "subramanidhaya77@gmail.com",
    registrationDeadline: "March 04, 2026",
    isSlotsFull: true,
    onSpotRegistrationAvailable: false,
    coordinators: [
      { name: "Praveen Raj V", phone: "8838828045", role: "Event Coordinator" },
    ],
    rules: [
      "Solo and Team Participation of maximum three members are allowed.",
      "Participant must submit Abstract of their paper during the registration process on or before 4th March 2026.",
      "Papers will be shortlisted based on the Quality, Relevance and Originality of the Abstract.",
      "Author of the shortlisted paper will receive the mail from 5th of March 2026 or before.",
      "Accepted authors will receive instructions on how to proceed with full paper submission.",
      "Authors of accepted papers are asked to be ready with oral PowerPoint presentation for 7 to 10 min which will be the stage event.",
      "Winning contestants will be rewarded by attractive cash prizes.",
      "Each member of the team must register individually. However, the abstract should be submitted only once by the designated team leader on behalf of the team.",
      "When submitting the abstract, the team leader should include their name, department, year, phone number, college name, names of all team members, and the registration codes of all team members in the email.",
      "On-spot registration is not available.",
    ],
  },

  // 2. Project Presentation
  {
    id: "project-presentation",
    title: "Project Presentation",
    category: "Technical",
    subCategory: "Group / Abstract",
    eventType: "ABSTRACT",
    date: "2026-03-06",
    time: "11:00 AM",
    venue: "AD23 (final year class)",
    description:
      "Demonstrate your engineering skills by presenting a working project or prototype. Explain your design process, implementation challenges, and results in this showcase of technical innovation.",
    teamSize: "1-3 Members",
    image: "/events/tech/project-present.png",
    submissionName: "Project Abstract Submission Email",
    submissionEmail: "kavikumarbalaganesan@gmail.com",
    registrationDeadline: "March 04, 2026",
    isSlotsFull: false,
    onSpotRegistrationAvailable: false,
    coordinators: [
      { name: "S. Sivaranjani", phone: "8220174412", role: "Event Coordinator" },
    ],
    rules: [
      "The participants could be solo, a team of two or three.",
      "The participants must upload their project abstract, along with the existing system, proposed solutions with methodology, and scope, with a maximum of 5 pages as a soft copy during registration.",
      "The participants must bring their working project model and presentation slides.",
      "Presentation will approximately take 5-10 minutes per team, followed by a live demonstration of the project.",
      "The participants must provide their project report (hard copy).",
      "Batches will be allocated based on registration. The last date to send the abstract is 4th March 2026, and the shortlisted will get the mail on 5th of March 2026 or before.",
      "The winners will be determined by juries.",
      "Contestants who violate the rules and guidelines will be eliminated instantly.",
      "Each member of the team must register individually. However, the abstract should be submitted only once by the designated team leader on behalf of the team.",
      "When submitting the abstract, the team leader should include their name, department, year, phone number, college name, names of all team members, and the registration codes of all team members in the email.",
      "On-spot registration is not available.",
    ],
  },

  // 3. Think Like a Compiler
  {
    id: "think-like-a-compiler",
    title: "Think Like a Compiler",
    category: "Technical",
    subCategory: "Individual / Direct",
    eventType: "DIRECT",
    date: "2026-03-06",
    time: "11:45 AM",
    venue: "Hardware Lab",
    description:
      "Think like a Compiler is a technical programming event designed to evaluate participants' ability to analyse, interpret, and correct code with precision. The event challenges participants to approach programming problems from a compiler's perspective by focusing on syntax accuracy, logical correctness, and output prediction.",
    teamSize: "Individual (Solo)",
    image: "/events/tech/code-debug.png",
    registrationDeadline: "March 05, 2026 (12:00 PM)",
    isSlotsFull: false,
    onSpotRegistrationAvailable: true,
    coordinators: [
      { name: "Manisha M", phone: "9942011161", role: "Event Coordinator" },
    ],
    rules: {
      round1: {
        title: "Level 1 — Think Like a Compiler (30 Minutes)",
        description:
          "Analyze the given code without using a system or compiler. Use reasoning skills to identify errors, logical mistakes, or predict output step by step.",
        rules: [
          "Participants must not use any computer, compiler, mobile phone, or external devices during the event.",
          "All answers must be based only on logical thinking and manual analysis of the given code.",
          "Participants should carefully analyze the syntax, logic, and flow of the program before answering.",
          "The given program should not be executed on any system under any circumstances.",
          "Each participant must complete the task within the given time limit.",
          "Discussion with other participants is strictly prohibited during the event.",
          "Any form of malpractice or copying will lead to immediate disqualification.",
          "Answers must be written clearly and submitted within the allotted time.",
        ],
      },
      round2: {
        title: "Level 2 — Flip the Code (30 Minutes)",
        description:
          "Participants are given a program in which the lines of code are shuffled or arranged in the wrong order. Along with the expected output, participants must rearrange the code lines in the correct sequence.",
        rules: [
          "Participants will be given a program with shuffled or misplaced lines of code.",
          "The expected output will be provided along with the program.",
          "Participants must rearrange the code lines in the correct order to match the given output.",
          "Use of computers, compilers, mobile phones, or external devices is strictly prohibited.",
          "Marks will be awarded based on correctness, logic, and efficiency of the solution.",
          "The decision of the event coordinators/judges will be final.",
        ],
      },
      general: {
        title: "General Guidelines",
        rules: [
          "Strictly individual event.",
          "No external assistance or internet usage allowed.",
          "Decisions of the coordinators and judges are final.",
          "On-spot registration is available.",
        ],
      },
    },
  },

  // 4. Code Chaos
  {
    id: "code-chaos",
    title: "Code Chaos",
    category: "Technical",
    subCategory: "Individual / Direct",
    eventType: "DIRECT",
    date: "2026-03-06",
    time: "11:45 AM",
    venue: "Third Lab",
    description:
      "Code Chaos is a two-stage programming challenge designed to evaluate precision, logic building, and debugging ability under time pressure. Participants must first demonstrate accuracy by writing flawless code without feedback, and then prove analytical strength by correcting and optimizing faulty logic.",
    teamSize: "Individual (Solo)",
    image: "/events/tech/blind-coding.png",
    registrationDeadline: "March 05, 2026 (12:00 PM)",
    isSlotsFull: false,
    onSpotRegistrationAvailable: true,
    coordinators: [
      { name: "Surya P", phone: "6383150516", role: "Event Coordinator" },
    ],
    rules: {
      round1: {
        title: "Level 1 — Blind Coding (30 Minutes)",
        description: "Solve a programming problem without any trial-and-error execution feedback.",
        rules: [
          "Individual participation only.",
          "A problem statement with input and output format will be provided.",
          "Allowed programming languages: C, Python, Java.",
          "Participants must type and submit the complete program.",
          "Any runtime or compilation error results in elimination.",
          "Participants who successfully execute the program or produce the closest correct output within time qualify for Level 2.",
        ],
      },
      round2: {
        title: "Level 2 — Hunt Debugging (30 Minutes)",
        description: "Identify and correct logical flaws in a given program to produce the targeted output.",
        rules: [
          "A code containing logical flaws will be provided.",
          "Participants must analyze, modify, and provide the mentioned output.",
          "Multiple executions are allowed within the allotted time.",
          "Difficulty level: Medium.",
          "Ranking will be based on correctness of output, completion time, and logical accuracy.",
        ],
      },
      general: {
        title: "General Guidelines",
        rules: [
          "Strictly individual event.",
          "No external assistance or internet usage allowed.",
          "Decisions of coordinators/judges will be final.",
          "On-spot registration is available.",
        ],
      },
    },
  },

  // 5. PROMPTX
  {
    id: "promptx",
    title: "Prompt X",
    category: "Technical",
    subCategory: "Individual / Direct",
    eventType: "DIRECT",
    date: "2026-03-06",
    time: "11:45 AM",
    venue: "AD21 (second year class)",
    description:
      "PROMPTX is an individual AI-based competition that evaluates participants on prompt engineering skills, accuracy, efficiency, and time management. The event challenges participants to generate precise AI outputs using well-structured prompts across two distinct rounds.",
    teamSize: "Individual (Solo)",
    image: "/events/tech/hunt-mods.png",
    registrationDeadline: "March 05, 2026 (12:00 PM)",
    isSlotsFull: false,
    onSpotRegistrationAvailable: true,
    coordinators: [
      { name: "Karthick B", phone: "6383208735", role: "Event Coordinator" },
    ],
    rules: {
      round1: {
        title: "Round 1 — Image Recreation",
        description:
          "Participants are provided with AI-generated reference images. Each image must be recreated accurately using prompt engineering.",
        rules: [
          "Participants will be provided with 3 AI-generated reference images.",
          "Each image must be recreated as accurately as possible using AI image generation tools.",
          "Allowed AI Tools: ChatGPT, Gemini.",
          "Time limit: 6 minutes per image.",
          "Maximum of 5 prompts allowed per image.",
        ],
      },
      round2: {
        title: "Round 2 — Web Page Replication",
        description:
          "Participants will be given 2 web page design references (screenshots). Each web page must be replicated using AI-generated vanilla HTML, CSS, and JavaScript only.",
        rules: [
          "Participants will be given 2 web page design references (screenshots).",
          "Each web page must be replicated using AI-generated code.",
          "The designs must be recreated using vanilla HTML, CSS, and JavaScript only.",
          "Allowed AI Tools: ChatGPT, Claude, Gemini.",
          "Time limit: 10 minutes per webpage.",
          "Maximum of 5 prompts allowed per webpage.",
        ],
      },
      general: {
        title: "General Guidelines",
        rules: [
          "PROMPTX is an individual event. Team participation is not allowed.",
          "Participants must use only the AI tools specified for each round. Using other AI tools leads to disqualification.",
          "Manual code edits or modifications are strictly prohibited.",
          "All prompts used and final outputs must be submitted for evaluation.",
          "Participants must bring their own laptop (mandatory).",
          "Participants should come prepared with at least 2 email IDs.",
          "On-spot registration is available.",
        ],
      },
    },
  },

  // 6. Photography
  {
    id: "photography",
    title: "Photography",
    category: "Non-Technical",
    subCategory: "Online Submission",
    eventType: "SUBMISSION",
    date: "2026-03-06",
    time: "Online Event",
    venue: "Online Submission",
    description:
      "Capture the essence of a theme through your camera lens and tell a compelling visual story. This photography competition encourages creativity, originality, and technical skill. Present a single photograph that reflects strong composition, lighting, mood, and artistic vision.",
    teamSize: "Individual (Solo)",
    image: "/events/non-tech/photography.png",
    submissionName: "Photography Submission Email",
    submissionEmail: "gr906344@gmail.com",
    registrationDeadline: "March 05, 2026 (12:00 PM)",
    isSlotsFull: false,
    onSpotRegistrationAvailable: false,
    coordinators: [
      { name: "GAJIN S", phone: "9025732774", role: "Event Coordinator" },
    ],
    rules: [
      "Mode: Online Event.",
      "Allowed Themes: Frame within a Frame & Shadows, Seasonal Detail, Nostalgia, Reflective Photography.",
      "Photos must be originally captured by the participant. Images taken from browsers, websites, social media, or any online source are strictly prohibited.",
      "Participants must work individually; group submissions are not allowed.",
      "The use of AI-generated content is strictly prohibited. Collages are not allowed; submissions must consist of one single photograph only.",
      "Each participant may submit only one photograph. The aspect ratio must be 3:4. Only minimal touch editing (basic brightness, contrast, crop) is permitted.",
      "Any form of plagiarism will result in immediate disqualification.",
      "All photographs must be uploaded online before 5th March 2026 - 12:00 PM via gr906344@gmail.com.",
      "While sending the photograph, mention your name, department, year, phone number, college name, and registration code in the email.",
      "On-spot registration is not available.",
    ],
  },

  // 7. Meme Contest
  {
    id: "meme-contest",
    title: "Meme Contest",
    category: "Non-Technical",
    subCategory: "Online Submission",
    eventType: "SUBMISSION",
    date: "2026-03-06",
    time: "Online Event",
    venue: "Online Submission",
    description:
      "Meme Contest is a fun and creative competition that tests participants' creativity, humor, and awareness through memes. Participants must create memes based on the given themes. Evaluation is based on creativity, humor, theme relevance, and overall quality.",
    teamSize: "Individual (Solo)",
    image: "/events/non-tech/meme-contest.png",
    submissionName: "Meme Submission Email",
    submissionEmail: "yoroim80@gmail.com",
    registrationDeadline: "March 05, 2026 (12:00 PM)",
    isSlotsFull: false,
    onSpotRegistrationAvailable: false,
    coordinators: [
      { name: "MAHATHMA E", phone: "6374655791", role: "Event Coordinator" },
    ],
    rules: [
      "Themes: AI Technologies / College Life (Student Struggles, Final Year Project, Exams, Hostel Life, etc.) / Job vs Entrepreneurship.",
      "Memes must be created only based on the provided themes.",
      "Memes must be original — no copied memes from social media.",
      "Memes must be clean and college-friendly.",
      "Memes containing adult content, hate speech, or violence are strictly prohibited.",
      "This is an individual event only.",
      "While sending the meme, mention your name, department, year, phone number, college name, and registration code in the email.",
      "Only final meme(s) must be uploaded before the deadline: 5th March 2026 - 12:00 PM.",
      "Late submissions will not be considered. Submission mode is Online only.",
      "Breaking rules will lead to disqualification. On-spot registration is not available.",
    ],
  },

  // 8. Short Film Competition
  {
    id: "short-film",
    title: "Short Film Competition",
    category: "Non-Technical",
    subCategory: "Online Submission",
    eventType: "SUBMISSION",
    date: "2026-03-06",
    time: "Online Event",
    venue: "Online Submission",
    description:
      "The Short Film Competition provides a creative platform for students to showcase their storytelling, directing, and technical skills through visual media. Participants submit short films addressing innovative ideas, social messages, and artistic perspectives.",
    teamSize: "1-5 Members",
    image: "/events/tech/tech-quiz.png",
    submissionName: "Short Film Submission Email",
    submissionEmail: "adhithyav82005@gmail.com",
    registrationDeadline: "March 05, 2026 (12:00 PM)",
    isSlotsFull: false,
    onSpotRegistrationAvailable: false,
    coordinators: [
      { name: "Mari Sangeeth S", phone: "6383575163", role: "Event Coordinator" },
    ],
    rules: [
      "Each team may consist of 1 to 5 members. Open to students from all departments and colleges.",
      "The short film must be 20 to 30 minutes only.",
      "Open theme with a meaningful message. Any language is allowed.",
      "English subtitles are compulsory if the film is not in English.",
      "The film must be in MP4 format. Minimum resolution: 1080p (Full HD).",
      "Participants must upload their short film to Google Drive and ensure the link is shared with viewing access for evaluation.",
      "Each member of the team must register individually. The email should be sent only once by the team leader.",
      "Include team leader name, department, year, phone number, college name, names of all team members, registration codes, and Drive link in the email.",
      "The film must be original. Only copyright-free music and content should be used. Proper credits must be given.",
      "Vulgar or inappropriate content will lead to instant disqualification.",
      "Films will be judged based on Story/Message, Creativity, Direction/Editing, Cinematography, and Overall Impact.",
      "Last date for submission is 5th March 2026 - 12:00 PM. On-spot registration is not available.",
    ],
  },

  // 9. Think Sync
  {
    id: "icon-iq",
    title: "Think Sync",
    category: "Non-Technical",
    subCategory: "Offline Interactive",
    eventType: "DIRECT",
    date: "2026-03-06",
    time: "2:00 PM",
    venue: "AD21 (second year class) & AD22 (third year class)",
    description:
      "Icon IQ is a challenging and interactive non-technical event that tests participants' visual intelligence, logical thinking, and IT awareness through logo deduction and connection puzzles.",
    teamSize: "Individual (Solo)",
    image: "/events/tech/project-present.png",
    registrationDeadline: "March 05, 2026 (12:00 PM)",
    isSlotsFull: false,
    onSpotRegistrationAvailable: true,
    coordinators: [
      { name: "Bharath Kumar P", phone: "6379478168", role: "Event Coordinator" },
    ],
    rules: {
      round1: {
        title: "Round 1 — Logo Guessing Game",
        description: "Identify IT companies, software, and application logos from partial or disguised clues.",
        rules: [
          "Half logos will be displayed, and participants must guess the complete logo name.",
          "A logo image will be shown, and participants must identify the correct software/company.",
          "Questions will be based on IT companies, software, applications, and technology-related logos.",
          "Any wrong answer or rule violation may lead to elimination.",
          "Participants with the best accuracy and performance will be shortlisted for Round 2.",
        ],
      },
      round2: {
        title: "Round 2 — Connection Game",
        description: "Connect visual image clues to deduce technical terminology and concepts.",
        rules: [
          "By connecting the given images, participants must identify the correct technical word or concept.",
          "Similar images may be displayed to find a common connection.",
          "Tests logical thinking, technical knowledge, and analytical skills.",
          "The participant who provides the best output will be declared the winner.",
        ],
      },
      general: {
        title: "General Guidelines",
        rules: [
          "This is an individual Non-Technical event.",
          "This is an offline event.",
          "Participants must answer only based on the images and clues provided.",
          "Use of mobile phones, internet access, or external assistance is strictly prohibited.",
          "Judges' decision will be final and binding.",
          "On-spot registration is available.",
        ],
      },
    },
  },
];
