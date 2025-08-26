export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-l from-[#FFE9E5] to-[#FFFFFF] px-6 py-12 text-gray-800">
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left: Image */}
        <div className="flex justify-center">
          <img
            src="/images/contact-docs.png"
            alt="Eleva Clinic Team"
            className="bg-transparent max-w-[90%] h-auto"
          />
        </div>

        {/* Right: Contact Info */}
        <div className="text-left">
          <h1 className="text-4xl text-[#B77762] mb-4">Contact Us</h1>
          <p className="text-lg mb-2">
            654/2 Rama IV Road, Maha Phrueatharam Subdistrict,
            <br />
            Bang Rak District, Bangkok 10500
          </p>
          <p className="text-md mb-2">📞 098-994-1698</p>
          <p className="text-md mb-6">
            🕒 Open daily 11:00 - 20:00 (Except Wednesday)
          </p>
        </div>
      </section>

      {/* Bottom: Social Icons */}
      <div className="mt-12 flex justify-center gap-6 flex-wrap">
        {/* <SocialIcon platform="Instagram" filename="instagram.png" url="https://instagram.com/eleva_clinic" />
        <SocialIcon platform="Facebook" filename="facebook.png" url="https://facebook.com/eleva_clinic" />
        <SocialIcon platform="TikTok" filename="tiktok.png" url="https://www.tiktok.com/@eleva_clinic" />
        <SocialIcon platform="Line" filename="line.png" url="https://line.me/ti/p/~eleva_clinic" /> */}
      </div>
    </main>
  );
}
