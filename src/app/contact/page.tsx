import Image from "next/image";
import SocialIcon from "./socialicons";

{
  /* Bottom: Social Icons */
}
<div className="mt-12 flex justify-center gap-6 flex-wrap">
  <SocialIcon
    platform="Instagram"
    username="eleva_clinic"
    filename="instagram.png"
    url="https://instagram.com/eleva_clinic"
  />
  <SocialIcon
    platform="TikTok"
    username="@eleva_clinic"
    filename="tiktok.png"
    url="https://www.tiktok.com/@eleva_clinic"
  />
  <SocialIcon
    platform="Facebook"
    username="Eleva Clinic"
    filename="facebook.png"
    url="https://facebook.com/eleva_clinic"
  />
  <SocialIcon
    platform="Twitter"
    username="@eleva_clinic"
    filename="twitter.png"
    url="https://twitter.com/eleva_clinic"
  />
</div>;
export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-l from-[#FFE9E5] to-[#FFFFFF] px-6 py-12 text-gray-800">
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Image */}
        <div className="flex justify-center">
          <img
            src="/images/contact-docs.png"
            alt="Eleva Clinic Team"
            className="bg-transparent max-w-[70%] sm:max-w-[90%] h-auto "
          />
        </div>

        {/* Right: Contact Info */}
        <div className="text-left space-y-4 pb-6 md:pb-30">
          <h1 className="text-3xl md:text-4xl text-[#B77762] mb-4 text-center md:text-left">
            Contact Us
          </h1>

          {/* Address */}
          <div className="flex items-start gap-3 mx-auto sm:mx-0">
            <Image
              src="/images/location1.png"
              alt="Location Icon"
              width={30}
              height={30}
              className="w-[20px] h-[25px]"
            />
            <p className=" text-xs md:text-lg">
              654/2 Rama IV Road, Maha Phrueatharam
              <br className="hidden md:inline" />
              Subdistrict,Bang Rak District, Bangkok
              <br className="hidden md:inline" />
              10500
            </p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 mx-auto sm:mx-0">
            <Image
              src="/images/phone.png"
              alt="Phone Icon"
              width={30}
              height={30}
              className="w-[25px] h-[25px]"
            />
            <p className="text-xs md:text-lg">098-994-1698</p>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-3 mx-auto sm:mx-0 md:mb-2">
            <Image
              src="/images/clock.png"
              alt="Clock Icon"
              width={30}
              height={30}
              className="w-[25px] h-[25px]"
            />
            <p className="text-xs md:text-lg">
              Open daily 11:00 - 20:00 (Except Wednesday)
            </p>
          </div>
        </div>
      </section>

      {/* Bottom: Social Icons */}
      <div className="mt-3 md:mt-12 grid grid-cols-2 gap-4 sm:flex sm:justify-center sm:gap-6">
        <SocialIcon
          platform="Instagram"
          username="eleva_clinic"
          filename="instagram.png"
          url="https://www.instagram.com/eleva_clinic"
        />
        <SocialIcon
          platform="TikTok"
          username="@eleva_clinic"
          filename="tiktok.png"
          url="https://www.tiktok.com/@eleva_clinic"
        />
        <SocialIcon
          platform="Facebook"
          username="Eleva Clinic"
          filename="facebook.png"
          url="https://www.facebook.com/elevaclinic/"
        />
        <SocialIcon
          platform="Twitter"
          username="@eleva_clinic"
          filename="twitter.png"
          url="https://x.com/"
        />
      </div>
    </main>
  );
}
