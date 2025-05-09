"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NavMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ]

  
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  
    
    const availableSections = navLinks.map(link => {
      const element = document.querySelector(link.href);
      return { href: link.href, exists: !!element };
    });
    console.debug("Available sections:", availableSections);
  
    
    const sections = navLinks.map(link => {
      
      const element = document.querySelector(link.href)
      if (!element) return null
      
      const rect = element.getBoundingClientRect()
      return {
        id: link.href,
        top: rect.top + window.scrollY,
        bottom: rect.bottom + window.scrollY,
        height: rect.height
      }
    }).filter(Boolean)
  
    
    if (sections.length === 0) return;
  
    
    const scrollPosition = window.scrollY + 200

    
    let currentSection = ""
    for (const section of sections) {
      if (!section) continue
      
      if (scrollPosition >= section.top && 
          scrollPosition < (section.bottom - 100)) {
        currentSection = section.id
        break
      }
    }

    
    if (window.scrollY < 300) {
      currentSection = ""
    }

    setActiveSection(currentSection)
  }, [navLinks])

  
  useEffect(() => {
    
    const handleSectionMounted = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(`Section mounted event received: ${customEvent.detail?.id}`);
      
      setTimeout(() => {
        handleScroll();
      }, 100);
    };
    
    window.addEventListener('sectionMounted', handleSectionMounted as EventListener);
    
    
    const timer = setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); 
    }, 2000); 
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('sectionMounted', handleSectionMounted as EventListener);
    };
  }, [handleScroll]);
  
  
  const scrollToSection = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    
    const findElement = (attempts = 0) => {
      
      const targetId = href.replace('#', '');
      const targetElement = 
        document.querySelector(href) || 
        document.getElementById(targetId) ||
        document.querySelector(`[id="${targetId}"]`);
      
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
          top: targetPosition - 100,
          behavior: "smooth"
        });
        
        setActiveSection(href);
        if (isOpen) setIsOpen(false);
      } else if (attempts < 5) {
        console.log(`Attempt ${attempts+1}: Looking for element ${href}`);
        
        setTimeout(() => findElement(attempts + 1), 500);
      } else {
        console.warn(`Element with selector "${href}" not found after multiple attempts`);
      }
    };
    
    findElement();
  }, [isOpen]);

  
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        
        const targetElement = document.querySelector(hash)
        if (targetElement) {
          setTimeout(() => {
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
              top: targetPosition - 100,
              behavior: "smooth"
            })
            setActiveSection(hash)
          }, 100)
        }
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    
  
    if (window.location.hash) {
      handleHashChange()
    }
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            >
              Omer Ahmed
            </Link>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <a 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`transition-colors duration-300 ${
                    activeSection === link.href 
                      ? "text-primary font-medium" 
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </a>
                {activeSection === link.href && (
                  <motion.div 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/80"
                    layoutId="activeSection"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div className="md:hidden" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              <Menu className="h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-end p-6">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMenu}
                className="text-foreground"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            <motion.div
              className="flex flex-col items-center justify-center h-[80vh] space-y-8"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`text-2xl font-medium transition-colors duration-300 ${
                      activeSection === link.href 
                        ? "text-primary" 
                        : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </a>
                  {activeSection === link.href && (
                    <motion.div 
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary/80"
                      layoutId="activeMobileSection"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}