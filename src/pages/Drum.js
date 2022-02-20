import { useCallback, useEffect, useState } from "react";

const drumKeys = [
  {
    text: "Q",
  },
  {
    text: "W",
  },
  {
    text: "E",
  },
  {
    text: "A",
  },
  {
    text: "S",
  },
  {
    text: "D",
  },
  {
    text: "Z",
  },
  {
    text: "X",
  },
  {
    text: "C",
  },
];
function unfocus(element) {
  element.blur();
}
function Drum() {
  const [audioString, setAudioString] = useState("");
  const handleClick = async (e) => {
    e.target.focus();
    let audioElement = e.target.children[0];
    audioElement.currentTime = 0;
    setAudioString(audioElement.getAttribute("src").split(".mp3")[0]);
    setTimeout(unfocus, 300, e.target);

    audioElement.play();
  };
  const handleVolume = useCallback((e) => {
    const currentVolume = e.target.value;
    document.getElementsByTagName("audio").forEach((element) => {
      element.volume = parseFloat(parseFloat(currentVolume) / 100);
    });
  }, []);
  const handlePress = useCallback((e) => {
    const key = e.key.toUpperCase();
    let audioElement = document.getElementById(key);
    audioElement.parentNode.focus();
    setTimeout(unfocus, 300, audioElement.parentNode);
    console.log(audioElement.parentNode);
    audioElement.currentTime = 0;
    setAudioString(audioElement.getAttribute("src").split(".mp3")[0]);
    audioElement.play();
  }, []);
  useEffect(() => {
    window.addEventListener("keypress", handlePress);
  }, [handlePress]);
  return (
    <section id="drum-machine">
      <div className="flex--row flex--center">
        <label>Volume&nbsp;</label>
        <input type="range" min="0" max="100" onChange={handleVolume} />
      </div>

      <div id="display">
        {drumKeys.map((key, index) => (
          <button
            onClick={handleClick}
            key={key.text}
            className="drum-pad"
            id={`drum-key-${key.text}`}
          >
            {key.text}
            <audio
              className="clip"
              id={key.text}
              src={`/drum-${index + 1}.mp3`}
            ></audio>
          </button>
        ))}
        {audioString}
      </div>
    </section>
  );
}

export default Drum;
