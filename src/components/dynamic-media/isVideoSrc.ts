const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov'];

/** Detects whether a media URL points to a video, based on its file extension (ignoring query params). */
export function isVideoSrc(url: string): boolean {
  const cleanUrl = url.split('?')[0].toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => cleanUrl.endsWith(ext));
}
