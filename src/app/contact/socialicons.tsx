import Image from "next/image";

interface Props {
  platform: string;
  username: string;
  filename: string;
  url: string;
}

export default function SocialIcon({
  platform,
  username,
  filename,
  url,
}: Props) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col  border-[#E4CFC8] shadow-lg items-center gap-3 px-10 py-4 bg-gradient-to-t from-[#FFE9E5] to-[#FFFFFF] rounded-xl shadow hover:shadow-lg hover:bg-[#FDD9D2] hover:border transition"
    >
      <Image
        src={`/images/${filename}`}
        alt={`${platform} icon`}
        width={30}
        height={30}
        className="w-[30px] h-[30px]"
      />
      <span className="text-sm font-semibold  text-[#AF674F]">{username}</span>
    </a>
  );
}
