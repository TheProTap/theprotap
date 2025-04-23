"use client"

import { useState, useEffect } from "react"
import { Briefcase, LinkIcon, Save, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import DashboardLayout from "@/components/dashboard-layout"

export default function ProfileCreationPage() {
  const [activeTab, setActiveTab] = useState("basic")
  const [profileCompletion, setProfileCompletion] = useState(25)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: [],
    socialLinks: {
      linkedin: "",
      twitter: "",
      instagram: "",
      github: "",
      website: "",
    },
    experiences: [],
    education: [],
    portfolioItems: [],
    profileVisibility: {
      email: true,
      phone: true,
      location: true,
      experiences: true,
      education: true,
      skills: true,
      portfolio: true,
    },
  })
  const [newSkill, setNewSkill] = useState("")
  const [profileSaved, setProfileSaved] = useState(false)

  // Load user data if available
  useEffect(() => {
    // In a real app, this would fetch from an API
    const savedData = localStorage.getItem("userProfile")
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData))
      } catch (e) {
        console.error("Failed to parse saved profile data")
      }
    } else {
      // Initialize with empty arrays if no saved data
      setFormData((prev) => ({
        ...prev,
        education: [],
        portfolioItems: [],
      }))
    }
  }, [])

  const handleTabChange = (value) => {
    setActiveTab(value)

    // Update completion percentage based on tab
    const completionMap = {
      basic: 25,
      experience: 50,
      education: 75,
      portfolio: 90,
      privacy: 100,
    }

    setProfileCompletion(completionMap[value] || 25)
  }

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleBasicInfoChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleVisibilityToggle = (field) => {
    setFormData((prev) => ({
      ...prev,
      profileVisibility: {
        ...prev.profileVisibility,
        [field]: !prev.profileVisibility[field],
      },
    }))
  }

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (index) => {
    const newSkills = [...formData.skills]
    newSkills.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      skills: newSkills,
    }))
  }

  const handleSaveProfile = () => {
    // In a real app, this would save to a backend
    localStorage.setItem("userProfile", JSON.stringify(formData))
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Create Your Profile</h1>
            <p className="text-gray-500">Build your professional digital profile</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-500 mr-2">Profile Completion</div>
            <div className="w-40 mr-2">
              <Progress value={profileCompletion} className="h-2" />
            </div>
            <div className="text-sm font-medium">{profileCompletion}%</div>
          </div>
        </div>

        {profileSaved && (
          <Alert className="bg-green-50 border-green-200">
            <AlertTitle className="text-green-800">Profile Saved</AlertTitle>
            <AlertDescription className="text-green-700">Your profile has been saved successfully.</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Creation Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Fill out your profile information to create your digital business card
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={handleTabChange}>
                  <TabsList className="grid grid-cols-5 mb-6">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  </TabsList>

                  {/* Basic Info Tab */}
                  <TabsContent value="basic">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleBasicInfoChange("firstName", e.target.value)}
                            placeholder="Your first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleBasicInfoChange("lastName", e.target.value)}
                            placeholder="Your last name"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => handleBasicInfoChange("title", e.target.value)}
                          placeholder="e.g. Product Designer"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleBasicInfoChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleBasicInfoChange("phone", e.target.value)}
                          placeholder="e.g. +1 (555) 123-4567"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleBasicInfoChange("location", e.target.value)}
                          placeholder="e.g. San Francisco, CA"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Professional Summary</Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => handleBasicInfoChange("bio", e.target.value)}
                          placeholder="Tell us about your professional background and expertise"
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Skills</Label>
                        <div className="flex flex-wrap gap-2 mb-2">
                          {formData.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-gray-100">
                              {skill}
                              <button
                                type="button"
                                className="ml-1 text-gray-500 hover:text-gray-700"
                                onClick={() => removeSkill(index)}
                              >
                                ×
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id="newSkill"
                            placeholder="Add a skill"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault()
                                addSkill()
                              }
                            }}
                          />
                          <Button type="button" variant="outline" onClick={addSkill}>
                            Add
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Social Media & Links</Label>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5 text-gray-400"
                            >
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect width="4" height="12" x="2" y="9"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                            <div className="flex-1">
                              <Input
                                value={formData.socialLinks.linkedin}
                                onChange={(e) => handleInputChange("socialLinks", "linkedin", e.target.value)}
                                placeholder="LinkedIn URL"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5 text-gray-400"
                            >
                              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                            </svg>
                            <div className="flex-1">
                              <Input
                                value={formData.socialLinks.instagram}
                                onChange={(e) => handleInputChange("socialLinks", "instagram", e.target.value)}
                                placeholder="Instagram URL or @username"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5 text-gray-400"
                            >
                              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                            <div className="flex-1">
                              <Input
                                value={formData.socialLinks.twitter}
                                onChange={(e) => handleInputChange("socialLinks", "twitter", e.target.value)}
                                placeholder="Twitter URL or @username"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-5 w-5 text-gray-400"
                            >
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                              <path d="M9 18c-4.51 2-5-2-7-2"></path>
                            </svg>
                            <div className="flex-1">
                              <Input
                                value={formData.socialLinks.github}
                                onChange={(e) => handleInputChange("socialLinks", "github", e.target.value)}
                                placeholder="GitHub URL or username"
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <LinkIcon className="h-5 w-5 text-gray-400" />
                            <div className="flex-1">
                              <Input
                                value={formData.socialLinks.website}
                                onChange={(e) => handleInputChange("socialLinks", "website", e.target.value)}
                                placeholder="Personal website URL"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <Button onClick={() => handleTabChange("experience")}>
                        Next: Experience
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Experience Tab */}
                  <TabsContent value="experience">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Work Experience</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newExperience = {
                              id: Date.now(),
                              title: "",
                              company: "",
                              location: "",
                              startDate: "",
                              endDate: "",
                              current: false,
                              description: "",
                            }
                            setFormData((prev) => ({
                              ...prev,
                              experiences: [...prev.experiences, newExperience],
                            }))
                          }}
                        >
                          Add Experience
                        </Button>
                      </div>

                      {formData.experiences.map((exp, index) => (
                        <Card key={exp.id} className="relative">
                          <button
                            type="button"
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={() => {
                              const newExperiences = [...formData.experiences]
                              newExperiences.splice(index, 1)
                              setFormData((prev) => ({
                                ...prev,
                                experiences: newExperiences,
                              }))
                            }}
                          >
                            ×
                          </button>
                          <CardContent className="p-4 pt-6">
                            <div className="flex items-start gap-3">
                              <Briefcase className="h-5 w-5 text-gray-400 mt-1" />
                              <div className="space-y-4 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor={`job-title-${exp.id}`}>Job Title</Label>
                                    <Input
                                      id={`job-title-${exp.id}`}
                                      value={exp.title}
                                      onChange={(e) => {
                                        const newExperiences = [...formData.experiences]
                                        newExperiences[index].title = e.target.value
                                        setFormData((prev) => ({
                                          ...prev,
                                          experiences: newExperiences,
                                        }))
                                      }}
                                      placeholder="e.g. Senior Product Designer"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor={`company-${exp.id}`}>Company</Label>
                                    <Input
                                      id={`company-${exp.id}`}
                                      value={exp.company}
                                      onChange={(e) => {
                                        const newExperiences = [...formData.experiences]
                                        newExperiences[index].company = e.target.value
                                        setFormData((prev) => ({
                                          ...prev,
                                          experiences: newExperiences,
                                        }))
                                      }}
                                      placeholder="e.g. Acme Inc."
                                    />
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`location-${exp.id}`}>Location</Label>
                                  <Input
                                    id={`location-${exp.id}`}
                                    value={exp.location}
                                    onChange={(e) => {
                                      const newExperiences = [...formData.experiences]
                                      newExperiences[index].location = e.target.value
                                      setFormData((prev) => ({
                                        ...prev,
                                        experiences: newExperiences,
                                      }))
                                    }}
                                    placeholder="e.g. San Francisco, CA"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor={`start-date-${exp.id}`}>Start Date</Label>
                                    <Input
                                      id={`start-date-${exp.id}`}
                                      type="month"
                                      value={exp.startDate}
                                      onChange={(e) => {
                                        const newExperiences = [...formData.experiences]
                                        newExperiences[index].startDate = e.target.value
                                        setFormData((prev) => ({
                                          ...prev,
                                          experiences: newExperiences,
                                        }))
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                                    <div className="flex items-center gap-2">
                                      <Input
                                        id={`end-date-${exp.id}`}
                                        type="month"
                                        value={exp.endDate}
                                        onChange={(e) => {
                                          const newExperiences = [...formData.experiences]
                                          newExperiences[index].endDate = e.target.value
                                          setFormData((prev) => ({
                                            ...prev,
                                            experiences: newExperiences,
                                          }))
                                        }}
                                        disabled={exp.current}
                                      />
                                      <div className="flex items-center gap-1">
                                        <input
                                          type="checkbox"
                                          id={`current-${exp.id}`}
                                          checked={exp.current}
                                          onChange={(e) => {
                                            const newExperiences = [...formData.experiences]
                                            newExperiences[index].current = e.target.checked
                                            if (e.target.checked) {
                                              newExperiences[index].endDate = ""
                                            }
                                            setFormData((prev) => ({
                                              ...prev,
                                              experiences: newExperiences,
                                            }))
                                          }}
                                          className="rounded border-gray-300"
                                        />
                                        <Label htmlFor={`current-${exp.id}`} className="text-sm">
                                          Current
                                        </Label>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <Label htmlFor={`description-${exp.id}`}>Description</Label>
                                  <Textarea
                                    id={`description-${exp.id}`}
                                    value={exp.description}
                                    onChange={(e) => {
                                      const newExperiences = [...formData.experiences]
                                      newExperiences[index].description = e.target.value
                                      setFormData((prev) => ({
                                        ...prev,
                                        experiences: newExperiences,
                                      }))
                                    }}
                                    placeholder="Describe your responsibilities and achievements"
                                    rows={3}
                                  />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {formData.experiences.length === 0 && (
                        <div className="text-center py-8 border border-dashed rounded-md">
                          <Briefcase className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">No work experience added yet</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4"
                            onClick={() => {
                              const newExperience = {
                                id: Date.now(),
                                title: "",
                                company: "",
                                location: "",
                                startDate: "",
                                endDate: "",
                                current: false,
                                description: "",
                              }
                              setFormData((prev) => ({
                                ...prev,
                                experiences: [...prev.experiences, newExperience],
                              }))
                            }}
                          >
                            Add Experience
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => handleTabChange("basic")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back: Basic Info
                      </Button>
                      <Button onClick={() => handleTabChange("education")}>
                        Next: Education
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Education Tab */}
                  <TabsContent value="education">
                    {/* Education content would go here - similar to experience tab */}
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => handleTabChange("experience")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back: Experience
                      </Button>
                      <Button onClick={() => handleTabChange("portfolio")}>
                        Next: Portfolio
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Portfolio Tab */}
                  <TabsContent value="portfolio">
                    {/* Portfolio content would go here */}
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => handleTabChange("education")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back: Education
                      </Button>
                      <Button onClick={() => handleTabChange("privacy")}>
                        Next: Privacy Settings
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Privacy Tab */}
                  <TabsContent value="privacy">
                    {/* Privacy settings would go here */}
                    <div className="flex justify-between mt-6">
                      <Button variant="outline" onClick={() => handleTabChange("portfolio")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back: Portfolio
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Profile
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Profile Preview */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile Preview</CardTitle>
                <CardDescription>How your profile will appear to others</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-black text-white p-6">
                    <div className="flex items-center">
                      <Avatar className="h-16 w-16 border-2 border-white mr-4">
                        <AvatarFallback>
                          {formData.firstName.charAt(0) || "?"}
                          {formData.lastName.charAt(0) || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-xl font-bold">
                          {formData.firstName || "Your"} {formData.lastName || "Name"}
                        </h2>
                        <p className="text-white/80">{formData.title || "Professional Title"}</p>
                        {formData.profileVisibility.location && formData.location && (
                          <div className="flex items-center mt-1 text-sm text-white/60">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3 mr-1"
                            >
                              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                              <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            {formData.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">About</h3>
                        <p className="text-sm text-gray-600">
                          {formData.bio || "Your professional summary will appear here."}
                        </p>
                      </div>

                      {formData.profileVisibility.skills && formData.skills.length > 0 && (
                        <div>
                          <h3 className="font-medium mb-2">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            {formData.skills.slice(0, 5).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-gray-100">
                                {skill}
                              </Badge>
                            ))}
                            {formData.skills.length > 5 && (
                              <Badge variant="secondary" className="bg-gray-100">
                                +{formData.skills.length - 5} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex justify-between">
                      <Button size="sm" variant="outline" className="text-xs">
                        Save Contact
                      </Button>
                      <Button size="sm" className="text-xs">
                        View Full Profile
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  This is a simplified preview. The actual profile may look different.
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
