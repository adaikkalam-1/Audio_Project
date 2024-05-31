import { useState, useEffect, useRef } from "react";
import "./audio.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { RiDownloadLine } from "react-icons/ri";
import { PiSpeakerSimpleNoneFill } from "react-icons/pi";
import { saveAs } from "file-saver";

const AudioPlayer = () => {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const audioSrc =
    "https://cdn.pixabay.com/audio/2023/01/18/audio_43b48c0a90.mp3";

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = audioSrc;
    audio.preload = "auto";

    audio.addEventListener("loadeddata", () => {
      if (audio.readyState >= 2) {
        setDuration(audio.duration);
      }
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.volume = volume;

    return () => {
      audio.removeEventListener("loadeddata", () => {});
      audio.removeEventListener("timeupdate", () => {});
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    console.log(audio);
    audio.volume = volume;
    console.log(volume);
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

  const handleProgressBarClick = (e) => {
    console.log(e);
    const audio = audioRef.current;
    let pro=document.getElementsByClassName('audio-player-progress')[0]
    const progressBar = e.target;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newTime = (offsetX / pro.clientWidth) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };
  const handleVolumeBarClick = (e) => {
    // console.log(e)
    let vol=document.getElementsByClassName('audio-volume-bar')[0]
    const audio = audioRef.current;

    const newVolume = e.nativeEvent.offsetX /vol.clientWidth;
    console.log(newVolume);
    audio.volume = newVolume;
    setVolume(audio.volume);
  };
  const showTime = (s) => {
    const m = Math.floor(s / 60);
    s = Math.floor(s % 60);
    return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
  };
  const handleDownload = () => {
    saveAs(audioSrc, "audio.mp3");
  };

  return (
    <div className="container">
      <div className="audio-player">
        <div id="audio-player" className="audio-player-wrapper">
          <div className="audio-player-image">
            <div
              className="audio-image-box"
              style={{
                backgroundImage:
                  "url('https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg')",
              }}
            ></div>
          </div>
          <div className="audio-player-controls">
            <div className="audio-top">
              <div className="audio-date">
                <span className="audio-day">07</span>
                <span className="audio-month">Aug</span>
              </div>

              <div className="audio-title">
                <h3>
                  <span>Rameses B</span>
                  <span className="audio-title">Left Behind</span>
                </h3>
              </div>
            </div>
            <div
              className="audio-player-progress"
              onClick={handleProgressBarClick}
            >
              <div
                className="audio-player-progress-bar"
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                  backgroundColor: "blue",
                  height: "100%",
                }}
              ></div>
            </div>

            <div className="audio-bottom">
              <div className="audio-time">{showTime(currentTime)}</div>
              <div className="audio-player-button-wrappers">
                <div className="audio-player-button" onClick={togglePlayback}>
                  {isPlaying ? (
                    <FaPause className="icon-pause" />
                  ) : (
                    <FaPlay className="icon-play" />
                  )}
                </div>
              </div>
              <div className="audio-download">
                <RiDownloadLine
                  onClick={handleDownload}
                  className="audio_download_btn"
                />
              </div>
              <div className="audio_vol">
                <div className="audio-volume-wrapper">
                  <div className="audio-volume-icon">
                    <PiSpeakerSimpleNoneFill />
                    <div className="audio-volume">
                      <div
                        className="audio-volume-bar"
                        onClick={handleVolumeBarClick}
                      >
                        <div
                          style={{
                            width: `${volume * 100}%`,
                            backgroundColor: "blue",
                            height: "100%",
                            marginTop: "3px",
                          }}
                        ></div>
                      </div>
                    </div>
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
