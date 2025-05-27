
function generateMoodBoxName(donuts) {

  
const extractMood = donut => {
  if (typeof donut === 'object') {
    if (donut.mood) return donut.mood;
    if (donut.name && moodThemes[donut.name]) return moodThemes[donut.name];
  }
  if (typeof donut === 'string' && moodThemes[donut]) return moodThemes[donut];
  return "mystery";
};

const comboLabels = { /* ... existing comboLabels ... */ };

const freq = {}, moodCount = {};
for (const mood in moodLabels) moodCount[mood] = 0;

donuts.forEach(donut => {
  const name = typeof donut === 'string' ? donut : donut.name;
  const mood = extractMood(donut); // 🧠 use the reliable extractor

  freq[name] = (freq[name] || 0) + 1;
  moodCount[mood]++;
});


console.log("🔍 Donut input:", donuts[0]);

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const uniqueCount = sorted.length;

  if (donuts.length === 0) return "Fill Me!";

if (donuts.length === 1) {
  console.log("🔍 Single donut object:", donuts[0]);
  const mood = extractMood(donuts[0]);
  console.log("🎯 Extracted mood:", mood);
  return moodLabels[mood] || "Single Mood";
}


//2 DONUTS
if (donuts.length === 2) {
  const moods = donuts.map(d => extractMood(d)).sort(); // sorted for consistency
  const [m1, m2] = moods;

  if (m1 === m2) {
    const doubleOptions = [
      `Double ${moodLabels[m1]}`,
      `Two of ${moodLabels[m1]}`,
      `${moodLabels[m1]} x2`,
      `Twinned ${moodLabels[m1]}`,
      `Paired in ${moodLabels[m1]}`
    ];
    return doubleOptions[Math.floor(Math.random() * doubleOptions.length)];
  }

  const key = `${m1}_${m2}`;
  const reversedKey = `${m2}_${m1}`;

  const pairLabels = {
    happy_sad: ["Bittersweet Bites", "Smiles & Sobs", "Sweet-Sour Duo"],
    happy_angry: ["Joy vs. Fury", "Mood Clash", "Smiling Rage"],
    happy_dreamy: ["Whimsical Joys", "Sweet Daydreams", "Cheerful Cloud"],
    happy_calm: ["Sunny & Still", "Easy Breezy", "Bright and Mellow"],
    happy_surprise: ["Delight Shock", "Cheer Jolt", "Unexpected Joy"],
    happy_conflicted: ["Conflicted Cheer", "Happy Doubts", "Mixed Bliss"],
    happy_weird: ["Happy but Huh?", "Eccentric Joy", "Smiling Oddity"],

    sad_angry: ["Glazed Fury", "Blue Rage", "Angry Tears"],
    sad_tired: ["Sleepy Tears", "Sad Slump", "Exhausted Blues"],
    sad_conflicted: ["Torn & Blue", "Sad Dilemma", "Emotional Mess"],
    sad_weird: ["Weirdly Sad", "Odd Blues", "Peculiar Sorrow"],

    angry_calm: ["Fire & Ice", "Rage Chilled", "Zen Meets Fury"],
    angry_dreamy: ["Dreams on Fire", "Spicy Fantasy", "Burning Thoughts"],
    angry_weird: ["Unhinged Glaze", "Rage & Random", "Anger Spiral"],

    calm_dreamy: ["Gentle Drift", "Zen Dreams", "Soft-Glazed Vibes"],
    calm_tired: ["Dozy & Chill", "Relaxed Exhaustion", "Low-Energy Mood"],
    calm_weird: ["Still but Strange", "Quiet Quirks", "Odd Tranquility"],

    dreamy_tired: ["Nap Ready", "Sleepy Thoughts", "Drowsy Vibes"],
    dreamy_weird: ["Surreal Set", "Dreamy Strange", "Fantasy Glaze"],
    dreamy_conflicted: ["Dreamy Dilemma", "Mind Maze", "Wishful Uncertainty"],

    tired_stressed: ["Running Low", "Burnout Glaze", "Tense Fatigue"],
    tired_weird: ["Tired & Twisted", "Sleepy Strange", "Zoned Out"],
    tired_conflicted: ["Dragging Confusion", "Fatigue Fight", "Mood on Empty"],

    stressed_conflicted: ["Crisis Glaze", "Stress Spiral", "Tense & Torn"],
    stressed_weird: ["Nervous Oddity", "Cracked Glaze", "Fuzzy Freakout"],

    surprise_weird: ["Unexpectedly Odd", "Random Shock", "Wildcard Mood"],
    surprise_conflicted: ["Surprised & Split", "Twist & Tension", "WTF Glaze"],

    // Optional bonus flavor
    happy_neutral: ["Just Okay Joy", "Happy Meh", "Fine & Fun"],
    sad_neutral: ["Fine But Sad", "Blah Blues", "Neutral Lows"],
    tired_neutral: ["Barely Awake", "Almost Fine", "Quiet Glaze"],

    // More can be added...
  };

  const options =
    pairLabels[key] ||
    pairLabels[reversedKey] || [
      `${moodLabels[m1]} + ${moodLabels[m2]}`,
      `Split Box: ${moodLabels[m1]} & ${moodLabels[m2]}`,
      `Two-Tone Treat`
    ];

  return options[Math.floor(Math.random() * options.length)];
}



// 3 DONUTS
if (donuts.length === 3) {
  const moods = donuts.map(d => extractMood(d)).sort();
  const uniqueMoods = [...new Set(moods)];

  // 🟢 All three the same
  if (uniqueMoods.length === 1) return `Triple ${moodLabels[uniqueMoods[0]]}`;

  // 🌀 Two the same, one intruder
  const counts = moods.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});
  const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (topMood[1] === 2) {
    const mostlyOptions = [
      `Mostly ${moodLabels[topMood[0]]}`,
      `Two Scoops of ${moodLabels[topMood[0]]}`,
      `Leaning ${moodLabels[topMood[0]]}`
    ];
    return mostlyOptions[Math.floor(Math.random() * mostlyOptions.length)];
  }

  // 🎯 Specific combos
  if (moods.includes("conflicted")) {
    const options = ["Mixed Signals", "Feeling Torn", "Glazed Confusion"];
    return options[Math.floor(Math.random() * options.length)];
  }

  if (moods.includes("weird") || moods.includes("surprise")) {
    const options = ["Odd Blend", "Unexpected Trio", "Strange Mix"];
    return options[Math.floor(Math.random() * options.length)];
  }

  if (moods.includes("happy") && moods.includes("sad") && moods.includes("angry")) {
    const whiplashOptions = ["Emotional Whiplash", "Happy-Sad-Mad", "The Mood Triangle"];
    return whiplashOptions[Math.floor(Math.random() * whiplashOptions.length)];
  }

  if (moods.includes("calm") && moods.includes("dreamy") && moods.includes("tired")) {
    const chillOptions = ["Chill Vibes", "Dozy Dream Trio", "Low-Energy Sampler"];
    return chillOptions[Math.floor(Math.random() * chillOptions.length)];
  }

  // 🧩 Fallback
  const medleyOptions = ["Mood Medley", "Three's a Mood", "Mini Mood Box"];
  return medleyOptions[Math.floor(Math.random() * medleyOptions.length)];
}


///4 DONUTS
// 🍩 Four Donuts - Enhanced Logic
if (donuts.length === 4) {
  const moods = donuts.map(d => extractMood(d));
  const counts = moods.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});
  const entries = Object.entries(counts);

  // 🎯 4 of the same
  if (entries.length === 1) {
    const mood = entries[0][0];
    const quadOptions = [
      `All-In on ${moodLabels[mood]}`,
      `Full ${moodLabels[mood]}`,
      `4x ${moodLabels[mood]} Stack`,
      `Box of ${moodLabels[mood]}`
    ];
    return quadOptions[Math.floor(Math.random() * quadOptions.length)];
  }

  // 🎯 3 + 1
  if (entries.length === 2 && (entries[0][1] === 3 || entries[1][1] === 3)) {
    const dominant = entries.find(([_, count]) => count === 3)[0];
    const intruder = entries.find(([_, count]) => count === 1)[0];

    const pairKey = `${dominant}_${intruder}`;
    const templates = {
      happy_sad: ["Bittersweet Box", "Joy Poked"],
      calm_weird: ["Zen Disrupted", "Tranquil-ish"],
      angry_tired: ["Spent Fury", "Exhausted Rage"],
      dreamy_conflicted: ["Dream Doubt", "Mixed Visions"],
      default: [
        `Mostly ${moodLabels[dominant]}`,
        `4x ${moodLabels[dominant]}`,
        `Leaning ${moodLabels[dominant]}`
      ]
    };

    const options =
      templates[pairKey] ||
      templates[`${intruder}_${dominant}`] ||
      templates.default;

    return options[Math.floor(Math.random() * options.length)];
  }

  // 🎯 2 + 2
  if (entries.length === 2) {
    const [m1, m2] = entries.map(([m]) => m);
    const combos = [
      `${moodLabels[m1]} & ${moodLabels[m2]}`,
      `Two-Tone Box`,
      `Mood Split`,
      `50/50 Glaze`
    ];
    return combos[Math.floor(Math.random() * combos.length)];
  }

  // 🎯 2 + 1 + 1
  if (entries.length === 3) {
    const dominant = entries.find(([_, count]) => count === 2)[0];
    const anchorOptions = [
      `Mood Anchor: ${moodLabels[dominant]}`,
      `${moodLabels[dominant]} Core`,
      `Anchored in ${moodLabels[dominant]}`
    ];
    return anchorOptions[Math.floor(Math.random() * anchorOptions.length)];
  }

  // 🎯 4 unique
if (entries.length === 4) {
  const moodSets = {
    happy: ["Joy Overflow", "Box of Cheer", "Bursting with Joy"],
    calm: ["Zen Set", "Still & Sweet", "Peaceful Quartet"],
    angry: ["Rage Rising", "Tempest in a Box", "Spicy Medley"],
    weird: ["Quirky Quartet", "Weird & Wonderful", "Unusual Mix"]
  };

  for (const mood in moodSets) {
    if (moods.includes(mood)) {
      const options = moodSets[mood];
      return options[Math.floor(Math.random() * options.length)];
    }
  }

  const fallbackOptions = ["Mood Mélange", "Vibe Sampler", "Tetra Mood Box", "Moodpot", "Box of Many Feelings"];
  return fallbackOptions[Math.floor(Math.random() * fallbackOptions.length)];
}

  return "Mood Quartet";
}

///5 donuts!

if (donuts.length === 5) {
  const moods = donuts.map(d => extractMood(d));
  const counts = moods.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});
  const uniqueMoods = [...new Set(moods)].sort();
  const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const topCount = counts[topMood];

    const hasAll = arr => arr.every(m => moods.includes(m));
    const includesAny = arr => arr.some(m => moods.includes(m));

    const soft = ['tired', 'dreamy', 'calm', 'neutral', 'mystery'];
    const sharp = ['angry', 'stressed', 'sad', 'conflicted', 'surprise'];

    // 🔥 Dominant
    
// 🎯 When donuts.length === 5 && topCount === 5 — 5 of the same mood, no intruder yet

if (topCount === 5 && topMood === 'dreamy') {
  const dreamyOptions = [
    "Dream Cloud",
    "Almost Asleep",
    "Floating on Frosting"
  ];
  return dreamyOptions[Math.floor(Math.random() * dreamyOptions.length)];
}

if (topCount === 5 && topMood === 'calm') {
  const calmOptions = [
    "Zen Glaze",
    "Quiet Before the Sixth",
    "Peace in Progress"
  ];
  return calmOptions[Math.floor(Math.random() * calmOptions.length)];
}

if (topCount === 5 && topMood === 'stressed') {
  const stressedOptions = [
    "Meltdown Mix",
    "Pre-Meltdown Pack",
    "Stress Rising"
  ];
  return stressedOptions[Math.floor(Math.random() * stressedOptions.length)];
}

if (topCount === 5 && topMood === 'tired') {
  const tiredOptions = [
    "Total Shutdown",
    "Low Battery Mode",
    "Sleepy Spiral"
  ];
  return tiredOptions[Math.floor(Math.random() * tiredOptions.length)];
}

if (topCount === 5 && topMood === 'sad') {
  const sadOptions = [
    "Full-On Funk",
    "Damp Dozen (Minus One)",
    "Five Shades of Blue"
  ];
  return sadOptions[Math.floor(Math.random() * sadOptions.length)];
}

if (topCount === 5 && topMood === 'neutral') {
  const neutralOptions = [
    "Neutral Overload",
    "Fine, Almost",
    "Middle Mood Mass"
  ];
  return neutralOptions[Math.floor(Math.random() * neutralOptions.length)];
}

if (topCount === 5 && topMood === 'weird') {
  const weirdOptions = [
    "Weird Parade",
    "One Mood Short of Strange",
    "Almost Unhinged"
  ];
  return weirdOptions[Math.floor(Math.random() * weirdOptions.length)];
}

if (topCount === 5 && topMood === 'angry') {
  const angryOptions = [
    "Rage Pack",
    "Just Warming Up",
    "Five Furies"
  ];
  return angryOptions[Math.floor(Math.random() * angryOptions.length)];
}

if (topCount === 5 && topMood === 'conflicted') {
  const conflictedOptions = [
    "Circling the Glaze",
    "Five-Way Tug-of-War",
    "Glazed Over"
  ];
  return conflictedOptions[Math.floor(Math.random() * conflictedOptions.length)];
}

if (topCount === 5 && topMood === 'surprise') {
  const surpriseOptions = [
    "Shock Pack (Pending)",
    "Pre-Twist Set",
    "Almost Unexpected"
  ];
  return surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)];
}

if (topCount === 5 && topMood === 'happy') {
  const happyOptions = [
    "Joy Rising",
    "Almost Euphoric",
    "Cheerstorm Incoming"
  ];
  return happyOptions[Math.floor(Math.random() * happyOptions.length)];
}


// 🎯 4+1
if (topCount === 4) {
  const intruder = moods.find(m => m !== topMood);
  if (!intruder) return `Mostly ${moodLabels[topMood]}`;

  const key = `${topMood}_${intruder}`;
  const reverseKey = `${intruder}_${topMood}`;

  const templates = {
    calm_angry: ["Zen Interrupted", "Tranquility Shaken", "Storm in the Calm"],
    calm_conflicted: ["Wavering Peace", "Serene but Struggling", "Calm with a Catch"],
    calm_surprise: ["Chill Shock", "Calm Surprise", "Unexpected Breeze"],
    calm_weird: ["Still Waters Run Odd", "Chill & Strange", "The Glazed Unknown"],

    happy_sad: ["Bittersweet Box", "Sunshine & Rain", "Smile Through the Tears"],
    happy_conflicted: ["Jubilant Jumble", "Happiness... Mostly", "Mostly Sweet"],
    happy_weird: ["Delightfully Strange", "Joy with a Twist", "Sprinkles of Strange"],
    happy_angry: ["Sweet & Spicy", "Smiles Disrupted", "Mood Clash: Joy vs. Rage"],

    angry_calm: ["Rage Contained", "Smoldering Edge", "Anger in Restraint"],
    angry_tired: ["Burnt Out Box", "Anger Fatigue", "Running on Fumes"],
    angry_weird: ["Unstable Glaze", "Rage & Random", "Anger Spiral"],

    tired_surprise: ["Sleepy Startle", "Tired Surprise", "Nap Interrupted"],
    stressed_dreamy: ["Glazed Daydreams", "Stress Mirage", "Tension in a Dream"],
    sad_conflicted: ["Mopey & Mixed", "Blue Confusion", "Tears & Turmoil"]
  };

  const dominantMoodTemplates = {
    calm: ["Mostly Mellow", "Four Calm Layers", "Serenity with a Twist"],
    happy: ["Bittersweet Edge", "Joy Interrupted", "Mostly Cheerful"],
    sad: ["Melancholy Medley", "Blue But Not Alone", "Sadcore Deluxe"],
    angry: ["Rage Interrupted", "Mostly Mad", "Anger with a Side Glaze"],
    tired: ["Running on Glaze", "Mostly Asleep", "Tired but Not Alone"],
    dreamy: ["Sleepy Spiral", "Dream With Disruption", "Waking Up Slowly"],
    stressed: ["Tension Stack", "Stress Mix", "Under Pressure, Mostly"],
    conflicted: ["Mostly Confused", "Inner Conflict Box", "Mixed But Heavy"],
    neutral: ["Fine, Mostly", "Neutral Majority", "Undecided Box"],
    surprise: ["Mostly Expected", "Calm Before Surprise", "Mostly Predictable"],
    weird: ["Unusual Majority", "Mostly Offbeat", "Mostly Strange"]
  };

  const options =
    templates[key] ||
    templates[reverseKey] ||
    dominantMoodTemplates[topMood] ||
    [`Mostly ${moodLabels[topMood]}`, `Four Parts ${moodLabels[topMood]}`, `Dominant ${moodLabels[topMood]}`];

  return options[Math.floor(Math.random() * options.length)];
}



    // ⚖️ Balanced
    if (uniqueMoods.length === 5) return 'Mood Mosaic';
    if (hasAll(soft)) return 'Soft Glaze';
    if (hasAll(sharp)) return 'Sharp Edges';
    if (includesAny(['weird', 'mystery', 'surprise']) && topCount <= 2) return 'Weird Sampler';
    if (hasAll(['happy', 'sad', 'angry', 'calm', 'conflicted'])) return 'Donut Bipolar';
    if (includesAny(['conflicted', 'sad']) && includesAny(['happy', 'surprise'])) return 'Duality Box';

    // 😵 Emotional Tensions
    if (topCount === 2) return 'Emotional Juggle';
    if (counts.happy === 3 && counts.sad === 2) return 'Mood Tug-of-War';
    if (hasAll(['calm', 'conflicted', 'angry', 'dreamy', 'sad'])) return 'Head vs Heart';
    if (hasAll(['conflicted', 'tired', 'stressed', 'dreamy', 'mystery'])) return 'Mental Spiral';
    if (hasAll(['stressed', 'surprise', 'tired', 'angry', 'sad'])) return 'Surprise Burnout';
    if (counts.neutral === 3 && counts.mystery === 2) return 'Flatline Inside';
    if (includesAny(['calm', 'stressed', 'tired', 'dreamy', 'angry'])) return 'Cracked Shell';
    if (counts.happy === 3 && counts.sad === 2) return 'Cheerful Denial';

    // 🎩 Thematic
    if (hasAll(['dreamy', 'tired', 'calm', 'mystery', 'neutral'])) return 'The Introvert Set';
    if (hasAll(['happy', 'surprise', 'angry', 'stressed', 'weird'])) return 'The Extrovert Set';
    if (hasAll(['mystery', 'conflicted', 'sad', 'calm', 'dreamy'])) return 'Existential Breakfast';
    if (hasAll(['angry', 'sad', 'stressed', 'conflicted', 'surprise'])) return 'Drama Box';
    if (hasAll(['happy', 'sad', 'tired', 'conflicted', 'weird'])) return 'Midlife Crisis';
    if (hasAll(['stressed', 'tired', 'angry', 'sad', 'dreamy'])) return 'Manic Monday';
    if (hasAll(['calm', 'dreamy', 'tired', 'happy', 'neutral'])) return 'Sunday Vibes';

    // 😱 Creative
    if (hasAll(['calm', 'conflicted', 'tired', 'sad', 'mystery'])) return 'Quiet Chaos';
    if (hasAll(['happy', 'angry', 'stressed', 'dreamy', 'weird'])) return 'Joyfully Broken';
    if (hasAll(['sad', 'dreamy', 'stressed', 'angry', 'mystery'])) return 'Emotional Eclipse';
    if (topCount === 4) return 'The Wild Card';
    if (uniqueMoods.length === 5 && includesAny(['mystery', 'weird', 'conflicted'])) return 'Unicorn Box';
    if (hasAll(['dreamy', 'conflicted', 'sad', 'tired', 'stressed'])) return 'Donut Spiral';
    if (hasAll(['surprise', 'angry', 'happy', 'weird', 'sad'])) return 'Mood Bomb';
    if (hasAll(['neutral', 'mystery', 'conflicted', 'dreamy', 'calm'])) return 'Liminal Glaze';
    if (hasAll(['conflicted', 'happy', 'sad', 'calm', 'angry'])) return 'Mixed Signals';
    if (hasAll(['happy', 'angry', 'stressed', 'surprise', 'weird'])) return 'Sensory Overload';
    if (topCount === 2 && Object.values(counts).filter(c => c === 2).length === 2) return 'Almost Balanced';

    return `Five-Flavored Pack`;
  }

  if (donuts.length === 6) {
    const moods = donuts.map(d => extractMood(d));
    const counts = moods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});
    const uniqueMoods = [...new Set(moods)];
    const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    const topCount = counts[topMood];

    const hasAll = arr => arr.every(m => moods.includes(m));
    const includesAny = arr => arr.some(m => moods.includes(m));

    const soft = ['tired', 'dreamy', 'calm', 'neutral', 'mystery'];
    const sharp = ['angry', 'stressed', 'sad', 'conflicted', 'surprise'];

    // 🔥 Overloads
    
const moodTitleOptions = {
  happy: ["Sugar Rush!", "Glazed in Glory", "Full of Giggles"],
  calm: ["Total Zen", "Serenity Stack", "Meditation Box"],
  sad: ["Full-On Funk", "Sad Stack", "Rainy Glaze Day"],
  neutral: ["Plain and Proud", "The Okayest Box", "Neutral Ground"],
  conflicted: ["Whirl of Worry", "Split Decision", "Internal Debate"],
  dreamy: ["Dream Cloud", "Glaze Drift", "Midair Moods"],
  stressed: ["Meltdown Mix", "Stressball Stack", "Overbaked Emotions"],
  surprise: ["Plot Twist!", "Unexpected Glaze", "Oops All Surprise"],
  angry: ["Rage Pack", "Red Hot Dozen", "Spice Storm"],
  tired: ["Shutdown Stack", "Glazed & Dazed", "The Sleepy Six"],
  mystery: ["Sweet Mystery", "Unknown Batch", "Encrypted Emotions"],
  weird: ["Weird Parade", "Glaze Lab Experiment", "The Odd Batch"]
};

if (topCount === 6) {
  const titles = moodTitleOptions[topMood] || [`Six-Pack of ${moodLabels[topMood]}`];
  return titles[Math.floor(Math.random() * titles.length)];
}


if (topCount === 5) {
  const entries = Object.entries(counts);
  const dominantMood = entries.find(([_, count]) => count === 5)?.[0];
  const intruderMood = entries.find(([_, count]) => count === 1)?.[0];

  const fiveOneShortTemplates = [
    (d, i) => `Mostly ${d}, But ${i}`,
    (d, i) => `${i} in a Box of ${d}`,
    (d, i) => `${d} With a Twist of ${i}`,
    (d, i) => `${i} Broke the ${d} Mood`,
    (d, i) => `${d}, Except That One ${i}`,
    (d, i) => `All ${d}, Till ${i}`,
    (d, i) => `${i} Poked the ${d} Mood`,
    (d, i) => `${d} x5, Then ${i}`,
    (d, i) => `1 ${i}, 5 ${d}`,
    (d, i) => `${d} Mood, ${i} Leak`,
    (d, i) => `Broken ${d} by ${i}`,
  ];

  if (dominantMood && intruderMood && dominantMood !== intruderMood) {
    const template = fiveOneShortTemplates[Math.floor(Math.random() * fiveOneShortTemplates.length)];
    return template(moodLabels[dominantMood], moodLabels[intruderMood]);
  }

  // Fallback: all 6 the same or unreadable
  return `${moodLabels[dominantMood] || "Max Mood"} Overload`;
}


    // 🌈 Variety
if (uniqueMoods.length === 6) {
  const rainbowOptions = [
    "Rainbow Assortment",
    "Full Spectrum Box",
    "Moodburst Sampler",
    "Emotional Technicolor",
    "Feeling the Rainbow",
    "All the Feels",
    "Flavor Prism",
    "Donut Disco",
    "The Everything Set",
    "Colorwheel of Cravings"
  ];
  return rainbowOptions[Math.floor(Math.random() * rainbowOptions.length)];
}


if (uniqueMoods.length >= 5 && includesAny(["weird", "mystery", "surprise"])) {
  const carouselOptions = [
    "Mood Carousel",
    "Rollercoaster of Feels",
    "Emotional Tilt-a-Whirl",
    "Surprise Spin",
    "Whimsy Wheel",
    "The Unexpected Ride",
    "Mystery Munchies",
    "Flavor Ferris Wheel",
    "Funhouse Glaze",
    "Tornado of Toppings"
  ];
  return carouselOptions[Math.floor(Math.random() * carouselOptions.length)];
}

if (uniqueMoods.length >= 4 && includesAny(["happy", "sad", "angry", "dreamy", "calm"])) {
  const spectrumOptions = [
    "Spectrum Sampler",
    "Mood Gradient Box",
    "Taste the Moodbow",
    "Full Flavor Range",
    "Emotional Palette",
    "Feelings from A to Glaze",
    "Chromatic Cravings",
    "Donut of Many Colors",
    "Soul Sampler Pack",
    "The Feeling Lineup"
  ];
  return spectrumOptions[Math.floor(Math.random() * spectrumOptions.length)];
}


    // 💢 Conflicts
if (counts.happy === 3 && counts.sad === 3) {
  const conflictOptions = [
    "Mood Wars: Sweet v. Sour",
    "Battle of the Feels",
    "Sugar vs. Sadness",
    "Joy vs. the Void",
    "A Tale of Two Moods",
    "Emotional Civil War",
    "Split Glaze Decision",
    "Smiles v. Sobs",
    "Bitter Glaze Showdown",
    "Happiness in Rebellion"
  ];
  return conflictOptions[Math.floor(Math.random() * conflictOptions.length)];
}

if (includesAny(["calm", "dreamy"]) && includesAny(["angry", "stressed"])) {
  const hotCold = [
    "Frosting vs Fire",
    "Serenity Smackdown",
    "Chill Meets Chaos",
    "Peace vs. Pressure",
    "Glazed But Furious"
  ];
  return hotCold[Math.floor(Math.random() * hotCold.length)];
}

if (includesAny(["conflicted", "sad", "dreamy", "stressed", "happy"])) {
  const complexEmotionBlend = [
    "Bittersweet Spiral",
    "Melancholy Mashup",
    "Happy on the Outside",
    "Emotional Glazestorm",
    "Mixed Mood Mosaic",
    "Grin Through the Glaze"
  ];
  return complexEmotionBlend[Math.floor(Math.random() * complexEmotionBlend.length)];
}

if (includesAny(["conflicted", "angry", "tired", "stressed", "sad"])) {
  const turmoilOptions = [
    "Inner Turmoil Box",
    "Emotionally Glazed",
    "Overbaked Feelings",
    "Stuffed and Stressed",
    "Mind Melt Sampler",
    "Cracks in the Frosting"
  ];
  return turmoilOptions[Math.floor(Math.random() * turmoilOptions.length)];
}

// ✨ Fun Closers (Revised: removed "mystery")
if (hasAll(["dreamy", "calm", "tired", "neutral", "sad"])) return "Still Waters Box";
if (includesAny(["surprise", "angry", "weird", "happy"])) return "Chaos & Cream";
if (includesAny(["weird", "surprise", "angry", "sad"])) return "Donut Apocalypse";
if (hasAll(["calm", "dreamy", "tired", "happy", "neutral"])) return "Zenfinity";
if (hasAll(["happy", "surprise", "angry", "weird", "sad", "conflicted"])) return "Moodplosion";


    return "Mixed Mood Medley";
  }

  return "Donut Surprise";
}

