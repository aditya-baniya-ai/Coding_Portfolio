"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    // Simulate form submission
    try {
      // Simulate form submission delay
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // Update success state
      setSubmitSuccess(true)
    
      // Reset form fields
      setFormData({ name: "", email: "", subject: "", message: "" })
    } finally {
      setIsSubmitting(false)
    }
    
  }

  return (
    <div className="container-custom">
      <h1 className="section-heading">Contact Me</h1>
      <p className="text-lg mb-12 max-w-3xl">
        Have a question or want to work together? Feel free to reach out using the form below or through my contact
        information.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>

          {submitSuccess ? (
            <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 text-green-800 dark:text-green-300 p-4 rounded-lg mb-6">
              Thank you for your message! I will get back to you as soon as possible.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..."
                  rows={5}
                />
              </div>

              {submitError && <div className="text-red-500 text-sm">{submitError}</div>}

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h8z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          )}
        </div>

        <div className="bg-accent/50 p-8 rounded-lg border border-border">
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <Mail className="h-6 w-6 mr-4 text-primary" />
              <div>
                <h3 className="font-medium">Email</h3>
                <a
                  href="mailto:your.email@example.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  adityabaniya.us@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 mr-4 text-primary" />
              <div>
                <h3 className="font-medium">Phone</h3>
                <a href="tel:+1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                  +1 (737) 315 0786
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 mr-4 text-primary" />
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground">San Marcos, Texas, USA</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-4">Love to hear from you!</h3>
            <p className="text-muted-foreground mb-2">Thank you for visiting my portfolio website.</p>
            <p className="text-muted-foreground">If you have any offer for me or have any questions, feel free to reach out on my email.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

