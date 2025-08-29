interface MapEmbedProps {
  src: string;
}

export default function MapEmbed({ src }: MapEmbedProps) {
  return (
    <div className="w-full aspect-video overflow-hidden rounded-lg shadow-lg">
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full"
      />
    </div>
  );
}
