import styles from "./video-embed.module.scss";
import React, { RefObject, useEffect, useImperativeHandle, useRef } from "react";
import Player from "@vimeo/player";

interface VideoEmbedProps {
  className?: string;
  src: string;
  title?: string;
  autoplay?: boolean;
  autopause?: boolean;
  fullscreen?: boolean;
  loop?: boolean;
  muted?: boolean;
  background?: boolean;
  dnt?: boolean;
  quality?: "4K" | "2K" | "1080p" | "720p" | "540p" | "360p" | "240p";
  width?: number;
  height?: number;
  fill?: boolean;
  isPlaying?: boolean;
  setIsPlaying?: Function;
  square?: boolean;
  isAnimation?: boolean;
}

export type VideoEmbedHandler = {
  iframeRef: RefObject<HTMLIFrameElement>;
  play: () => void;
  pause: () => void;
  getDuration: () => Promise<number>;
  getPosition: () => Promise<number>;
  setPosition: (seconds: number) => void;
  onPlay: (callback: (seconds: number) => void) => void; // Use specific function signature
  onPause: (callback: (seconds: number) => void) => void; // Use specific function signature
  goFullScreen: () => void; // Removed unnecessary callback parameter
  onTimeUpdate: (callback: (seconds: number) => void) => void; // Use specific function signature
};

const VideoEmbed = React.memo(
  React.forwardRef<VideoEmbedHandler, VideoEmbedProps>(
    (
      {
        className = "",
        src,
        title = "",
        autoplay = false,
        autopause = false,
        fullscreen = false,
        loop = false,
        muted = false,
        background = false,
        dnt = false,
        quality = "auto",
        width,
        height,
        fill = false,
        isPlaying = false,
        setIsPlaying,
        square,
        isAnimation,
      },
      ref
    ) => {
      const iframeRef = useRef<HTMLIFrameElement>(null);
      const playerRef = useRef<Player | null>(null);

      useEffect(() => {
        if (!iframeRef.current || youtubeMatch) return;

        playerRef.current = new Player(iframeRef.current);

        return () => {
          playerRef.current = null;
        };
      }, [setIsPlaying]);

      // set video to fill parent container
      useEffect(() => {
        if (!fill || !width || !height) return;
        function setVideoDimensions(parentWidth: number, parentHeight: number) {
          if (iframeRef.current && width && height) {
            const aspectRatio = width / height;

            if (parentWidth / parentHeight > aspectRatio) {
              iframeRef.current.style.width = "100%";
              iframeRef.current.style.height = `${parentWidth / aspectRatio}px`;
            } else {
              iframeRef.current.style.height = "100%";
              iframeRef.current.style.width = `${parentHeight * aspectRatio}px`;
            }
          }
        }
        if (iframeRef.current && iframeRef.current.parentElement) {
          const parent = iframeRef.current.parentElement;
          parent.style.display = "flex";
          parent.style.justifyContent = "center";
          parent.style.alignItems = "center";
          parent.style.overflow = "hidden";

          const aspectRatio = width / height;
          iframeRef.current.style.aspectRatio = `${aspectRatio}`;

          const observer = new ResizeObserver((entries) => {
            const rect = entries[0].contentRect;
            setVideoDimensions(rect.width, rect.height);
          });
          observer.observe(iframeRef.current.parentElement);
          return () => {
            observer.disconnect();
          };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      let isVimeo = false;
      let isYouTube = false;

      // Check if it's a Vimeo URL
      const vimeoMatch = src.match(/^https:\/\/vimeo\.com\/(\d+)(?:\/(\S+))?$/);
      if (vimeoMatch) {
        isVimeo = true;
        src = `https://player.vimeo.com/video/${vimeoMatch[1]}?h=${vimeoMatch[2]}&`; // Vimeo format
      }

      // Check if it's a YouTube URL
      const youtubeMatch = src.match(/^https:\/\/(www\.)?youtube\.com\/watch\?v=(\S+)$/);
      if (youtubeMatch) {
        isYouTube = true;
        src = `https://www.youtube.com/embed/${youtubeMatch[2]}?`; // YouTube format
      }

      // Common parameters for both Vimeo and YouTube
      src += `autoplay=${+autoplay}&`;
      src += `loop=${+loop}&`;
      src += `mute=${+muted}&`;
      // Add more common parameters as needed

      // Vimeo-specific parameters
      if (isVimeo) {
        src += `background=${+background}&`;
        src += `dnt=${+dnt}&`;
        src += `quality=${quality}&`;
        // Add more Vimeo-specific parameters
      }

      // YouTube-specific parameters
      if (isYouTube) {
        // Add YouTube-specific parameters if needed
      }

      useImperativeHandle(
        ref,
        () => ({
          iframeRef: iframeRef,
          play: () => {
            playerRef.current?.play().catch((e) => {
              console.error("Error playing video: ", e);
            });
          },
          pause: () => {
            playerRef.current?.pause().catch((e) => {
              console.error("Error pausing video: ", e);
            });
          },
          getDuration: async () => {
            if (playerRef.current) {
              return await playerRef.current.getDuration();
            }
            throw new Error("Player is not initialized");
          },
          getPosition: async () => {
            if (playerRef.current) {
              return await playerRef.current.getCurrentTime();
            }
            throw new Error("Player is not initialized");
          },
          setPosition: (seconds: number) => {
            if (playerRef.current) {
              playerRef.current.setCurrentTime(seconds).catch((e) => {
                console.error("Error setting video position: ", e);
              });
            } else {
              console.error("Player is not initialized");
            }
          },
          onPlay: (callback: (seconds: number) => void) => {
            if (playerRef.current) {
              const handlePlay = function (data: { duration: number; percent: number; seconds: number }) {
                callback(data.seconds);
              };
              playerRef.current.on("play", handlePlay);
            }
          },
          onPause: (callback: (seconds: number) => void) => {
            if (playerRef.current) {
              const handlePause = function (data: { duration: number; percent: number; seconds: number }) {
                callback(data.seconds);
              };
              playerRef.current.on("pause", handlePause);
            }
          },
          goFullScreen: () => {
            if (playerRef.current) {
              playerRef.current.requestFullscreen().catch((e) => {
                console.error("Error requesting fullscreen: ", e);
              });
            } else {
              console.error("Player is not initialized");
            }
          },
          onTimeUpdate: (callback: (seconds: number) => void) => {
            if (playerRef.current) {
              const handleTimeUpdate = function (data: { duration: number; percent: number; seconds: number }) {
                callback(data.seconds);
              };
              playerRef.current.on("timeupdate", handleTimeUpdate);
            }
          },
        }),
        []
      );

      return (
        <iframe
          ref={iframeRef}
          className={`${className} ${background ? styles.background : ""} ${square ? styles.square : ""}`}
          src={src}
          width="100%"
          height="100%"
          allow="autoplay; fullscreen"
          title={title}
        />
      );
    }
  )
);

VideoEmbed.displayName = "VideoEmbed";
export default VideoEmbed;
