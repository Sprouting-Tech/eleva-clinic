import { Doctor } from "@/types/content";

export const doctors: Doctor[] = [
  {
    id: "doc-1",
    slug: "dr-ploy",
    name: "Dr.Nattamon Jivorareok",
    nickname: "Dr. Paek",
    title: "Aesthetic Physician",
    image: "/images/image14.png",
    description:
      "แพทย์ผู้เชี่ยวชาญด้านศัลยกรรมเสริมความงาม บอกความนี้ ยังมีความเชี่ยวชาญในการดูแลผิวพรรณทั้งการฉีดรอยแผลเป็น, ดูแลสุขภาพผิวให้อ่อนวัย และรักษาภายนอก ในปัจจุบันยังเป็นสมาชิกของแพทยสภาอีกด้วย",
    study: [
      "Doctor of Medicine, Faculty of Medicine Siriraj Hospital, Mahidol University",
      "Graduating in Master of Science Program in Anti-Aging and Regenerative Medicine, Dhurakij Pundit University",
    ],
  },
  {
    id: "doc-2",
    slug: "dr-pee",
    name: "Dr. Pee",
    nickname: "Dr. Pee",
    title: "Dermatologist",
    image: "/images/image13.png",
    description:
      "รายละเอียดเกี่ยวกับแพทย์คนนี้ สามารถเพิ่มข้อมูลเพิ่มเติมได้ตามต้องการ",
    study: [
      "Doctor of Medicine, Example University",
      "Specialist in Dermatology, Example Institute",
    ],
  },
];
