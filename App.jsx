import { useState, useEffect } from "react";

const SPECTRUM = [
  { value: 1, label: "Very Low", emoji: "🌧️", color: "#6B7280", desc: "Really struggling today" },
  { value: 2, label: "Low", emoji: "☁️", color: "#9CA3AF", desc: "Hard to feel okay in my body" },
  { value: 3, label: "Low Gratitude", emoji: "🌥️", color: "#A78BFA", desc: "Finding it difficult to appreciate my body" },
  { value: 4, label: "Neutral", emoji: "⛅", color: "#60A5FA", desc: "Not great, not terrible" },
  { value: 5, label: "Some Gratitude", emoji: "🌤️", color: "#34D399", desc: "Starting to find small things to appreciate" },
  { value: 6, label: "Good", emoji: "☀️", color: "#FBBF24", desc: "Feeling fairly at ease today" },
  { value: 7, label: "Grateful", emoji: "🌟", color: "#F97316", desc: "Genuinely thankful for my body today" },
];

const GROUNDING = [
  {
    title: "5–4–3–2–1 Anchor",
    icon: "🌿",
    steps: [
      "Notice 5 things you can see around you right now",
      "Notice 4 things you can physically feel (feet on floor, fabric on skin...)",
      "Notice 3 things you can hear",
      "Notice 2 things you can smell or like the smell of",
      "Notice 1 thing you can taste",
    ],
    note: "You just brought yourself back to the present moment. The thought was just a thought — not a fact.",
  },
  {
    title: "Box Breathing",
    icon: "🫁",
    steps: [
      "Breathe IN slowly for 4 counts",
      "HOLD for 4 counts",
      "Breathe OUT slowly for 4 counts",
      "HOLD for 4 counts",
      "Repeat 3–4 times",
    ],
    note: "This activates your rest response and interrupts the spiral at a physiological level.",
  },
  {
    title: "The Name It Practice",
    icon: "🏷️",
    steps: [
      "Say (or think): \"I notice I'm having the thought that...\"",
      "Name the thought out loud or in your head — don't fight it",
      "Then say: \"Thanks, mind. I see you. I don't have to act on this.\"",
      "Take one slow breath",
      "Return to what you were doing",
    ],
    note: "Naming a thought creates distance from it. You are not your thoughts.",
  },
];

const FUNCTIONAL_GRATITUDE = [
  "What did your body help you do today — even something small?",
  "What is one thing your body does automatically, without you asking?",
  "Think of a moment your body felt useful or capable this week.",
  "What does your body allow you to experience? (A hug, music, taste, warmth...)",
  "Your heart has beaten roughly 100,000 times today. Can you place a hand there and feel it?",
  "What would you say to a friend whose body looked exactly like yours?",
  "What is your body protecting you with right now — even if it doesn't feel like it?",
];

const DEFUSION_AFFIRMATIONS = [
  { phrase: "My body is not a problem to be solved.", type: "neutral" },
  { phrase: "I am having a hard body image moment. This will pass.", type: "neutral" },
  { phrase: "This thought is just a visitor. It doesn't live here.", type: "defusion" },
  { phrase: "My worth is not stored in my appearance.", type: "worth" },
  { phrase: "Bodies are allowed to just exist.", type: "neutral" },
  { phrase: "The spiral is lying to me right now.", type: "defusion" },
  { phrase: "I can feel uncomfortable in my body and still take care of it.", type: "care" },
  { phrase: "I don't have to believe every thought I have about myself.", type: "defusion" },
];

const TRIGGER_OPTIONS = [
  "Mirror / getting dressed", "Social media", "Comparison to others",
  "Comment from someone", "Feeling tired or unwell", "Eating / after a meal",
  "Photo of myself", "Just woke up", "Feeling stressed", "Other",
];

function SpectrumSelector({ value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {SPECTRUM.map((s) => (
        <button
          key={s.value}
          onClick={() => onChange(s)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 16px",
            borderRadius: "12px",
            border: value?.value === s.value ? `2px solid ${s.color}` : "2px solid transparent",
            background: value?.value === s.value ? `${s.color}18` : "#F9F7F4",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s",
          }}
        >
          <span style={{ fontSize: "24px" }}>{s.emoji}</span>
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 600, color: "#2D2320", fontSize: "14px" }}>{s.label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#7C6F6A", fontSize: "12px" }}>{s.desc}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

function GroundingCard({ exercise }) {
  const [step, setStep] = useState(0);
  const done = step >= exercise.steps.length;

  return (
    <div style={{ background: "#F0EDE8", borderRadius: "16px", padding: "20px" }}>
      <div style={{ fontFamily: "'Lora', serif", fontSize: "18px", fontWeight: 600, color: "#2D2320", marginBottom: "16px" }}>
        {exercise.icon} {exercise.title}
      </div>
      {!done ? (
        <>
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "16px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "15px",
            color: "#2D2320",
            marginBottom: "12px",
            minHeight: "60px",
            lineHeight: 1.6,
          }}>
            <span style={{ color: "#A78BFA", fontWeight: 600, marginRight: "6px" }}>{step + 1}.</span>
            {exercise.steps[step]}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} style={{
                padding: "10px 16px", borderRadius: "10px", border: "1px solid #D4C5BE",
                background: "transparent", fontFamily: "'DM Sans', sans-serif", cursor: "pointer", color: "#7C6F6A",
              }}>← Back</button>
            )}
            <button onClick={() => setStep(s => s + 1)} style={{
              flex: 1, padding: "10px 16px", borderRadius: "10px", border: "none",
              background: "#A78BFA", color: "#fff", fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600, cursor: "pointer", fontSize: "14px",
            }}>
              {step === exercise.steps.length - 1 ? "Done ✓" : "Next →"}
            </button>
          </div>
        </>
      ) : (
        <div style={{
          background: "#fff", borderRadius: "12px", padding: "16px",
          fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#5C4F4A",
          lineHeight: 1.6, fontStyle: "italic",
        }}>
          💜 {exercise.note}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("welcome");
  const [spectrumValue, setSpectrumValue] = useState(null);
  const [selectedTrigger, setSelectedTrigger] = useState(null);
  const [groundingIndex, setGroundingIndex] = useState(0);
  const [gratitudeIndex, setGratitudeIndex] = useState(0);
  const [affirmIndex, setAffirmIndex] = useState(0);
  const [logEntries, setLogEntries] = useState([]);
  const [activeTab, setActiveTab] = useState("ground");
  const [showLog, setShowLog] = useState(false);

  useEffect(() => {
    setGroundingIndex(Math.floor(Math.random() * GROUNDING.length));
    setGratitudeIndex(Math.floor(Math.random() * FUNCTIONAL_GRATITUDE.length));
    setAffirmIndex(Math.floor(Math.random() * DEFUSION_AFFIRMATIONS.length));
  }, []);

  const handleSpectrumContinue = () => {
    if (spectrumValue) setPhase("support");
  };

  const handleLog = () => {
    const entry = {
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      spectrum: spectrumValue?.label,
      trigger: selectedTrigger || "Not noted",
    };
    setLogEntries(prev => [entry, ...prev]);
    setPhase("done");
  };

  const reset = () => {
    setPhase("welcome");
    setSpectrumValue(null);
    setSelectedTrigger(null);
    setGroundingIndex(Math.floor(Math.random() * GROUNDING.length));
    setGratitudeIndex(Math.floor(Math.random() * FUNCTIONAL_GRATITUDE.length));
    setAffirmIndex(Math.floor(Math.random() * DEFUSION_AFFIRMATIONS.length));
  };

  const isLow = spectrumValue && spectrumValue.value <= 3;

  const cardStyle = {
    maxWidth: "420px",
    margin: "0 auto",
    padding: "24px",
    fontFamily: "'DM Sans', sans-serif",
  };

  const headingStyle = {
    fontFamily: "'Lora', serif",
    color: "#2D2320",
    lineHeight: 1.3,
  };

  const btnPrimary = {
    width: "100%", padding: "14px", borderRadius: "12px", border: "none",
    background: "#A78BFA", color: "#fff", fontFamily: "'DM Sans', sans-serif",
    fontWeight: 700, fontSize: "15px", cursor: "pointer", marginTop: "16px",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FAF8F5; min-height: 100vh; }
        .tab-btn { padding: 8px 14px; border-radius: 8px; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; transition: all 0.2s; }
        .tab-active { background: #A78BFA; color: #fff; }
        .tab-inactive { background: #EDE8E3; color: #7C6F6A; }
      `}</style>

      <div style={{ background: "#FAF8F5", minHeight: "100vh", paddingBottom: "40px" }}>

        <div style={{
          background: "#fff", padding: "16px 24px", display: "flex",
          alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid #EDE8E3", position: "sticky", top: 0, zIndex: 10,
        }}>
          <div>
            <div style={{ fontFamily: "'Lora', serif", fontWeight: 700, color: "#2D2320", fontSize: "16px" }}>
              🌿 Body Image Companion
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", color: "#A78BFA", fontSize: "11px", marginTop: "2px" }}>
              You noticed. That takes courage.
            </div>
          </div>
          {logEntries.length > 0 && (
            <button onClick={() => setShowLog(!showLog)} style={{
              padding: "6px 12px", borderRadius: "8px", border: "1px solid #D4C5BE",
              background: "transparent", fontFamily: "'DM Sans', sans-serif",
              fontSize: "12px", color: "#7C6F6A", cursor: "pointer",
            }}>
              {showLog ? "← Back" : `Log (${logEntries.length})`}
            </button>
          )}
        </div>

        {showLog && (
          <div style={cardStyle}>
            <h2 style={{ ...headingStyle, fontSize: "20px", marginBottom: "16px", marginTop: "16px" }}>Your Check-ins</h2>
            <p style={{ color: "#7C6F6A", fontSize: "13px", marginBottom: "16px", lineHeight: 1.5 }}>
              These patterns can help you and your practitioner notice what's happening over time.
            </p>
            {logEntries.map((e, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: "12px", padding: "14px 16px",
                marginBottom: "10px", border: "1px solid #EDE8E3",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "'Lora', serif", fontWeight: 600, fontSize: "14px", color: "#2D2320" }}>{e.spectrum}</span>
                  <span style={{ color: "#9CA3AF", fontSize: "12px" }}>{e.date} · {e.time}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#7C6F6A" }}>Trigger: {e.trigger}</div>
              </div>
            ))}
          </div>
        )}

        {!showLog && phase === "welcome" && (
          <div style={cardStyle}>
            <div style={{ textAlign: "center", paddingTop: "32px", paddingBottom: "24px" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🌿</div>
              <h1 style={{ ...headingStyle, fontSize: "26px", marginBottom: "12px" }}>
                You caught the spiral.
              </h1>
              <p style={{ color: "#7C6F6A", fontSize: "15px", lineHeight: 1.7 }}>
                That ping on your wrist was you choosing to pause. Let's take a few gentle moments together.
              </p>
            </div>
            <div style={{ background: "#F0EDE8", borderRadius: "16px", padding: "18px", marginBottom: "8px" }}>
              <p style={{ fontFamily: "'Lora', serif", color: "#5C4F4A", fontSize: "14px", lineHeight: 1.7, fontStyle: "italic" }}>
                "You don't have to feel good about your body right now. You just have to stay with yourself."
              </p>
            </div>
            <button onClick={() => setPhase("spectrum")} style={btnPrimary}>
              I'm ready →
            </button>
          </div>
        )}

        {!showLog && phase === "spectrum" && (
          <div style={cardStyle}>
            <div style={{ marginTop: "24px", marginBottom: "20px" }}>
              <h2 style={{ ...headingStyle, fontSize: "20px", marginBottom: "8px" }}>
                Where are you right now?
              </h2>
              <p style={{ color: "#7C6F6A", fontSize: "14px", lineHeight: 1.6 }}>
                Check in on your body image spectrum — no judgement, just noticing.
              </p>
            </div>
            <SpectrumSelector value={spectrumValue} onChange={setSpectrumValue} />
            <button
              onClick={handleSpectrumContinue}
              disabled={!spectrumValue}
              style={{ ...btnPrimary, opacity: spectrumValue ? 1 : 0.4 }}
            >
              Continue →
            </button>
          </div>
        )}

        {!showLog && phase === "support" && (
          <div style={cardStyle}>
            <div style={{ marginTop: "24px", marginBottom: "16px" }}>
              {isLow ? (
                <>
                  <h2 style={{ ...headingStyle, fontSize: "20px", marginBottom: "8px" }}>
                    You're in a hard place. That's okay.
                  </h2>
                  <p style={{ color: "#7C6F6A", fontSize: "14px", lineHeight: 1.6 }}>
                    When body image feels really low, we start with your body — not your thoughts. Let's get you grounded first.
                  </p>
                </>
              ) : (
                <>
                  <h2 style={{ ...headingStyle, fontSize: "20px", marginBottom: "8px" }}>
                    Let's work with what's here.
                  </h2>
                  <p style={{ color: "#7C6F6A", fontSize: "14px", lineHeight: 1.6 }}>
                    There's room to gently shift your focus. Choose what feels right today.
                  </p>
                </>
              )}
            </div>

            <div style={{ display: "flex", gap: "6px", marginBottom: "16px", flexWrap: "wrap" }}>
              {["ground", "gratitude", "thought"].map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "tab-active" : "tab-inactive"}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "ground" ? "🌿 Ground me" : tab === "gratitude" ? "💛 Body gratitude" : "🏷️ Name the thought"}
                </button>
              ))}
            </div>

            {activeTab === "ground" && (
              <div>
                <GroundingCard exercise={GROUNDING[groundingIndex]} />
                <button onClick={() => setGroundingIndex(i => (i + 1) % GROUNDING.length)} style={{
                  marginTop: "10px", background: "transparent", border: "none",
                  color: "#A78BFA", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px", cursor: "pointer", padding: "4px 0",
                }}>
                  Try a different exercise →
                </button>
              </div>
            )}

            {activeTab === "gratitude" && (
              <div>
                <div style={{
                  background: "#FFFBEB", borderRadius: "16px", padding: "20px",
                  border: "1px solid #FDE68A",
                }}>
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>💛</div>
                  <p style={{
                    fontFamily: "'Lora', serif", fontSize: "16px", color: "#2D2320",
                    lineHeight: 1.7, fontWeight: 500, marginBottom: "16px",
                  }}>
                    {FUNCTIONAL_GRATITUDE[gratitudeIndex]}
                  </p>
                  <p style={{ fontSize: "13px", color: "#92400E", lineHeight: 1.5 }}>
                    Take a moment to sit with this. You don't need a perfect answer — even a small one counts.
                  </p>
                </div>
                <button onClick={() => setGratitudeIndex(i => (i + 1) % FUNCTIONAL_GRATITUDE.length)} style={{
                  marginTop: "10px", background: "transparent", border: "none",
                  color: "#A78BFA", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px", cursor: "pointer", padding: "4px 0",
                }}>
                  Give me another prompt →
                </button>
              </div>
            )}

            {activeTab === "thought" && (
              <div>
                <div style={{
                  background: "#F5F3FF", borderRadius: "16px", padding: "20px",
                  border: "1px solid #DDD6FE",
                }}>
                  <p style={{ fontSize: "12px", color: "#7C3AED", fontWeight: 600, marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Gentle reminder
                  </p>
                  <p style={{
                    fontFamily: "'Lora', serif", fontSize: "17px", color: "#2D2320",
                    lineHeight: 1.7, fontWeight: 500, marginBottom: "16px",
                  }}>
                    "{DEFUSION_AFFIRMATIONS[affirmIndex].phrase}"
                  </p>
                  <div style={{
                    background: "#fff", borderRadius: "10px", padding: "12px",
                    fontSize: "13px", color: "#5C4F4A", lineHeight: 1.6,
                  }}>
                    <strong>Try this:</strong> Repeat the thought that's bothering you, but add "I'm having the thought that..." before it. Notice what shifts.
                  </div>
                </div>
                <button onClick={() => setAffirmIndex(i => (i + 1) % DEFUSION_AFFIRMATIONS.length)} style={{
                  marginTop: "10px", background: "transparent", border: "none",
                  color: "#A78BFA", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px", cursor: "pointer", padding: "4px 0",
                }}>
                  Show me another →
                </button>
              </div>
            )}

            <button onClick={() => setPhase("log")} style={{ ...btnPrimary, marginTop: "24px" }}>
              Log this moment →
            </button>
          </div>
        )}

        {!showLog && phase === "log" && (
          <div style={cardStyle}>
            <div style={{ marginTop: "24px", marginBottom: "20px" }}>
              <h2 style={{ ...headingStyle, fontSize: "20px", marginBottom: "8px" }}>
                What triggered the spiral?
              </h2>
              <p style={{ color: "#7C6F6A", fontSize: "14px", lineHeight: 1.6 }}>
                Noticing triggers is powerful. This is just for you and your practitioner — no pressure to get it exactly right.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {TRIGGER_OPTIONS.map(t => (
                <button key={t} onClick={() => setSelectedTrigger(t)} style={{
                  padding: "8px 14px", borderRadius: "20px", fontSize: "13px",
                  fontFamily: "'DM Sans', sans-serif", cursor: "pointer",
                  border: selectedTrigger === t ? "2px solid #A78BFA" : "1px solid #D4C5BE",
                  background: selectedTrigger === t ? "#F5F3FF" : "#fff",
                  color: selectedTrigger === t ? "#7C3AED" : "#5C4F4A",
                  transition: "all 0.2s",
                }}>
                  {t}
                </button>
              ))}
            </div>
            <button onClick={handleLog} style={btnPrimary}>
              Save & finish
            </button>
            <button onClick={() => setPhase("done")} style={{
              ...btnPrimary, background: "transparent", color: "#9CA3AF",
              border: "1px solid #EDE8E3", marginTop: "8px",
            }}>
              Skip logging
            </button>
          </div>
        )}

        {!showLog && phase === "done" && (
          <div style={cardStyle}>
            <div style={{ textAlign: "center", paddingTop: "40px" }}>
              <div style={{ fontSize: "52px", marginBottom: "16px" }}>🌱</div>
              <h2 style={{ ...headingStyle, fontSize: "24px", marginBottom: "12px" }}>
                Well done for pausing.
              </h2>
              <p style={{ color: "#7C6F6A", fontSize: "15px", lineHeight: 1.7, marginBottom: "24px" }}>
                You interrupted the spiral. That's not small — that's exactly the work. Your brain is learning a new pattern every time you do this.
              </p>
              <div style={{
                background: "#F0EDE8", borderRadius: "16px", padding: "16px",
                marginBottom: "24px", textAlign: "left",
              }}>
                <p style={{ fontFamily: "'Lora', serif", color: "#5C4F4A", fontSize: "14px", lineHeight: 1.7, fontStyle: "italic" }}>
                  "Recovery isn't about loving your body every day. It's about choosing not to let the hardest thoughts make all the decisions."
                </p>
              </div>
              <button onClick={reset} style={btnPrimary}>
                Start again
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
