"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Center, Environment } from "@react-three/drei";
import { SVGLoader } from "three-stdlib";
import * as THREE from "three";
import React from "react";
import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

/* ================= CURSOR ================= */
function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      gsap.to(ref.current, {
        x: e.clientX - 14,
        y: e.clientY - 14,
        duration: 0.25,
        ease: "power3.out",
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} className="fixed top-0 left-0 w-7 h-7 rounded-full border border-orange-500 mix-blend-difference pointer-events-none z-[999]" />;
}

/* ================= HERO 3D LOGO (MOUSE TILT IMAGE) ================= */
function RGHeroLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * 40;
      const yPos = (clientY / innerHeight - 0.5) * -40;

      gsap.to(logoRef.current, {
        rotationY: xPos,
        rotationX: yPos,
        transformPerspective: 1000,
        ease: "power3.out",
        duration: 0.6,
      });
    };

    container.addEventListener("mousemove", onMouseMove);
    return () => container.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
      <div ref={containerRef} className="w-full h-full flex items-center justify-center">
      <div ref={logoRef} className="relative w-72 h-72 md:w-96 md:h-96">
        <Image
          src="/Logo/RGLOGO.png"
          alt="Rajmudra Graphics Logo"
          fill
          className="object-contain drop-shadow-[0_25px_60px_rgba(255,106,0,0.35)]"
          priority
        />
      </div>
    </div>
  );
}

/* ================= LOADER ================= */
function Loader({ done }: { done: () => void }) {
  useEffect(() => {
    gsap.fromTo(
      ".loader-text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" }
    );
    gsap.to(".loader", { opacity: 0, delay: 2.2, duration: 1, onComplete: done });
  }, [done]);

  return (
    <div className="loader fixed inset-0 bg-black z-[1000] flex items-center justify-center">
      <div className="loader-text text-6xl font-bold text-orange-500">Rajmudra Graphics</div>
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [dark, setDark] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const horizontalServicesRef = useRef<HTMLDivElement>(null);
  const horizontalWorksRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const services = [
    {
      title: "Brand Identity & Logo Design",
      description: "Complete brand identity solutions including logo design, color palettes, typography, and brand guidelines that establish a strong visual foundation for your business.",
      image: "/Images/Marathi-Wooden-Name-Plate-Rajmudra-Style.jpg"
    },
    {
      title: "Digital Marketing Materials",
      description: "Eye-catching digital assets including social media graphics, web banners, email templates, and digital advertisements optimized for various platforms and devices.",
      image: "/Images/Hotel-Nisarg-Shravan-Special.jpg"
    },
    {
      title: "Packaging & Print Design",
      description: "Professional packaging design and print materials including product packaging, brochures, business cards, posters, and large-format prints with premium quality output.",
      image: "/Images/3d-acrylic-letter-sign-board.jpeg"
    }
  ];

  const works = [
    {
      title: "3D Acrylic Letter Sign Board",
      description: "Custom 3D acrylic letter sign boards with LED illumination, perfect for hotels, offices, and commercial spaces. Featuring precision cutting and professional installation.",
      image: "/Images/3d-acrylic-letter-sign-board.jpeg"
    },
    {
      title: "Marathi Wooden Name Plate",
      description: "Elegant wooden name plates with traditional Marathi calligraphy, handcrafted from premium sheesham wood with intricate detailing and natural finish.",
      image: "/Images/Marathi-Wooden-Name-Plate-Rajmudra-Style.jpg"
    },
    {
      title: "Titanium Gold Letter Design",
      description: "Premium titanium gold letter designs with metallic finish, ideal for luxury branding and high-end commercial signage applications.",
      image: "/Images/Titanium-Gold-Letter-With-Back..jpg"
    },
    {
      title: "LED Acrylic Name Plate",
      description: "Illuminated acrylic name plates with LED backlighting, combining modern technology with elegant design for stunning visual impact.",
      image: "/Images/lluminate-Your-Name-in-Style-with-Beautiful-Acrylic-LED-Name-Plate-Marathi-Font-1.jpg"
    }
  ];

  /* ================= THEME ================= */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  /* ================= SCROLL DETECTION FOR NAVBAR ================= */
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down and past 100px
        setNavbarVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up
        setNavbarVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= ANIMATIONS ================= */
  useEffect(() => {
    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });

    const setupHorizontal = (container: HTMLDivElement | null) => {
      if (!container || !container.parentElement || window.innerWidth < 768) return;

      const panels = gsap.utils.toArray<HTMLElement>(container.children);
      const totalPanels = panels.length;

      // Each panel must be full viewport width
      panels.forEach((panel) => {
        gsap.set(panel, { width: window.innerWidth, flexShrink: 0 });
      });

      gsap.to(container, {
        x: () => -(window.innerWidth * (totalPanels - 1)),
        ease: "none",
        scrollTrigger: {
          trigger: container.parentElement, // pin ONLY this section
          start: "top top",
          end: () => `+=${window.innerWidth * totalPanels}`,
          scrub: true,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });
    };

    setupHorizontal(horizontalServicesRef.current);
    setupHorizontal(horizontalWorksRef.current);
  }, []);

  return (
    <main className="bg-white text-black dark:bg-[#0a0a0a] dark:text-white overflow-x-hidden">
      {!loaded && <Loader done={() => setLoaded(true)} />}
      <Cursor />

      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen pt-32 px-10 flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
          fill
          alt=""
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-orange-500 uppercase tracking-[0.25em] text-xs font-semibold mb-6 block">
              Graphic Design Studio
            </span>
            <h1 className="font-playfair text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] tracking-tight reveal">
              Crafting Visual <br />
              <span className="text-orange-500">Excellence Since 2015</span>
            </h1>
            <p className="mt-10 text-[1.05rem] opacity-80 max-w-xl reveal">
              A creative powerhouse delivering brand identities, signage,
              and visual systems with clarity and impact.
            </p>
          </div>
          <div className="h-[520px]">
            <RGHeroLogo />
          </div>
        </div>
      </section>

      {/* ================= ABOUT US ================= */}
      <section id="story" className="py-40 px-6 bg-gray-100 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">About Us</h2>
            <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg">
              <p className="reveal">
                Rajmudra Graphics is a premier graphic design studio dedicated to transforming ideas into powerful visual experiences. Founded on the principles of creativity, precision, and innovation, we specialize in crafting compelling brand identities and marketing materials that resonate with audiences across industries.
              </p>
              <p className="reveal">
                Our team of skilled designers combines artistic vision with strategic thinking to deliver solutions that not only look exceptional but also drive measurable results. From concept to completion, we ensure every project reflects our commitment to excellence and attention to detail.
              </p>
              <p className="reveal">
                Whether you're a startup looking to establish your brand presence or an established business seeking to refresh your visual identity, Rajmudra Graphics provides comprehensive design services tailored to your unique needs and goals.
              </p>
            </div>
          </div>
          <div className="reveal">
            <Image
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5"
              alt="Creative design workspace"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= WHY TRUST US ================= */}
      <section className="relative py-40 px-6 bg-white dark:bg-[#0a0a0a]">
        <Image
          src="/Logo/charlesdeluvio-AT5vuPoi8vc-unsplash.jpg"
          alt="Trust and reliability background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/70 dark:bg-black/70" />
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          <div>
            <span className="text-orange-500 uppercase tracking-widest text-sm reveal">Our Advantages</span>
            <h2 className="font-kalnia text-5xl md:text-6xl font-semibold mt-6 mb-10 reveal">
              Why do people trust<br />
              <span className="text-orange-500">Rajmudra Graphics?</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl reveal">
              Trust is earned through innovative design thinking, technical excellence, and a commitment to delivering exceptional results that exceed expectations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-10">
            {[
              {
                title: "Creative Innovation",
                description: "Pushing boundaries with cutting-edge design concepts that blend artistic vision with strategic thinking to create truly memorable visual experiences."
              },
              {
                title: "Brand Strategy Expertise",
                description: "Comprehensive brand development from identity creation to marketing campaigns, ensuring consistent messaging across all touchpoints."
              },
              {
                title: "Technical Excellence",
                description: "Mastery of industry-standard design tools and technologies, delivering pixel-perfect results that work flawlessly across all platforms."
              },
              {
                title: "Full-Service Partnership",
                description: "Complete creative solutions from initial concept to final production, providing ongoing support and unlimited revisions for client satisfaction."
              }
            ].map((advantage, i) => (
              <div key={i} className="p-8 border border-gray-300 dark:border-gray-700 rounded-2xl">
                <h4 className="text-orange-500 text-3xl font-bold mb-4">0{i + 1}</h4>
                <h5 className="font-kalnia text-xl font-semibold mb-3">{advantage.title}</h5>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="py-40 px-6 bg-gray-100 dark:bg-[#060b16]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">Our Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto reveal">
              Comprehensive design solutions to elevate your brand and business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white dark:bg-[#0f1629] rounded-3xl shadow-2xl p-8 reveal">
                <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-kalnia text-2xl font-semibold mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                  {service.description}
                </p>
                <button className="bg-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-400 transition">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKS ================= */}
      <section id="works" className="py-40 px-6 bg-white dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">Our Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto reveal">
              Exceptional design projects that showcase our creativity and expertise
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {works.map((work, i) => (
              <div key={i} className="bg-gray-100 dark:bg-[#111] rounded-3xl shadow-2xl p-8 reveal">
                <div className="relative w-full h-64 mb-6 rounded-2xl overflow-hidden">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-kalnia text-2xl font-semibold mb-4">
                  {work.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                  {work.description}
                </p>
                <button className="bg-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-400 transition">
                  View Project
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MOBILE WORKS =================
      <section className="md:hidden py-20 px-6 bg-white dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-kalnia text-4xl font-semibold">Our Works</h2>
          </div>
          <div className="space-y-8">
            {works.map((work, i) => (
              <div key={i} className="bg-gray-100 dark:bg-[#111] rounded-3xl shadow-2xl p-8">
                <Image
                  src={work.image}
                  alt={work.title}
                  width={600}
                  height={450}
                  className="rounded-2xl object-cover w-full h-64 mb-6"
                />
                <h3 className="font-kalnia text-3xl font-semibold mb-4">
                  {work.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {work.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MOBILE SERVICES ================= 
      <section className="md:hidden py-20 px-6 bg-gray-100 dark:bg-[#060b16]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-kalnia text-4xl font-semibold">Our Services</h2>
          </div>
          <div className="space-y-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white dark:bg-[#0f1629] rounded-3xl shadow-2xl p-8">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={450}
                  className="rounded-2xl object-cover w-full h-64 mb-6"
                />
                <h3 className="font-kalnia text-3xl font-semibold mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
 */}
{/* ================= APPEAL ================= */}
<section className="py-40 px-6 bg-white dark:bg-[#0b0b0b]">
  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

    {/* IMAGE */}
    <div className="relative w-full h-[520px] rounded-[2.5rem] overflow-hidden shadow-2xl">
      <Image
        src="/Images/3d-acrylic-letter-sign-board.jpeg"
        alt="Visual appeal signage"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>

    {/* CONTENT */}
    <div>
      <span className="text-orange-500 uppercase tracking-widest text-sm font-semibold reveal">
        Visual Impact
      </span>

      <h2 className="font-kalnia text-5xl md:text-6xl font-bold mt-6 mb-8 leading-tight reveal">
        Design that<br />
        <span className="text-orange-500">pulls people in</span>
      </h2>

      <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl reveal">
        In a world full of distractions, your brand gets only a moment to stand out.
        We design sign boards and visual systems that instantly attract attention,
        spark curiosity, and leave a lasting impression.
      </p>

      <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl reveal">
        From bold typography to precision lighting and premium materials,
        every detail is crafted to elevate your presence — day and night.
      </p>

      <button className="mt-10 bg-orange-500 text-black px-10 py-4 rounded-xl font-semibold hover:bg-orange-400 transition reveal">
        Explore Our Craft
      </button>
    </div>

  </div>
</section>


{/* ================= TESTIMONIALS ================= */}
<section className="py-40 px-6 bg-gray-100 dark:bg-[#0b0b0b]">
  <div className="max-w-7xl mx-auto">

    {/* HEADER */}
    <div className="text-center mb-24">
      <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 text-orange-500 text-sm font-semibold mb-6">
        <span className="w-2 h-2 rounded-full bg-orange-500" />
        Testimonials
      </span>

      <h2 className="font-kalnia text-5xl md:text-6xl font-bold mb-6">
        Customer Reviews
      </h2>

      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
        Real feedback from clients who trusted Rajmudra Graphics to bring their
        ideas to life with precision, quality, and visual impact.
      </p>
    </div>

    {/* REVIEWS GRID */}
    <div className="grid md:grid-cols-3 gap-10">

      {[
        {
          name: "Dnyaneshwar Koditkar",
          review:
            "I recently got ACP cladding and 3D letters designed and installed by the team. I am extremely impressed with the finishing and overall quality. The materials used were truly top-notch.",
        },
        {
          name: "Pariksheet Ghule",
          review:
            "Visited Rajmudra Graphics for custom flex printing and number plate work. They offer a wide range of design options, and the staff is incredibly friendly and helpful throughout the process.",
        },
        {
          name: "Anurag Shelge",
          review:
            "A really great team and company. They are very punctual, professional, and deliver amazing work. I would highly recommend them for any graphic or signage requirement.",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white dark:bg-[#111] rounded-3xl p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)] border border-black/5 dark:border-white/10 relative"
        >
          {/* STAR RATING */}
          <div className="flex gap-1 mb-6 text-orange-500">
            ★★★★★
          </div>

          {/* REVIEW TEXT */}
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
            “{item.review}”
          </p>

          {/* NAME */}
          <div className="pt-6 border-t border-black/10 dark:border-white/10">
            <h4 className="font-semibold text-lg">
              {item.name}
            </h4>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



    {/* CTA */}
      <section
        id="contact"
        className="bg-[#c59d3d] dark:bg-[#c59d3d] text-black py-28 px-8"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-kalnia text-6xl leading-tight">
              You Still Have a <br /> Question?
            </h2>
            <p className="mt-6 opacity-80 max-w-xl">
              Leave your number and our team will personally connect with you.
            </p>
          </div>
          <div className="flex gap-4 flex-col sm:flex-row">
            <input
              type="tel"
              placeholder="Enter phone number"
              className="flex-1 px-6 py-4 rounded-xl outline-none bg-white/90 placeholder-gray-500"
            />
            <button className="bg-black dark:bg-black text-white px-10 py-4 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-800 transition">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-100 dark:bg-black py-16 px-8 text-gray-600 dark:text-gray-500">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 items-center">
        <div className="flex items-center gap-4">
          <Image
            src="/Logo/RGLOGO.png"
            width={48}
            height={48}
            alt=""
          />
          <span className="text-gray-900 dark:text-white font-semibold">
            Rajmudra Graphics
          </span>
        </div>
          <div className="flex justify-center gap-6">
            {["F", "I", "L", "B"].map((s) => (
              <span
                key={s}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 rounded-full hover:border-orange-500 hover:text-orange-500 transition"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="text-sm text-right">
            © {new Date().getFullYear()} Rajmudra Graphics
          </div>
        </div>
      </footer>
    </main>
  );
}
