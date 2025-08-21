export default function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-2xl">
      <iframe
        className="h-[300px] w-full"
        loading="lazy"
        src="https://www.google.com/maps/embed?pb=<YOUR_PARAMS>"
      />
    </div>
  );
}
