"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import ProjectCard from "@/components/project-card"
import SkillIcon from "@/components/skill-icon"
import ContactForm from "@/components/contact-form"
import AnimatedSection from "@/components/animated-section"
import AnimatedText from "@/components/animated-text"
import NavMenu from "@/components/nav-menu"
import ScrollIndicator from "@/components/scroll-indicator"
import ParticleBackground from "@/components/particle-background"
import AnimatedCursor from "@/components/animated-cursor"
import ParallaxSection from "@/components/parallax-section"
import TestimonialCard from "@/components/testimonial-card"
import StatsCounter from "@/components/stats-counter"
import RevealText from "@/components/reveal-text"
import ThreeDCard from "@/components/3d-card"
import { useEffect } from "react"
import emailjs from '@emailjs/browser';

export default function Home() {

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");
  }, []);
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }

  return (
    <main className="flex min-h-screen flex-col">
      <ParticleBackground />
      <AnimatedCursor />
      <ScrollIndicator />
      <NavMenu />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-32 md:py-40 text-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-48 h-48 mb-10 rounded-full overflow-hidden border-4 border-primary/50 shadow-xl"
        >
          <Image 
            src="/profile1.jpg" 
            alt="Profile" 
            width={192} 
            height={192} 
            className="object-cover object-[center_5%]" 
            priority 
          />
        </motion.div>

        <AnimatedText text="Hi, I'm Omer" className="text-4xl md:text-6xl font-bold mb-4" />

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Full-stack web developer specializing in building exceptional digital experiences
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
            >
              <Link href="#projects">
                View My Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-primary/20 hover:border-primary/50 transition-all duration-300"
            >
              <Link href="#contact">Get In Touch</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/OmerAlfiel" target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: -10 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://www.linkedin.com/in/omer-ahmed-964152205/" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }}>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:omer.al7labe.oa@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            repeatDelay: 0.5,
          }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-muted-foreground rounded-full mt-2"
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter value={1.5} label="Years Experience" suffix="+" />
            <StatsCounter value={30} label="Projects Completed" suffix="+" />
            <StatsCounter value={20} label="Happy Clients" suffix="+" />
            <StatsCounter value={50} label="GitHub Contributions" suffix="+" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection id="about" className="py-20">
        <div className="container mx-auto px-4">
          <RevealText className="text-3xl md:text-4xl font-bold mb-8 text-center">About Me</RevealText>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <ParallaxSection baseVelocity={0.05}>
              <ThreeDCard className="rounded-xl overflow-hidden shadow-xl">
                <div className="relative h-[500px] w-full">
                  <Image 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" 
                    alt="Web Development Workspace" 
                    fill 
                    className="object-cover" 
                    unoptimized={false}
                  />
                </div>
              </ThreeDCard>
            </ParallaxSection>

            <div>
              <RevealText className="text-lg mb-6" delay={0.1}>
                I'm a full-stack developer with expertise in TypeScript, Node.js, and React. I build secure, scalable web applications that solve real business problems. My code is clean, maintainable, and follows best practices for architecture and security.
              </RevealText>
              <RevealText className="text-lg mb-6" delay={0.2}>
                I've developed expertise in cloud solutions for real-time applications and database management. My experience spans both NoSQL and SQL database design, with a focus on optimizing complex data workflows and implementing location-based features.
              </RevealText>
              <RevealText className="text-lg" delay={0.3}>
                Beyond coding, I value software professionalism through automated testing and CI/CD pipelines. I adapt quickly to new technologies but focus on practical solutions that deliver real value—fast, secure, and user-focused.
              </RevealText>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
                >
                  <Link href="#contact">
                    Let's Work Together <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection id="projects" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <RevealText className="text-3xl md:text-4xl font-bold mb-8 text-center">Featured Projects</RevealText>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard
              title="Refuge Connect Bridge"
              description="A comprehensive platform connecting refugees with essential resources, support services, and volunteers through a smart matching system and interactive maps."
              tags={["React", "NestJS", "TypeScript", "PostgreSQL"]}
              imageUrl="/refugee-connect.jpg"
              demoUrl="https://refuge-connect-bridg.vercel.app"
              codeUrl="https://github.com/OmerAlfiel/Refuge-connect-bridg"
              index={0}
            />
            <ProjectCard
              title="Vehicle Recovery System"
              description="Real-time platform for tracking stolen vehicles with geospatial visualization, bilingual support, and role-based access control."
              tags={["Next.js", "Firebase", "Mapbox GL", "Supabase"]}
              imageUrl="/vehicle-tracking.jpg"
              demoUrl="https://www.sudancar.com"
              codeUrl="https://github.com/OmerAlfiel"
              index={1}
            />
            <ProjectCard
              title="Donation Platform"
              description="Crisis management application connecting donors with organizations through an interactive map interface and secure donation processing."
              tags={["Next.js", "TypeScript", "Firebase", "Mapbox"]}
              imageUrl="/donation-platform.jpg"
              demoUrl="https://donations-platform-zeta.vercel.app"
              codeUrl="https://github.com/OmerAlfiel"
              index={2}
            />
          </div>
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              variant="outline"
              className="border-primary/20 hover:border-primary/50 transition-all duration-300"
            >
              <Link href="https://github.com/OmerAlfiel" target="_blank">
                View More Projects on GitHub <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Skills Section */}
      <AnimatedSection id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <RevealText className="text-3xl md:text-4xl font-bold mb-12 text-center">Skills & Technologies</RevealText>
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <motion.h3
                className="text-xl font-semibold mb-8 text-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Frontend Development
              </motion.h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
                <SkillIcon name="HTML5" index={0} />
                <SkillIcon name="CSS3" index={1} />
                <SkillIcon name="JavaScript" index={2} />
                <SkillIcon name="TypeScript" index={3} />
                <SkillIcon name="React" index={4} />
                <SkillIcon name="Next.js" index={5} />
                <SkillIcon name="Tailwind CSS" index={6} />
                <SkillIcon name="Framer Motion" index={7} />
                <SkillIcon name="Redux" index={8} />
              </div>
            </div>
            <div className="mb-16">
              <motion.h3
                className="text-xl font-semibold mb-8 text-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Backend Development
              </motion.h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
                <SkillIcon name="Node.js" index={0} />
                <SkillIcon name="Express" index={1} />
                <SkillIcon name="MongoDB" index={2} />
                <SkillIcon name="PostgreSQL" index={3} />
                <SkillIcon name="Firebase" index={4} />
                <SkillIcon name="GraphQL" index={5} />
                <SkillIcon name="REST API" index={6} />
              </div>
            </div>
            <div>
              <motion.h3
                className="text-xl font-semibold mb-8 text-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Tools & Others
              </motion.h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
                <SkillIcon name="Git" index={0} />
                <SkillIcon name="GitHub" index={1} />
                <SkillIcon name="Docker" index={2} />
                <SkillIcon name="Figma" index={3} />
                <SkillIcon name="Vercel" index={4} />
                <SkillIcon name="AWS" index={5} />
                <SkillIcon name="Railway" index={6} />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
            <AnimatedSection id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <RevealText className="text-3xl md:text-4xl font-bold mb-12 text-center">What People Say</RevealText>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <TestimonialCard
              quote="Omer is an exceptional backend developer who consistently delivers high-quality code. His deep understanding of database optimization and API architecture has been invaluable to our projects. He's also great at explaining complex technical concepts to non-technical stakeholders."
              author="Ismail Younis"
              role="Senior Backend Developer"
              company="Thamanya Tech"
              index={0}
            />
            <TestimonialCard
              quote="Working with Omer has significantly improved our e-commerce platform's performance. His attention to detail and ability to implement secure, scalable solutions helped us handle increased traffic without compromising user experience."
              author="Mohannad Al-Farsi"
              role="E-commerce Specialist"
              company="Digital Marketplace Solutions"
              index={1}
            />
            <TestimonialCard
              quote="I've collaborated with Omer on several projects, and his technical expertise with Firebase and real-time applications is outstanding. He approaches challenges methodically and delivers clean, well-documented code that's easy to maintain and scale."
              author="Ahmed Mahmoud"
              role="Lead Developer"
              company="Cloud Solutions Arabia"
              index={2}
            />
          </div>
        </div>
      </AnimatedSection>

      {/* Experience Section */}
      <AnimatedSection id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <RevealText className="text-3xl md:text-4xl font-bold mb-12 text-center">Experience & Education</RevealText>
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <motion.h3
                className="text-2xl font-semibold mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Work Experience
              </motion.h3>
      
              <motion.div
                className="mb-8 border-l-4 border-primary pl-6 py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-xl font-medium">Freelance Software Developer</h4>
                <p className="text-muted-foreground mb-2">Remote | Dec 2023 - Present</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Developed full-stack web applications for clients using Next.js, Firebase, and Supabase</li>
                  <li>Built robust REST APIs and backend systems (Nest.js) ensuring performance and security</li>
                  <li>Integrated third-party APIs and services, including real-time tracking with Mapbox GL JS</li>
                  <li>Managed relational and NoSQL databases (PostgreSQL, MongoDB)</li>
                  <li>Delivered scalable, responsive applications and handled deployments on AWS</li>
                </ul>
              </motion.div>
      
              <motion.div
                className="border-l-4 border-primary pl-6 py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h4 className="text-xl font-medium">AI Trainer</h4>
                <p className="text-muted-foreground mb-2">LabelBox, Remote | Nov 2024 - Present</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Used AI tools to teach and improve machine learning models</li>
                  <li>Worked with teams to make sure AI training data was high-quality</li>
                </ul>
              </motion.div>
              <motion.div
  className="border-l-4 border-primary pl-6 py-2"
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.6 }}
>
  <h4 className="text-xl font-medium">Software Developer – Gezira College Of Technology</h4>
  <p className="text-muted-foreground mb-2">Khartoum, Sudan | May 2025 - Aug 2025</p>
  <ul className="list-disc list-inside space-y-2">
    <li>Developed the GCT University App, a mobile application for students and faculty using React Native and Expo</li>
    <li>Implemented authentication, academic supervision, admission, and registration features with Supabase backend</li>
    <li>Designed reusable UI components, custom contexts, and navigation with Expo Router</li>
    <li>Delivered communication modules including chat, notifications, and announcements</li>
    <li>Ensured full RTL Arabic support and responsive mobile UI</li>
  </ul>
</motion.div>
            </div>
      
            <div className="mb-12">
              <motion.h3
                className="text-2xl font-semibold mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Education
              </motion.h3>
      
              <motion.div
                className="border-l-4 border-primary pl-6 py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="text-xl font-medium">Bachelor's Degree in Electrical and Electronic Engineering</h4>
                <p className="text-muted-foreground mb-2">Gezira College Of Technology, Khartoum, Sudan | 2014 - 2019</p>
                <p>Specialization in Telecommunication Engineering (Second Class, Division One)</p>
                <p>Networking Diploma certification achieved during undergraduate studies</p>
              </motion.div>
            </div>
      
            <div className="mb-12">
              <motion.h3
                className="text-2xl font-semibold mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Certifications & Achievements
              </motion.h3>
      
              <motion.div
                className="border-l-4 border-primary pl-6 py-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <ul className="list-disc list-inside space-y-2">
                  <li>Networking Diploma: Learned networking basics and protocols</li>
                  <li>Completed freelance projects, making fast and reliable backend systems</li>
                  <li>Interested in learning more about Artificial Intelligence and Cloud Computing</li>
                </ul>
              </motion.div>
            </div>
      
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
              >
                <Link href="/resume.pdf" target="_blank">
                  Download Full Resume
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <RevealText className="text-3xl md:text-4xl font-bold mb-8 text-center">Get In Touch</RevealText>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            © {new Date().getFullYear()} All rights reserved.
          </motion.p>
          <motion.div
            className="flex justify-center gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://github.com/OmerAlfiel" target="_blank" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: -10 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://linkedin.com/in/omer-ahmed-964152205/" target="_blank" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" asChild>
                <Link href="mailto:omer.al7labe.oa@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    </main>
  )
}
