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
import Navbar from "@/components/Navbar";

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

export default function About() {
  const [loaded, setLoaded] = useState(false);
  const [dark, setDark] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const lastScrollY = useRef(0);

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
              About Rajmudra Graphics
            </span>
            <h1 className="font-playfair text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] tracking-tight reveal">
              Our Story <br />
              <span className="text-orange-500">Since 2015</span>
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

      {/* ================= DETAILED ABOUT US ================= */}
      <section className="py-40 px-6 bg-gray-100 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">Our Story</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto reveal">
              From humble beginnings to becoming a trusted name in graphic design and signage solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="space-y-8 text-gray-600 dark:text-gray-400 text-lg">
                <div className="reveal">
                  <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Our Journey</h3>
                  <p>
                    Rajmudra Graphics was founded in 2015 with a simple mission: to provide exceptional graphic design and signage solutions that help businesses stand out. What started as a small workshop has grown into a full-service design studio serving clients across multiple industries.
                  </p>
                </div>

                <div className="reveal">
                  <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Our Philosophy</h3>
                  <p>
                    We believe that great design is more than just aesthetics—it's about creating meaningful connections between brands and their audiences. Every project we undertake is approached with careful consideration of the client's goals, target audience, and unique brand identity.
                  </p>
                </div>

                <div className="reveal">
                  <h3 className="text-2xl font-semibold text-black dark:text-white mb-4">Our Commitment</h3>
                  <p>
                    Quality, innovation, and customer satisfaction are at the heart of everything we do. We stay updated with the latest industry trends and technologies to ensure our clients receive cutting-edge solutions that deliver results.
                  </p>
                </div>
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
        </div>
      </section>

      {/* ================= SERVICES OVERVIEW ================= */}
      <section className="py-40 px-6 bg-gray-100 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">Our Services</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto reveal">
              Comprehensive design solutions to elevate your brand and business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((service, i) => (
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

      {/* ================= MISSION & VISION ================= */}
      <section className="py-40 px-6 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-kalnia text-5xl font-semibold mb-12 reveal">Our Mission & Vision</h2>
            
            <div className="space-y-8">
              <div className="p-8 border border-gray-300 dark:border-gray-700 rounded-2xl reveal">
                <h3 className="text-2xl font-semibold text-orange-500 mb-4">Mission</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  To empower businesses with innovative design solutions that enhance their visual identity and drive growth. We strive to exceed client expectations through creativity, technical excellence, and unwavering commitment to quality.
                </p>
              </div>

              <div className="p-8 border border-gray-300 dark:border-gray-700 rounded-2xl reveal">
                <h3 className="text-2xl font-semibold text-orange-500 mb-4">Vision</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  To be the preferred choice for businesses seeking exceptional graphic design and signage solutions, recognized for our creativity, reliability, and customer-centric approach.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal">
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f"
              alt="Mission and vision"
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

      {/* ================= TEAM ================= */}
      <section className="py-40 px-6 bg-gray-100 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">Our Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto reveal">
              A passionate team of designers, artists, and craftsmen dedicated to bringing your vision to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Creative Director",
                role: "Vision & Strategy",
                skills: ["Brand Strategy", "Creative Direction", "Client Relations"],
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
              },
              {
                name: "Senior Designer",
                role: "Design & Innovation",
                skills: ["Graphic Design", "Typography", "Digital Art"],
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786"
              },
              {
                name: "Production Manager",
                role: "Quality & Delivery",
                skills: ["Production Management", "Quality Control", "Project Coordination"],
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
              }
            ].map((member, i) => (
              <div key={i} className="bg-white dark:bg-[#111] rounded-2xl p-8 shadow-2xl reveal">
                <div className="relative w-full h-48 mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-xl object-cover"
                  />
                </div>
                <h3 className="font-kalnia text-2xl font-semibold mb-2">{member.name}</h3>
                <p className="text-orange-500 font-semibold mb-4">{member.role}</p>
                <div className="space-y-2">
                  {member.skills.map((skill, j) => (
                    <span key={j} className="inline-block bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#c59d3d] dark:bg-[#c59d3d] text-black py-28 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-kalnia text-6xl leading-tight">
              Ready to Transform <br />Your Brand?
            </h2>
            <p className="mt-6 opacity-80 max-w-xl">
              Let's discuss your project and create something amazing together.
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