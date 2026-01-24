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

export default function Services() {
  const [loaded, setLoaded] = useState(false);
  const [dark, setDark] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);

  const horizontalServicesRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  const services = [
    {
      title: "Brand Identity & Logo Design",
      description: "Complete brand identity solutions including logo design, color palettes, typography, and brand guidelines that establish a strong visual foundation for your business.",
      detailed: "We create comprehensive brand identities that capture the essence of your business. Our process begins with understanding your vision, target audience, and market position. We then develop a unique visual language that includes logo design, color schemes, typography selection, and comprehensive brand guidelines. Every element is carefully crafted to ensure consistency and memorability across all touchpoints.",
      features: [
        "Custom logo design",
        "Brand color palette development",
        "Typography selection and hierarchy",
        "Brand guidelines and style guide",
        "Business card and stationery design",
        "Brand consistency across all platforms"
      ],
      image: "/Images/Marathi-Wooden-Name-Plate-Rajmudra-Style.jpg",
      category: "Brand Identity"
    },
    {
      title: "Digital Marketing Materials",
      description: "Eye-catching digital assets including social media graphics, web banners, email templates, and digital advertisements optimized for various platforms and devices.",
      detailed: "In today's digital-first world, your online presence needs to be impactful and consistent. We create compelling digital marketing materials that engage your audience across multiple platforms. From social media graphics that stop the scroll to email templates that drive conversions, we ensure your digital presence is cohesive and effective.",
      features: [
        "Social media graphics and templates",
        "Web banners and digital ads",
        "Email newsletter templates",
        "Digital campaign assets",
        "Platform-specific optimizations",
        "Responsive design for all devices"
      ],
      image: "/Images/Hotel-Nisarg-Shravan-Special.jpg",
      category: "Digital Marketing"
    },
    {
      title: "Packaging & Print Design",
      description: "Professional packaging design and print materials including product packaging, brochures, business cards, posters, and large-format prints with premium quality output.",
      detailed: "Physical materials still hold immense power in creating lasting impressions. We specialize in creating stunning packaging and print materials that not only look beautiful but also serve their functional purpose. From product packaging that tells your brand story to marketing collateral that converts, we handle every aspect of the design and production process.",
      features: [
        "Product packaging design",
        "Brochure and catalog design",
        "Business cards and stationery",
        "Posters and flyers",
        "Large-format prints",
        "Print-ready file preparation"
      ],
      image: "/Images/3d-acrylic-letter-sign-board.jpeg",
      category: "Print & Packaging"
    },
    {
      title: "Signage & Display Solutions",
      description: "Custom signage and display solutions including shop signs, office branding, exhibition displays, and wayfinding systems that enhance your physical presence.",
      detailed: "Your physical space is an extension of your brand. We create custom signage and display solutions that enhance your brand presence in the real world. Whether it's a storefront sign that attracts customers or office branding that inspires your team, we design solutions that are both functional and visually stunning.",
      features: [
        "Shop front signage",
        "Office and corporate branding",
        "Exhibition and trade show displays",
        "Wayfinding and directional signage",
        "3D lettering and dimensional signs",
        "LED and illuminated signage"
      ],
      image: "/Images/Titanium-Gold-Letter-With-Back..jpg",
      category: "Signage & Displays"
    },
    {
      title: "Web & UI/UX Design",
      description: "User-centered web design and user interface solutions that create seamless digital experiences and drive engagement.",
      detailed: "Your website is often the first interaction customers have with your brand. We create websites and digital interfaces that are not only beautiful but also intuitive and effective. Our user-centered approach ensures that every design decision enhances the user experience and helps achieve your business goals.",
      features: [
        "Website design and development",
        "User interface design",
        "User experience optimization",
        "Mobile app interfaces",
        "E-commerce solutions",
        "Interactive prototypes"
      ],
      image: "/Images/lluminate-Your-Name-in-Style-with-Beautiful-Acrylic-LED-Name-Plate-Marathi-Font-1.jpg",
      category: "Web & Digital"
    },
    {
      title: "Marathi & Regional Design",
      description: "Specialized design services for Marathi and regional content, ensuring cultural authenticity and linguistic accuracy in all materials.",
      detailed: "We specialize in creating designs that resonate with Marathi and regional audiences. Our team understands the cultural nuances and linguistic requirements that make regional design unique. From traditional typography to contemporary layouts, we ensure your message connects authentically with your target audience.",
      features: [
        "Marathi typography and calligraphy",
        "Regional language design",
        "Cultural and traditional elements",
        "Festival and event-specific designs",
        "Bilingual and multilingual layouts",
        "Regional brand adaptation"
      ],
      image: "/Images/Marathi-Sheesham-Wood-Nameplate-1.jpg",
      category: "Regional Design"
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
              Comprehensive Design Services
            </span>
            <h1 className="font-playfair text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] tracking-tight reveal">
              Complete <br />
              <span className="text-orange-500">Design Solutions</span>
            </h1>
            <p className="mt-10 text-[1.05rem] opacity-80 max-w-xl reveal">
              From brand identity to digital marketing, we offer comprehensive design services tailored to your unique needs.
            </p>
          </div>
          <div className="h-[520px]">
            <RGHeroLogo />
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

          {/* MOBILE SERVICES */}
          <div className="md:hidden space-y-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white dark:bg-[#111] rounded-3xl shadow-2xl p-8 reveal">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      {service.category}
                    </span>
                    <h3 className="font-kalnia text-3xl font-semibold mb-2">{service.title}</h3>
                  </div>
                  <button
                    onClick={() => setActiveService(activeService === i ? -1 : i)}
                    className="text-orange-500 hover:text-orange-600 transition"
                  >
                    {activeService === i ? "−" : "+"}
                  </button>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                  {service.description}
                </p>

                {activeService === i && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Detailed Description</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {service.detailed}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Key Features</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {service.features.map((feature, j) => (
                          <li key={j} className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                            <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative w-full h-48 rounded-xl overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* DESKTOP SERVICES GRID */}
          <div className="hidden md:block">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                    {service.category}
                  </span>
                  <h3 className="font-kalnia text-2xl font-semibold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {service.features.slice(0, 4).map((feature, j) => (
                      <div key={j} className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <button className="bg-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-400 transition">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICE PROCESS ================= */}
      <section className="py-40 px-6 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">Our Process</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto reveal">
              A proven methodology to deliver exceptional results
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We begin by understanding your vision, goals, and target audience through detailed consultation.",
                icon: "🎯"
              },
              {
                step: "02",
                title: "Research",
                description: "In-depth market research and competitor analysis to identify opportunities and trends.",
                icon: "📊"
              },
              {
                step: "03",
                title: "Design",
                description: "Creative concepts and design development based on research and client requirements.",
                icon: "🎨"
              },
              {
                step: "04",
                title: "Delivery",
                description: "Final delivery with revisions and ongoing support to ensure complete satisfaction.",
                icon: "🚀"
              }
            ].map((process, i) => (
              <div key={i} className="bg-gray-100 dark:bg-[#111] rounded-2xl p-8 text-center reveal">
                <div className="text-4xl mb-4">{process.icon}</div>
                <h3 className="font-kalnia text-2xl font-semibold mb-4 text-orange-500">{process.step}</h3>
                <h4 className="font-semibold mb-4">{process.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {process.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-40 px-6 bg-gray-100 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">Investment Options</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto reveal">
              Flexible packages to suit every business need and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "₹15,000",
                features: [
                  "Basic logo design",
                  "Color palette selection",
                  "Typography guidelines",
                  "2 rounds of revisions",
                  "Digital delivery"
                ],
                cta: "Get Started"
              },
              {
                name: "Professional",
                price: "₹45,000",
                features: [
                  "Complete brand identity",
                  "Business card design",
                  "Social media templates",
                  "Brand guidelines",
                  "5 rounds of revisions",
                  "Print and digital delivery"
                ],
                cta: "Get Professional",
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  "Full brand development",
                  "Website design",
                  "Marketing materials",
                  "Packaging design",
                  "Unlimited revisions",
                  "Priority support",
                  "Ongoing consultation"
                ],
                cta: "Contact Us"
              }
            ].map((pkg, i) => (
              <div key={i} className={`bg-white dark:bg-[#111] rounded-3xl p-8 shadow-2xl border ${pkg.popular ? 'border-orange-500' : 'border-gray-300 dark:border-gray-700'} reveal`}>
                {pkg.popular && (
                  <div className="text-center mb-4">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="font-kalnia text-2xl font-semibold mb-2 text-center">{pkg.name}</h3>
                <div className="text-3xl font-bold text-center text-orange-500 mb-6">{pkg.price}</div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-center text-gray-600 dark:text-gray-400">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-xl font-semibold transition ${
                  pkg.popular 
                    ? 'bg-orange-500 text-black hover:bg-orange-400' 
                    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}>
                  {pkg.cta}
                </button>
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
              Ready to Elevate <br />Your Brand?
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