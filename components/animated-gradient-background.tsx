"use client"

import { useEffect, useRef } from "react"

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    const resizeCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create gradient circles
    const circles: Circle[] = []
    for (let i = 0; i < 5; i++) {
      circles.push(new Circle(width, height))
    }

    // Animation loop
    let animationFrameId: number
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, "rgba(30, 41, 59, 0.2)")
      gradient.addColorStop(1, "rgba(30, 41, 59, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw and update circles
      circles.forEach((circle) => {
        circle.draw(ctx)
        circle.update()
      })

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 opacity-50 pointer-events-none" />
}

class Circle {
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
  maxWidth: number
  maxHeight: number

  constructor(maxWidth: number, maxHeight: number) {
    this.maxWidth = maxWidth
    this.maxHeight = maxHeight
    this.x = Math.random() * maxWidth
    this.y = Math.random() * maxHeight
    this.radius = Math.random() * 100 + 50

    // Generate a random pastel color
    const hue = Math.floor(Math.random() * 360)
    this.color = `hsla(${hue}, 70%, 80%, 0.15)`

    // Random velocity
    this.vx = (Math.random() - 0.5) * 0.3
    this.vy = (Math.random() - 0.5) * 0.3
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius)
    gradient.addColorStop(0, this.color)
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)")
    ctx.fillStyle = gradient
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    // Bounce off edges
    if (this.x < 0 || this.x > this.maxWidth) this.vx *= -1
    if (this.y < 0 || this.y > this.maxHeight) this.vy *= -1
  }
}
