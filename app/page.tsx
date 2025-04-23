"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Navbar from "@/components/navbar"
import FeatureCard from "@/components/feature-card"
import PricingCard from "@/components/pricing-card"
import TestimonialCard from "@/components/testimonial-card"
import { FaqItem } from "@/components/faq-item"
import { Smartphone, User, BarChart2, Share2, Briefcase, Users, CheckCircle } from "lucide-react"
import Footer from "@/components/footer"
import { handleClick, navigateTo } from "@/lib/click-handler"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [pricingRef, pricingInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="flex flex-col md:flex-row items-center justify-between gap-12"
          >
            <div className="flex-1 space-y-6">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                Next Generation Networking
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Your Digital Business Card <span className="text-primary">Reimagined</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                Share your contact info, social profiles, and portfolio with a single tap. ProTap NFC cards make
                networking seamless and memorable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" onClick={handleClick(() => navigateTo("/create-card"))}>
                  Create Your Card
                </Button>
                <Button size="lg" variant="outline" onClick={handleClick(() => navigateTo("/learn-more"))}>
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full h-[500px]">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="ProTap NFC Card"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm font-medium">Works with all smartphones</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto max-w-7xl">
          <p className="text-center text-gray-500 mb-8">Trusted by professionals from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 font-medium">Google</span>
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 font-medium">Microsoft</span>
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 font-medium">Amazon</span>
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 font-medium">Apple</span>
            </div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-500 font-medium">Meta</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sharing your information has never been easier. Just tap and connect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Order Your Card</h3>
              <p className="text-gray-600">Choose your design and customize your ProTap card with your information.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Set Up Your Profile</h3>
              <p className="text-gray-600">
                Add your contact details, social links, portfolio, and more to your digital profile.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tap & Share</h3>
              <p className="text-gray-600">
                Simply tap your card on any smartphone to instantly share your information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            ref={featuresRef}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to make a lasting impression and grow your network.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="NFC Technology"
              description="Share your information with a simple tap on any smartphone."
              icon={<Smartphone className="h-6 w-6" />}
            />
            <FeatureCard
              title="Custom Profiles"
              description="Create a personalized digital profile with all your important links."
              icon={<User className="h-6 w-6" />}
            />
            <FeatureCard
              title="Analytics Dashboard"
              description="Track how many people view your profile and which links they click."
              icon={<BarChart2 className="h-6 w-6" />}
            />
            <FeatureCard
              title="Social Integration"
              description="Connect all your social media profiles in one place."
              icon={<Share2 className="h-6 w-6" />}
            />
            <FeatureCard
              title="Portfolio Showcase"
              description="Display your work, projects, and achievements."
              icon={<Briefcase className="h-6 w-6" />}
            />
            <FeatureCard
              title="Contact Management"
              description="Easily manage and organize your growing network."
              icon={<Users className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            ref={pricingRef}
            initial="hidden"
            animate={pricingInView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Pricing Plans
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for you and your networking needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              price="29"
              description="Perfect for individuals just getting started."
              features={[
                "1 NFC Card",
                "Basic Digital Profile",
                "Social Media Links",
                "Contact Information",
                "Email Support",
              ]}
              buttonText="Get Started"
              popular={false}
            />

            <PricingCard
              title="Professional"
              price="49"
              description="Ideal for professionals and small business owners."
              features={[
                "2 NFC Cards",
                "Advanced Digital Profile",
                "Portfolio Showcase",
                "Basic Analytics",
                "Priority Support",
                "Custom Card Design",
              ]}
              buttonText="Get Started"
              popular={true}
            />

            <PricingCard
              title="Team"
              price="99"
              description="Perfect for teams and businesses."
              features={[
                "5 NFC Cards",
                "Team Management",
                "Advanced Analytics",
                "API Access",
                "Dedicated Support",
                "Custom Branding",
                "Bulk Discounts",
              ]}
              buttonText="Get Started"
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what professionals like you think about ProTap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="ProTap has completely changed how I network at events. No more fumbling for business cards!"
              author="Sarah Johnson"
              role="Marketing Director"
              avatarUrl="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="The analytics feature helps me understand which of my links are getting the most attention."
              author="Michael Chen"
              role="Freelance Designer"
              avatarUrl="/placeholder.svg?height=100&width=100"
            />
            <TestimonialCard
              quote="Our sales team loves using ProTap cards. They're professional and make a great impression."
              author="Jessica Williams"
              role="Sales Manager"
              avatarUrl="/placeholder.svg?height=100&width=100"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about ProTap NFC cards.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <FaqItem
              question="How does the ProTap NFC card work?"
              answer="ProTap cards use Near Field Communication (NFC) technology. When you tap the card on a smartphone, it instantly opens your digital profile with all your information and links."
            />
            <FaqItem
              question="Do I need an app to use ProTap?"
              answer="No app is required! Your card works with the built-in NFC reader on most modern smartphones. For iPhones, it works on iPhone 7 and newer models."
            />
            <FaqItem
              question="Can I update my information after I receive my card?"
              answer="You can update your digital profile anytime through your ProTap dashboard. The changes will be reflected instantly when someone taps your card."
            />
            <FaqItem
              question="How long does shipping take?"
              answer="Standard shipping takes 3-5 business days within the US. International shipping typically takes 7-14 business days. Expedited shipping options are also available."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 bg-primary text-white">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Networking?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are making meaningful connections with ProTap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={handleClick(() => navigateTo("/create-card"))}>
              Create Your Card
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white hover:bg-white/10"
              onClick={handleClick(() => navigateTo("/learn-more"))}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
