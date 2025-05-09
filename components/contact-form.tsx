"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Send } from "lucide-react"
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const COOLDOWN_TIME = 60000; // 1 minute in milliseconds
const getIsOnCooldown = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const lastSubmitTime = localStorage.getItem('lastEmailSubmit');
  if (!lastSubmitTime) return false;
  
  const timePassed = Date.now() - parseInt(lastSubmitTime);
  return timePassed < COOLDOWN_TIME;
};

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check if on cooldown
    if (getIsOnCooldown()) {
      toast({
        title: "Please wait",
        description: "You can only send one message per minute.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true)
    
    // Get form data for better error handling
    const form = e.currentTarget;
    const name = form.elements.namedItem('name') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const subject = form.elements.namedItem('subject') as HTMLInputElement;
    const message = form.elements.namedItem('message') as HTMLTextAreaElement;

    try {
      // Replace with your actual EmailJS service, template and public key
      const result = await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!, 
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log('Email sent successfully:', result.text);
      
      // Set cooldown after successful submission
      if (result.status === 200) {
        localStorage.setItem('lastEmailSubmit', Date.now().toString());
      }
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      })
      
      form.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      
      toast({
        title: "Message failed to send",
        description: "Please try again or contact me directly via email.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false);
    }
  }

  const formControls = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  }

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="space-y-2"
        variants={formControls}
        initial="initial"
        whileInView="animate"
        custom={0}
        viewport={{ once: true }}
      >
        <Input
          name="name"
          placeholder="Your Name"
          required
          aria-label="Your Name"
          className="border-primary/20 focus:border-primary/50 transition-all duration-300"
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        variants={formControls}
        initial="initial"
        whileInView="animate"
        custom={1}
        viewport={{ once: true }}
      >
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          aria-label="Your Email"
          className="border-primary/20 focus:border-primary/50 transition-all duration-300"
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        variants={formControls}
        initial="initial"
        whileInView="animate"
        custom={2}
        viewport={{ once: true }}
      >
        <Input
          name="subject"
          placeholder="Subject"
          required
          aria-label="Subject"
          className="border-primary/20 focus:border-primary/50 transition-all duration-300"
        />
      </motion.div>

      <motion.div
        className="space-y-2"
        variants={formControls}
        initial="initial"
        whileInView="animate"
        custom={3}
        viewport={{ once: true }}
      >
        <Textarea
          name="message"
          placeholder="Your Message"
          required
          rows={5}
          aria-label="Your Message"
          className="border-primary/20 focus:border-primary/50 transition-all duration-300"
        />
      </motion.div>

      <motion.div
        variants={formControls}
        initial="initial"
        whileInView="animate"
        custom={4}
        viewport={{ once: true }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              Sending...
              <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </span>
          ) : (
            <span className="flex items-center">
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </span>
          )}
        </Button>
      </motion.div>
    </motion.form>
  )
}