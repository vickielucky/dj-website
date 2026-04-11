"use client";
import {
  FaInstagram,
  FaTiktok,
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
  FaXTwitter,
  FaAward,
  FaUsers,
  FaHeadphones,
  FaMusic
} from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";

export default function Home() {
  const heroImages = ["/dj.jpeg"];
  const aboutImages = ["/dj2.jpeg","part4.jpeg","part10.jpeg"];

  const [heroIndex, setHeroIndex] = useState(0);
  const [aboutIndex, setAboutIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
    date: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", event: "", date: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const heroTimer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    const aboutTimer = setInterval(() => {
      setAboutIndex((prev) => (prev + 1) % aboutImages.length);
    }, 3500);

    return () => {
      clearInterval(heroTimer);
      clearInterval(aboutTimer);
    };
  }, [heroImages.length, aboutImages.length]);

  return (
    <main className="w-full text-white overflow-x-hidden">

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen w-full">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImages[heroIndex]}
            alt="DJ Background"
            className="w-full h-full object-cover object-center transition-all duration-1000"
          />
        </div>

        <div className="absolute inset-0 bg-black/60 z-10"></div>

        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 pt-24">
          <h1 className="text-5xl md:text-8xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg">
            DJ ALEKIE 254
          </h1>

          <p className="text-lg md:text-2xl text-gray-200 mb-8 font-light tracking-wide">
            Feel the beat. Live the vibe.
          </p>

          <a
            href="#contact"
            className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-xl"
          >
            Book Now
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" data-aos="fade-up" className="bg-black py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={aboutImages[aboutIndex]}
              alt=""
              className="rounded-2xl shadow-2xl w-full object-cover transition-all duration-1000"
            />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-500">
              About DJ Alekie 254
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              DJ Alekie 254 is a high-energy professional DJ bringing unforgettable vibes
              to weddings, clubs, birthdays, corporate events, and private parties.
              Known for electrifying mixes, crowd control, and unmatched stage presence.
            </p>

            <a
  href="#more-about"
  className="bg-pink-600 hover:bg-pink-500 px-8 py-3 rounded-full font-semibold transition inline-block"
>
  Learn More
</a>
          </div>
        </div>
      </section>
      {/* MORE ABOUT SECTION */}
<section
  id="more-about"
  data-aos="fade-up"
  className="bg-zinc-950 py-24 px-6 md:px-20"
>
  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-purple-500 mb-4">
        Why Choose DJ Alekie 254?
      </h2>

      <p className="text-gray-400 max-w-3xl mx-auto text-lg">
        Delivering more than music — creating unforgettable atmospheres,
        packed dance floors, and premium event experiences across every occasion.
      </p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">

      <div className="bg-black rounded-2xl p-8 text-center border border-purple-500/20 shadow-lg">
        <h3 className="text-4xl font-extrabold text-pink-500">100+</h3>
        <p className="text-gray-400 mt-2">Events Performed</p>
      </div>

      <div className="bg-black rounded-2xl p-8 text-center border border-purple-500/20 shadow-lg">
        <h3 className="text-4xl font-extrabold text-pink-500">50+</h3>
        <p className="text-gray-400 mt-2">Happy Clients</p>
      </div>

      <div className="bg-black rounded-2xl p-8 text-center border border-purple-500/20 shadow-lg">
        <h3 className="text-4xl font-extrabold text-pink-500">5+</h3>
        <p className="text-gray-400 mt-2">Years Experience</p>
      </div>

      <div className="bg-black rounded-2xl p-8 text-center border border-purple-500/20 shadow-lg">
        <h3 className="text-4xl font-extrabold text-pink-500">24/7</h3>
        <p className="text-gray-400 mt-2">Client Support</p>
      </div>

    </div>

    {/* Feature Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="bg-black p-8 rounded-2xl border border-purple-500/20 shadow-lg hover:scale-105 transition">
        <FaAward className="text-pink-500 text-4xl mb-4" />
        <h3 className="text-xl font-bold mb-3">Professional Experience</h3>
        <p className="text-gray-400">
          Years of live performance experience at weddings, clubs, and major events.
        </p>
      </div>

      <div className="bg-black p-8 rounded-2xl border border-purple-500/20 shadow-lg hover:scale-105 transition">
        <FaUsers className="text-pink-500 text-4xl mb-4" />
        <h3 className="text-xl font-bold mb-3">Crowd Mastery</h3>
        <p className="text-gray-400">
          Expert at reading the room and keeping guests engaged all night long.
        </p>
      </div>

      <div className="bg-black p-8 rounded-2xl border border-purple-500/20 shadow-lg hover:scale-105 transition">
        <FaHeadphones className="text-pink-500 text-4xl mb-4" />
        <h3 className="text-xl font-bold mb-3">Premium Equipment</h3>
        <p className="text-gray-400">
          Crystal-clear sound and professional-grade DJ performance gear.
        </p>
      </div>

      <div className="bg-black p-8 rounded-2xl border border-purple-500/20 shadow-lg hover:scale-105 transition">
        <FaMusic className="text-pink-500 text-4xl mb-4" />
        <h3 className="text-xl font-bold mb-3">Genre Versatility</h3>
        <p className="text-gray-400">
          Gospel, Afrobeat, Amapiano, Hip-Hop, EDM, Gengetone, Bongo, RnB, and custom playlists.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* SERVICES SECTION */}
      <section id="services" data-aos="fade-up" className="bg-zinc-950 py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-500 mb-4">
            Services & Events
          </h2>

          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Bringing unmatched energy and premium sound experience to every event.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Services cards here (unchanged) */}
            <div className="bg-black p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300 border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-4 text-pink-500">Weddings</h3>
              <p className="text-gray-400">Elegant and unforgettable music experiences for your special day.</p>
            </div>
            <div className="bg-black p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300 border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-4 text-pink-500">Club Events</h3>
              <p className="text-gray-400">High-energy mixes to keep the dance floor alive all night.</p>
            </div>
            <div className="bg-black p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300 border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-4 text-pink-500">Corporate</h3>
              <p className="text-gray-400">Professional entertainment for launches, dinners, and company events.</p>
            </div>
            <div className="bg-black p-8 rounded-2xl shadow-lg hover:scale-105 transition duration-300 border border-purple-500/20">
              <h3 className="text-2xl font-bold mb-4 text-pink-500">Private Parties</h3>
              <p className="text-gray-400">Customized playlists and vibes for birthdays and private celebrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" data-aos="zoom-in" className="bg-black py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-500 mb-4">Gallery</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Moments from unforgettable nights, epic crowds, and electrifying performances.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <img src="/part6.jpeg" alt="DJ Event 1" className="w-full h-72 object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-300" />
            <img src="/part2.jpeg" alt="DJ Event 2" className="w-full h-72 object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-300" />
            <img src="/part3.jpeg" alt="DJ Event 3" className="w-full h-72 object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-300" />
            <img src="/part1.jpeg" alt="DJ Event 4" className="w-full h-72 object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-300" />
            <img src="/part7.jpeg" alt="DJ Event 5" className="w-full h-72 object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-300" />
            <img src="/part9.jpeg" alt="DJ Event 6" className="w-full h-72 object-cover rounded-2xl shadow-lg hover:scale-105 transition duration-300" />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testmonials" data-aos="zoom-in" className="bg-zinc-950 py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-500 mb-4">What Clients Say</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Trusted by event organizers, couples, and party lovers for unforgettable experiences.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-2xl shadow-lg border border-purple-500/20">
              <p className="text-gray-300 italic mb-6">"Uyo DJ made our wedding unforgettable aisee. The dance floor was packed all night!"</p>
              <h4 className="text-pink-500 font-bold">— Sarah & James</h4>
            </div>
            <div className="bg-black p-8 rounded-2xl shadow-lg border border-purple-500/20">
              <p className="text-gray-300 italic mb-6"> "Professional, energetic, and knew exactly how to read the crowd. Highly recommended."</p>
              <h4 className="text-pink-500 font-bold">— Club Wamunyoro Management</h4>
            </div>
            <div className="bg-black p-8 rounded-2xl shadow-lg border border-purple-500/20">
              <p className="text-gray-300 italic mb-6">"DJ alifanya kazi safi manzee lemme tell you maina tulienjoy kwa iyo bash."</p>
              <h4 className="text-pink-500 font-bold">— Vickie Lucky</h4>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / BOOKING SECTION */}
      <section id="contact" className="bg-black py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-500 mb-4">Book DJ Alekie 254</h2>
          <p className="text-gray-400 mb-12">Ready to bring the vibe to your event? Send your booking inquiry below.</p>

          <form className="grid gap-6 text-left" onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
              required
            />
            <input
              name="event"
              type="text"
              placeholder="Event Type"
              value={formData.event}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
              required
            />
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Tell us more about your event..."
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-purple-500"
            ></textarea>

            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 py-4 rounded-xl font-bold transition"
            >
              {status === "sending"
                ? "Sending..."
                : status === "success"
                ? "Sent Successfully!"
                : status === "error"
                ? "Failed, Try Again"
                : "Send Booking Request"}
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 border-t border-white/10 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h3 className="text-2xl md:text-3xl font-bold text-purple-500 mb-3">DJ ALEKIE 254</h3>
          <p className="text-gray-400 mb-8">Bringing energy, vibes, and unforgettable music experiences.</p>

          <div className="flex flex-wrap justify-center gap-5 mb-8">
            {/* Instagram */}
            <a href="https://www.instagram.com/dj_alekie254" target="_blank" rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-2xl text-pink-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(236,72,153,0.7)] transition duration-300">
              <FaInstagram />
            </a>
            {/* TikTok */}
            <a href="https://www.tiktok.com/@dj.alekie254" target="_blank" rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-2xl text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] transition duration-300">
              <FaTiktok />
            </a>
            {/* X / Twitter */}
            <a href="https://x.com/dj_alekie254" target="_blank" rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-2xl text-white hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.7)] transition duration-300">
              <FaXTwitter />
            </a>
            {/* Facebook */}
            <a href="https://facebook.com/dj_alekie254" target="_blank" rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-2xl text-blue-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] transition duration-300">
              <FaFacebookF />
            </a>
            {/* YouTube */}
            <a href="https://youtube.com/@alekie25449" target="_blank" rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-2xl text-red-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(239,68,68,0.7)] transition duration-300">
              <FaYoutube />
            </a>
            {/* WhatsApp */}
            <a href="https://wa.me/254797725916" target="_blank" rel="noopener noreferrer"
              className="w-14 h-14 rounded-full bg-black border border-white/10 flex items-center justify-center text-2xl text-green-500 hover:scale-110 hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] transition duration-300">
              <FaWhatsapp />
            </a>
          </div>

          <p className="text-gray-500 text-sm">© 2026 All Rights Reserved. dev | @vickie lucky.</p>
        </div>
      </footer>

    </main>
  );
}