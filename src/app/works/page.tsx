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
          src="/Logo/WhatsApp_Image_2026-01-19_at_13.45.28-removebg-preview.png"
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

export default function Works() {
  const [loaded, setLoaded] = useState(false);
  const [dark, setDark] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedWork, setSelectedWork] = useState<number | null>(null);

  const horizontalWorksRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const works = [
    {
      id: 1,
      title: "3D Acrylic Letter Sign Board",
      description: "Custom 3D acrylic letter sign boards with LED illumination, perfect for hotels, offices, and commercial spaces. Featuring precision cutting and professional installation.",
      category: "Signage",
      image: "/works/WhatsApp Image 2026-01-19 at 18.09.14.jpeg",
      details: {
        client: "Hotel Grand",
        year: "2024",
        scope: "Complete signage solution including design, fabrication, and installation",
        materials: "Premium acrylic, LED lighting, stainless steel mounting",
        impact: "Increased brand visibility and customer recognition by 60%"
      },
      gallery: [
        "/works/WhatsApp Image 2026-01-19 at 18.09.14.jpeg",
        "/works/WhatsApp Image 2026-01-19 at 18.09.28.jpeg",
        "/works/WhatsApp Image 2026-01-19 at 18.09.47.jpeg"
      ]
    },
    {
      id: 2,
      title: "Marathi Wooden Name Plate",
      description: "Elegant wooden name plates with traditional Marathi calligraphy, handcrafted from premium sheesham wood with intricate detailing and natural finish.",
      category: "Traditional",
      image: "/works/WhatsApp Image 2026-01-19 at 18.09.28.jpeg",
      details: {
        client: "Sharma Residence",
        year: "2023",
        scope: "Custom wooden name plate with Marathi typography",
        materials: "Sheesham wood, natural oil finish, hand-carved lettering",
        impact: "Enhanced traditional aesthetic and cultural identity"
      },
      gallery: [
        "/works/WhatsApp Image 2026-01-19 at 18.09.28.jpeg",
        "/works/WhatsApp Image 2026-01-19 at 18.09.47.jpeg",
        "/works/WhatsApp Image 2026-01-19 at 18.10.10.jpeg"
      ]
    },
    {
      id: 3,
      title: "LED Acrylic Name Plate",
      description: "Illuminated acrylic name plates with LED backlighting, combining modern technology with elegant design for stunning visual impact.",
      category: "Modern",
      image: "/works/WhatsApp Image 2026-01-19 at 18.09.47.jpeg",
      details: {
        client: "Tech Solutions Inc",
        year: "2023",
        scope: "Modern office signage with LED illumination",
        materials: "Clear acrylic, LED lighting, aluminum frame",
        impact: "Modernized office appearance and improved after-hours visibility"
      },
      gallery: [
        "/works/WhatsApp Image 2026-01-19 at 18.09.47.jpeg",
        "/works/WhatsApp Image 2026-01-19 at 18.10.10.jpeg",
        "/works/WhatsApp Image 2026-01-19 at 18.09.14.jpeg"
      ]
    },
    {
      id: 4,
      title: "Corporate Signage Solutions",
      description: "Complete corporate signage solutions including office branding, directional signs, and professional identification systems.",
      category: "Branding",
      image: "/works/WhatsApp Image 2026-01-19 at 18.10.10.jpeg",
      details: {
        client: "Corporate Office",
        year: "2024",
        scope: "Complete office signage and branding system",
        materials: "Premium materials, professional mounting systems",
        impact: "Enhanced professional image and improved wayfinding"
      },
      gallery: [
        "/works/WhatsApp Image 2026-01-19 at 18.10.10.jpeg",
        "/works/WhatsApp Image 2026-01-19 at 18.09.14.jpeg",
        "/works/WhatsApp Image 2026-01-19 at 18.09.28.jpeg"
      ]
    },
    {
      id: 5,
      title: "Video Showcase",
      description: "Professional video documentation of our completed projects showcasing the quality and craftsmanship of our work.",
      category: "Video",
      image: "/works/WhatsApp Video 2026-01-24 at 10.15.53.mp4",
      details: {
        client: "Various Clients",
        year: "2024",
        scope: "Video documentation and showcase of completed projects",
        materials: "Professional video production",
        impact: "Enhanced client presentation and portfolio展示"
      },
      gallery: [
        "/works/WhatsApp Video 2026-01-24 at 10.15.53.mp4",
        "/works/WhatsApp Video 2026-01-24 at 10.12.03.mp4",
        "/works/WhatsApp Video 2026-01-24 at 10.16.37.mp4"
      ]
    }
  ];

  const categories = ["All", "Signage", "Traditional", "Luxury", "Modern", "Branding", "Events"];

  const filteredWorks = activeFilter === "All" 
    ? works 
    : works.filter(work => work.category === activeFilter);

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
          src="https://images.unsplash.com/photo-1527689368864-3a821dbccc34"
          fill
          alt=""
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-orange-500 uppercase tracking-[0.25em] text-xs font-semibold mb-6 block">
              Our Portfolio
            </span>
            <h1 className="font-playfair text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] tracking-tight reveal">
              Exceptional <br />
              <span className="text-orange-500">Design Works</span>
            </h1>
            <p className="mt-10 text-[1.05rem] opacity-80 max-w-xl reveal">
              Explore our portfolio of exceptional design projects that showcase creativity, craftsmanship, and attention to detail.
            </p>
          </div>
          <div className="h-[520px]">
            <RGHeroLogo />
          </div>
        </div>
      </section>

      {/* ================= FILTERS ================= */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  activeFilter === category
                    ? 'bg-orange-500 text-black'
                    : 'bg-white dark:bg-[#111] text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKS GRID ================= */}
      <section className="py-20 px-6 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorks.map((work, i) => (
              <div key={work.id} className="bg-gray-100 dark:bg-[#111] rounded-2xl overflow-hidden shadow-2xl reveal group cursor-pointer"
                onClick={() => setSelectedWork(selectedWork === work.id ? null : work.id)}>
                
                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden">
                  {work.category === "Video" ? (
                    <video
                      src={work.image}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {work.category}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="font-kalnia text-xl font-semibold mb-2 group-hover:text-orange-500 transition">
                    {work.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {work.description}
                  </p>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-500">{work.details.year}</span>
                    <button className="text-orange-500 hover:text-orange-600 text-sm font-semibold transition">
                      {selectedWork === work.id ? 'View Less' : 'View Project'}
                    </button>
                  </div>

                  {/* DETAILED INFO */}
                  {selectedWork === work.id && (
                    <div className="mt-6 space-y-4 border-t border-gray-300 dark:border-gray-700 pt-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500 dark:text-gray-500">Client:</span>
                          <p className="font-semibold">{work.details.client}</p>
                        </div>
                        <div>
                          <span className="text-gray-500 dark:text-gray-500">Scope:</span>
                          <p className="font-semibold">{work.details.scope}</p>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-gray-500 dark:text-gray-500 block mb-2">Materials:</span>
                        <p className="text-sm">{work.details.materials}</p>
                      </div>

                      <div>
                        <span className="text-gray-500 dark:text-gray-500 block mb-2">Impact:</span>
                        <p className="text-sm text-orange-500 font-semibold">{work.details.impact}</p>
                      </div>

                      {/* GALLERY */}
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        {work.gallery.map((img, j) => (
                          <div key={j} className="relative h-16 rounded-lg overflow-hidden">
                            <Image
                              src={img}
                              alt={`${work.title} ${j + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CLIENT TESTIMONIALS ================= */}
      <section className="py-40 px-6 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">Client Testimonials</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto reveal">
              What our clients say about our work and partnership
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Hotel Grand Manager",
                review: "The 3D acrylic signage transformed our hotel's appearance. The quality and attention to detail exceeded our expectations. Highly professional service from start to finish.",
                project: "3D Acrylic Signage",
                rating: 5
              },
              {
                name: "Sharma Family",
                review: "Our wooden name plate is a perfect blend of tradition and craftsmanship. The Marathi calligraphy is beautiful and the wood quality is exceptional. A true work of art!",
                project: "Traditional Name Plate",
                rating: 5
              },
              {
                name: "Elite Boutique Owner",
                review: "The titanium gold letter design gave our boutique the luxury appeal we wanted. The installation was seamless and the final result is stunning. Our customers love it!",
                project: "Luxury Signage",
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-100 dark:bg-[#111] rounded-2xl p-8 shadow-2xl reveal">
                <div className="flex gap-1 mb-6 text-orange-500">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                  "{testimonial.review}"
                </p>
                <div className="border-t border-gray-300 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold text-lg mb-2">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{testimonial.project}</p>
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
              Ready to Create <br />Something Amazing?
            </h2>
            <p className="mt-6 opacity-80 max-w-xl">
              Let's discuss your project and create a custom solution for your business.
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
              src="/Logo/WhatsApp_Image_2026-01-19_at_13.45.28-removebg-preview.png"
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