
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

  if (donuts.length === 2) {
    const moods = donuts.map(d => extractMood(d)).sort();
    const comboKey = moods.join("_");
    if (comboLabels[comboKey]) return comboLabels[comboKey];

const firstMood = extractMood(sorted[0][0]);
const secondMood = extractMood(sorted[1][0] || sorted[0][0]); // fallback in case only one type
if (uniqueCount === 1) return `Double ${moodLabels[firstMood]}`;
return `${moodLabels[firstMood]} & ${moodLabels[secondMood]}`;

  }

  if (donuts.length === 3) {
    const moods = donuts.map(d => extractMood(d)).sort();
    const uniqueMoods = [...new Set(moods)];

    if (uniqueMoods.length === 1) return `Triple ${moodLabels[uniqueMoods[0]]}`;
    if (moods.includes("conflicted")) return "Mixed Signals";
    if (moods.includes("weird") || moods.includes("surprise")) return "Odd Blend";
    if (moods.includes("happy") && moods.includes("sad") && moods.includes("angry")) return "Emotional Whiplash";
    if (moods.includes("calm") && moods.includes("dreamy") && moods.includes("tired")) return "Chill Vibes";

    const counts = moods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});
    const topMood = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    if (topMood[1] === 2) return `Mostly ${moodLabels[topMood[0]]}`;

    return "Mood Medley";
  }

  if (donuts.length === 4) {
    const moods = donuts.map(d => extractMood(d));
    const counts = moods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});
    const entries = Object.entries(counts);

    if (entries.length === 1) return `Quad ${moodLabels[entries[0][0]]}`;
    if (entries.length === 2 && (entries[0][1] === 3 || entries[1][1] === 3)) {
      const dominant = entries.find(([_, count]) => count === 3);
      return `Mostly ${moodLabels[dominant[0]]}`;
    }
    if (entries.length === 2 && entries[0][1] === 2 && entries[1][1] === 2) {
      return `Half & Half`;
    }
    if (entries.length === 3) {
      const dominant = entries.find(([_, count]) => count === 2);
      return `Mood Anchor: ${moodLabels[dominant[0]]}`;
    }
    if (entries.length === 4) {
      if (moods.includes("happy")) return "Joy Overflow";
      if (moods.includes("calm")) return "Zen Set";
      if (moods.includes("angry")) return "Rage Rising";
      if (moods.includes("weird")) return "Quirky Quartet";
      return "Full Mood Sampler";
    }
    return "Quad Mood Mix";
  }


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
    
    if (topCount === 5 && topMood === 'dreamy') return 'Dream Cloud';
    if (topCount === 5 && topMood === 'calm') return 'Zen Glaze';
    if (topCount === 5 && topMood === 'stressed') return 'Meltdown Mix';
    if (topCount === 5 && topMood === 'tired') return 'Total Shutdown';
    if (topCount === 5 && topMood === 'sad') return 'Full-On Funk';
    if (topCount === 5 && topMood === 'neutral') return 'Neutral Overload';
    if (topCount === 5 && topMood === 'weird') return 'Weird Parade';
    if (topCount === 5 && topMood === 'angry') return 'Rage Pack';
    if (topCount === 5 && topMood === 'mystery') return 'Sweet Mystery';

    // 🎯 4+1
    if (topCount === 4 && topMood === 'calm') return 'Mostly Mellow';
    if (topCount === 4 && moods.includes('angry')) return 'Rage Interrupted';
    if (topCount === 4 && moods.includes('stressed')) return 'Cracked Calm';
    if (topCount === 4 && moods.includes('angry')) return 'Spiked Joy';
    if (topCount === 4 && moods.includes('surprise')) return 'Tired Surprise';
    if (topCount === 4 && moods.includes('conflicted')) return 'Conflicted Core';
    if (topCount === 4 && moods.includes('happy')) return 'Bittersweet Edge';
    if (topCount === 4 && moods.includes('weird')) return 'Focused Chaos';

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


    if (uniqueMoods.length >= 5 && includesAny(["weird", "mystery", "surprise"])) return "Mood Carousel";
    if (uniqueMoods.length >= 4 && includesAny(["happy", "sad", "angry", "dreamy", "calm"])) return "Spectrum Sampler";

    // 💢 Conflicts
    if (counts.happy === 3 && counts.sad === 3) return "Mood Wars: Sweet v. Sour";
    if (includesAny(["calm", "dreamy"]) && includesAny(["angry", "stressed"])) return "Frosting vs Fire";
    if (includesAny(["conflicted", "sad", "dreamy", "stressed", "happy"])) return "Bittersweet Spiral";
    if (includesAny(["conflicted", "angry", "tired", "stressed", "mystery"])) return "Inner Turmoil Box";

    // ✨ Fun Closers
    if (hasAll(["dreamy", "calm", "tired", "neutral", "mystery", "sad"])) return "Still Waters Box";
    if (includesAny(["surprise", "angry", "weird", "happy"])) return "Chaos & Cream";
    if (includesAny(["mystery", "weird", "surprise", "angry", "sad"])) return "Donut Apocalypse";
    if (hasAll(["calm", "dreamy", "tired", "mystery", "happy", "neutral"])) return "Zenfinity";
    if (hasAll(["happy", "surprise", "angry", "weird", "sad", "conflicted"])) return "Moodplosion";

    return "Mixed Mood Medley";
  }

  return "Donut Surprise";
}

