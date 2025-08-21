import Image from "next/image";
import { Service } from "@/types/content";

export default function ServiceCard({ item }: { item: Service }) {
  return (
    <article className="card overflow-hidden">
      <Image
        src={item.image}
        alt={item.name}
        width={640}
        height={400}
        className="h-auto w-full object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold">{item.name}</h3>
        {item.summary && (
          <p className="mt-1 text-sm text-neutral-600">{item.summary}</p>
        )}
        {item.price && (
          <div className="mt-2 font-medium">฿{item.price.toLocaleString()}</div>
        )}
      </div>
    </article>
  );
}
