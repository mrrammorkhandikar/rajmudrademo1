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

export default function Contact() {
  const [loaded, setLoaded] = useState(false);
  const [dark, setDark] = useState(true);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Brand Identity',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: 'Brand Identity',
        message: ''
      });
    } catch (error) {
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
              Get In Touch
            </span>
            <h1 className="font-playfair text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] tracking-tight reveal">
              Let's Create <br />
              <span className="text-orange-500">Something Amazing</span>
            </h1>
            <p className="mt-10 text-[1.05rem] opacity-80 max-w-xl reveal">
              Ready to bring your vision to life? We're here to help you create stunning designs that make an impact.
            </p>
          </div>
          <div className="h-[520px]">
            <RGHeroLogo />
          </div>
        </div>
      </section>

      {/* ================= CONTACT INFO ================= */}
      <section className="py-40 px-6 bg-gray-100 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">Contact Information</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto reveal">
              We'd love to hear from you. Get in touch with our team to discuss your project.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "📍",
                title: "Address",
                details: "123 Design Street, Creative District, Mumbai, Maharashtra 400001",
                action: "Get Directions"
              },
              {
                icon: "📞",
                title: "Phone",
                details: "+91 98765 43210\n+91 87654 32109",
                action: "Call Us"
              },
              {
                icon: "✉️",
                title: "Email",
                details: "info@rajmudragraphics.com\nsales@rajmudragraphics.com",
                action: "Send Email"
              }
            ].map((contact, i) => (
              <div key={i} className="bg-white dark:bg-[#111] rounded-2xl p-8 shadow-2xl text-center reveal">
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h3 className="font-kalnia text-2xl font-semibold mb-4 text-orange-500">{contact.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 whitespace-pre-line">
                  {contact.details}
                </p>
                <button className="bg-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-orange-400 transition">
                  {contact.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BUSINESS HOURS ================= */}
      <section className="py-40 px-6 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-kalnia text-5xl font-semibold mb-12 reveal">Business Hours</h2>
            
            <div className="space-y-4">
              {[
                { day: "Monday - Friday", hours: "9:00 AM - 7:00 PM" },
                { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
                { day: "Sunday", hours: "Closed" }
              ].map((schedule, i) => (
                <div key={i} className="flex justify-between items-center p-6 border border-gray-300 dark:border-gray-700 rounded-xl reveal">
                  <h3 className="font-semibold text-lg">{schedule.day}</h3>
                  <span className="text-orange-500 font-bold">{schedule.hours}</span>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-gray-100 dark:bg-[#111] rounded-2xl reveal">
              <h4 className="font-semibold text-lg mb-4">Quick Response</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                We typically respond to inquiries within 24 hours during business days. 
                For urgent projects, please mention "URGENT" in your message subject.
              </p>
            </div>
          </div>

          <div className="reveal">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978"
              alt="Office hours"
              width={600}
              height={400}
              className="rounded-2xl shadow-2xl object-cover w-full"
            />
          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="py-40 px-6 bg-gray-100 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">Send Us a Message</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto reveal">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111] rounded-3xl shadow-2xl p-8 md:p-12 reveal">
            {submitMessage && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitMessage.includes('Thank you') 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-semibold mb-2">Service Interested In</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition bg-white dark:bg-gray-800"
                  >
                    <option value="Brand Identity">Brand Identity</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Packaging & Print">Packaging & Print</option>
                    <option value="Signage & Displays">Signage & Displays</option>
                    <option value="Web & UI/UX">Web & UI/UX</option>
                    <option value="Marathi & Regional">Marathi & Regional</option>
                    <option value="Consultation">Consultation</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us about your project and requirements..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    By submitting this form, you agree to our privacy policy and terms of service.
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-orange-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ================= MAP ================= */}
      <section className="py-40 px-6 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="font-kalnia text-5xl font-semibold mb-8 reveal">Find Us</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto reveal">
              Visit our studio or get directions to our location.
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-[#111] rounded-3xl overflow-hidden shadow-2xl reveal">
            <div className="relative w-full h-[500px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3781.2646377801643!2d73.9108036751938!3d18.607163082503227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDM2JzI1LjgiTiA3M8KwNTQnNDguMiJF!5e0!3m2!1sen!2sin!4v1769249027179!5m2!1sen!2sin" 
                width="100%" 
                height="500" 
                style={{ border: 0 }}
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-[#c59d3d] dark:bg-[#c59d3d] text-black py-28 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-kalnia text-6xl leading-tight">
              Let's Start <br />Your Project
            </h2>
            <p className="mt-6 opacity-80 max-w-xl">
              Ready to create something amazing? Contact us today and let's bring your vision to life.
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