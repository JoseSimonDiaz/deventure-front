import { useState } from 'react';

type VideoPlayerProps = { videoUrl: string; title: string };

const YOUTUBE_HOSTS = new Set(['www.youtube.com', 'youtube.com', 'm.youtube.com', 'youtu.be']);
const YOUTUBE_SHORT_HOST = 'youtu.be';
const YOUTUBE_EMBED_BASE = 'https://www.youtube-nocookie.com/embed/';
const SPANISH_SUBTITLES = 'cc_load_policy=1&cc_lang_pref=es&hl=es';
const YOUTUBE_VIDEO_ID_PATTERN = /^[\w-]{11}$/;
const SECURE_PROTOCOL = 'https:';

function toYoutubeEmbedUrl(videoUrl: string): string {
  const parsedUrl = new URL(videoUrl);
  if (!YOUTUBE_HOSTS.has(parsedUrl.hostname)) return '';
  const videoId =
    parsedUrl.hostname === YOUTUBE_SHORT_HOST
      ? parsedUrl.pathname.slice(1)
      : (parsedUrl.searchParams.get('v') ?? '');
  if (!YOUTUBE_VIDEO_ID_PATTERN.test(videoId)) return '';
  return `${YOUTUBE_EMBED_BASE}${videoId}?${SPANISH_SUBTITLES}`;
}

function isSecureVideoUrl(videoUrl: string): boolean {
  return URL.canParse(videoUrl) && new URL(videoUrl).protocol === SECURE_PROTOCOL;
}

export function VideoPlayer({ videoUrl, title }: VideoPlayerProps) {
  const [hasFailed, setHasFailed] = useState(false);

  const handleError = () => {
    setHasFailed(true);
  };

  if (hasFailed || !isSecureVideoUrl(videoUrl)) return null;
  const embedUrl = toYoutubeEmbedUrl(videoUrl);

  return (
    <div className="aspect-video w-full overflow-hidden rounded-2xl border-2 border-fjord-600 bg-fjord-950">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onError={handleError}
          className="h-full w-full"
        />
      ) : (
        <video src={videoUrl} controls onError={handleError} className="h-full w-full">
          <track kind="captions" srcLang="es" />
        </video>
      )}
    </div>
  );
}
