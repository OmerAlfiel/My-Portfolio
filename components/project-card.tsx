"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ThreeDCard from "@/components/3d-card"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  imageUrl: string
  demoUrl: string
  codeUrl: string
  index: number
}

export default function ProjectCard({ title, description, tags, imageUrl, demoUrl, codeUrl, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <ThreeDCard>
        <Card className="overflow-hidden group h-full flex flex-col border-primary/10">
          <div className="relative h-64 w-full overflow-hidden">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <CardContent className="p-6 flex-grow">
            <motion.h3
              className="text-xl font-bold mb-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-muted-foreground mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              {description}
            </motion.p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, i) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Badge variant="secondary" className="bg-primary/10 hover:bg-primary/20">
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-6 pt-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" asChild className="group">
                <Link href={demoUrl} target="_blank">
                  <ExternalLink className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                  Demo
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" asChild className="group">
                <Link href={codeUrl} target="_blank">
                  <Github className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                  Code
                </Link>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </ThreeDCard>
    </motion.div>
  )
}
