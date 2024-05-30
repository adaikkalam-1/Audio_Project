import React, { useState, useEffect, useRef } from "react";
import "./audio.css"; // Ensure this CSS file contains the necessary styles
import { FaPlay, FaPause, FaDownload, FaVolumeUp } from "react-icons/fa";

const AudioPlayer = () => {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio.canPlayType("audio/mpeg;")) {
      audio.type = "audio/mpeg";
      audio.src =
        "https://cdn.pixabay.com/audio/2023/01/18/audio_43b48c0a90.mp3";
    } else {
      audio.type = "audio/ogg";
      audio.src =
        "https://faderlab.com/codepen-assets/audio-player/leftbehind.ogg";
    }

    audio.preload = "auto";

    audio.addEventListener("loadeddata", () => {
      if (audio.readyState >= 2) {
        setDuration(audio.duration);
      }
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.volume = volume; // Set initial volume

    return () => {
      audio.removeEventListener("loadeddata", () => {});
      audio.removeEventListener("timeupdate", () => {});
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume; // Update volume whenever it changes
  }, [volume]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const changeCurrentTime = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const changeVolume = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
  };

  const showTime = (s) => {
    const m = Math.floor(s / 60);
    s = Math.floor(s % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="container">
      <div className="audio-player">
        <div id="audio-player" className="audio-player-wrapper">
          <div className="audio-player-image" data-appear="fade-right">
            <div
              className="audio-image-box"
              style={{
                backgroundImage:
                  "url('https://data.whicdn.com/images/16602597/large.png')",
              }}
            ></div>
          </div>
          <div className="audio-player-controls">
            <div className="audio-top">
              <div className="audio-date" data-appear="fade-left">
                <span className="audio-day">07</span>
                <span className="audio-month">Aug</span>
              </div>

              <div
                className="audio-title"
                data-appear="fade-left"
                data-appear-delay="75"
              >
                <h3>
                  <span>Rameses B</span>
                  <span className="audio-title">Left Behind</span>
                </h3>
              </div>
            </div>
            <div className="audio-player-progress" data-appear="fade-right">
              <input
                type="range"
                className="audio-player-progress-bar"
                value={(currentTime / duration) * 100 || 0}
                onChange={changeCurrentTime}
              />
            </div>
            <div className="audio-bottom">
              <div
                className="audio-time"
                data-appear="fade-left"
                data-appear-delay="75"
              >
                {showTime(currentTime)}
              </div>
              <div
                className="audio-player-button-wrappers"
                data-appear="fade-left"
                data-appear-delay="150"
              >
                <div className="audio-player-button" onClick={togglePlayback}>
                  {isPlaying ? (
                    <FaPause className="icon-pause" />
                  ) : (
                    <FaPlay className="icon-play" />
                  )}
                </div>
              </div>
              <div
                className="audio-download"
                data-appear="fade-left"
                data-appear-delay="225"
              >
                <a
                  href="https://soundcloud.com/ramesesb/rameses-b-left-behind"
                  title="Download"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaDownload />
                </a>
              </div>
              <div className="audio_vol">
                <div
                  className="audio-volume-wrapper"
                  data-appear="fade-left"
                  data-appear-delay="300"
                >
                  <div className="audio-volume-icon">
                    <FaVolumeUp />
                  </div>
                  <div className="audio-volume">
                    <input
                      type="range"
                      className="audio-volume-bar"
                      value={volume * 100}
                      onChange={changeVolume}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
