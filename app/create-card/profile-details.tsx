"use client"

import { useState } from "react"
import {
  Plus,
  Trash2,
  Briefcase,
  GraduationCap,
  Award,
  LinkIcon,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function ProfileDetails({ formData, updateFormData }) {
  const [skills, setSkills] = useState(formData.skills || [])
  const [newSkill, setNewSkill] = useState("")

  const [experiences, setExperiences] = useState(
    formData.experiences || [
      { id: 1, title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" },
    ],
  )

  const [education, setEducation] = useState(
    formData.education || [
      { id: 1, school: "", degree: "", field: "", startDate: "", endDate: "", current: false, description: "" },
    ],
  )

  const [socialLinks, setSocialLinks] = useState(
    formData.socialLinks || {
      linkedin: "",
      instagram: "",
      twitter: "",
      youtube: "",
      github: "",
      website: "",
    },
  )

  const [portfolioItems, setPortfolioItems] = useState(
    formData.portfolioItems || [{ id: 1, title: "", description: "", link: "", type: "project" }],
  )

  // Skills handlers
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()]
      setSkills(updatedSkills)
      updateFormData("skills", updatedSkills)
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove)
    setSkills(updatedSkills)
    updateFormData("skills", updatedSkills)
  }

  // Experience handlers
  const addExperience = () => {
    const newId = experiences.length > 0 ? Math.max(...experiences.map((exp) => exp.id)) + 1 : 1
    const newExperience = {
      id: newId,
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    const updatedExperiences = [...experiences, newExperience]
    setExperiences(updatedExperiences)
    updateFormData("experiences", updatedExperiences)
  }

  const updateExperience = (id, field, value) => {
    const updatedExperiences = experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    setExperiences(updatedExperiences)
    updateFormData("experiences", updatedExperiences)
  }

  const removeExperience = (id) => {
    const updatedExperiences = experiences.filter((exp) => exp.id !== id)
    setExperiences(updatedExperiences)
    updateFormData("experiences", updatedExperiences)
  }

  // Education handlers
  const addEducation = () => {
    const newId = education.length > 0 ? Math.max(...education.map((edu) => edu.id)) + 1 : 1
    const newEducation = {
      id: newId,
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    }
    const updatedEducation = [...education, newEducation]
    setEducation(updatedEducation)
    updateFormData("education", updatedEducation)
  }

  const updateEducation = (id, field, value) => {
    const updatedEducation = education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    setEducation(updatedEducation)
    updateFormData("education", updatedEducation)
  }

  const removeEducation = (id) => {
    const updatedEducation = education.filter((edu) => edu.id !== id)
    setEducation(updatedEducation)
    updateFormData("education", updatedEducation)
  }

  // Social links handlers
  const updateSocialLink = (platform, value) => {
    const updatedSocialLinks = { ...socialLinks, [platform]: value }
    setSocialLinks(updatedSocialLinks)
    updateFormData("socialLinks", updatedSocialLinks)
  }

  // Portfolio handlers
  const addPortfolioItem = () => {
    const newId = portfolioItems.length > 0 ? Math.max(...portfolioItems.map((item) => item.id)) + 1 : 1
    const newItem = {
      id: newId,
      title: "",
      description: "",
      link: "",
      type: "project",
    }
    const updatedItems = [...portfolioItems, newItem]
    setPortfolioItems(updatedItems)
    updateFormData("portfolioItems", updatedItems)
  }

  const updatePortfolioItem = (id, field, value) => {
    const updatedItems = portfolioItems.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    setPortfolioItems(updatedItems)
    updateFormData("portfolioItems", updatedItems)
  }

  const removePortfolioItem = (id) => {
    const updatedItems = portfolioItems.filter((item) => item.id !== id)
    setPortfolioItems(updatedItems)
    updateFormData("portfolioItems", updatedItems)
  }

  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => updateFormData("firstName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => updateFormData("lastName", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Professional Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => updateFormData("title", e.target.value)}
            placeholder="e.g. Product Designer"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" value={formData.phone} onChange={(e) => updateFormData("phone", e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location || ""}
            onChange={(e) => updateFormData("location", e.target.value)}
            placeholder="e.g. San Francisco, CA"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Professional Summary</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => updateFormData("bio", e.target.value)}
            placeholder="Tell us about your professional background and expertise"
            rows={4}
          />
        </div>
      </div>

      <Separator />

      {/* Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Skills</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1 px-3 py-1">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
          />
          <Button type="button" onClick={addSkill} variant="outline">
            Add
          </Button>
        </div>
      </div>

      <Separator />

      {/* Work Experience */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <Button type="button" onClick={addExperience} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Experience
          </Button>
        </div>

        {experiences.map((exp, index) => (
          <Card key={exp.id} className="relative">
            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <Trash2 className="h-4 w-4" />
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
                        onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
                        placeholder="e.g. Senior Product Designer"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`company-${exp.id}`}>Company</Label>
                      <Input
                        id={`company-${exp.id}`}
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                        placeholder="e.g. Acme Inc."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`location-${exp.id}`}>Location</Label>
                    <Input
                      id={`location-${exp.id}`}
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, "location", e.target.value)}
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
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`end-date-${exp.id}`}>End Date</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={`end-date-${exp.id}`}
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          disabled={exp.current}
                        />
                        <div className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
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
                      onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                      placeholder="Describe your responsibilities and achievements"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Education */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Education</h3>
          <Button type="button" onClick={addEducation} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Education
          </Button>
        </div>

        {education.map((edu) => (
          <Card key={edu.id} className="relative">
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <CardContent className="p-4 pt-6">
              <div className="flex items-start gap-3">
                <GraduationCap className="h-5 w-5 text-gray-400 mt-1" />
                <div className="space-y-4 w-full">
                  <div className="space-y-2">
                    <Label htmlFor={`school-${edu.id}`}>School</Label>
                    <Input
                      id={`school-${edu.id}`}
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                      placeholder="e.g. Stanford University"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                        placeholder="e.g. Bachelor of Science"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                      <Input
                        id={`field-${edu.id}`}
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
                        placeholder="e.g. Computer Science"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`edu-start-date-${edu.id}`}>Start Date</Label>
                      <Input
                        id={`edu-start-date-${edu.id}`}
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`edu-end-date-${edu.id}`}>End Date</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id={`edu-end-date-${edu.id}`}
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                          disabled={edu.current}
                        />
                        <div className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            id={`edu-current-${edu.id}`}
                            checked={edu.current}
                            onChange={(e) => updateEducation(edu.id, "current", e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={`edu-current-${edu.id}`} className="text-sm">
                            Current
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`edu-description-${edu.id}`}>Description (Optional)</Label>
                    <Textarea
                      id={`edu-description-${edu.id}`}
                      value={edu.description}
                      onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                      placeholder="Additional information about your education"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Social Media Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Social Media & Links</h3>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Linkedin className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <Input
                value={socialLinks.linkedin}
                onChange={(e) => updateSocialLink("linkedin", e.target.value)}
                placeholder="LinkedIn URL"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Instagram className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <Input
                value={socialLinks.instagram}
                onChange={(e) => updateSocialLink("instagram", e.target.value)}
                placeholder="Instagram URL or @username"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Twitter className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <Input
                value={socialLinks.twitter}
                onChange={(e) => updateSocialLink("twitter", e.target.value)}
                placeholder="Twitter URL or @username"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Youtube className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <Input
                value={socialLinks.youtube}
                onChange={(e) => updateSocialLink("youtube", e.target.value)}
                placeholder="YouTube channel URL"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Github className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <Input
                value={socialLinks.github}
                onChange={(e) => updateSocialLink("github", e.target.value)}
                placeholder="GitHub URL or username"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <LinkIcon className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <Input
                value={socialLinks.website}
                onChange={(e) => updateSocialLink("website", e.target.value)}
                placeholder="Personal website URL"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Portfolio/Projects */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Portfolio & Projects</h3>
          <Button type="button" onClick={addPortfolioItem} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>

        {portfolioItems.map((item) => (
          <Card key={item.id} className="relative">
            <button
              type="button"
              onClick={() => removePortfolioItem(item.id)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <CardContent className="p-4 pt-6">
              <div className="flex items-start gap-3">
                <Award className="h-5 w-5 text-gray-400 mt-1" />
                <div className="space-y-4 w-full">
                  <div className="space-y-2">
                    <Label htmlFor={`portfolio-title-${item.id}`}>Title</Label>
                    <Input
                      id={`portfolio-title-${item.id}`}
                      value={item.title}
                      onChange={(e) => updatePortfolioItem(item.id, "title", e.target.value)}
                      placeholder="e.g. E-commerce Website Redesign"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`portfolio-type-${item.id}`}>Type</Label>
                    <select
                      id={`portfolio-type-${item.id}`}
                      value={item.type}
                      onChange={(e) => updatePortfolioItem(item.id, "type", e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="project">Project</option>
                      <option value="portfolio">Portfolio</option>
                      <option value="case-study">Case Study</option>
                      <option value="publication">Publication</option>
                      <option value="award">Award</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`portfolio-link-${item.id}`}>Link</Label>
                    <Input
                      id={`portfolio-link-${item.id}`}
                      value={item.link}
                      onChange={(e) => updatePortfolioItem(item.id, "link", e.target.value)}
                      placeholder="URL to your project or portfolio item"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`portfolio-description-${item.id}`}>Description</Label>
                    <Textarea
                      id={`portfolio-description-${item.id}`}
                      value={item.description}
                      onChange={(e) => updatePortfolioItem(item.id, "description", e.target.value)}
                      placeholder="Brief description of your project or portfolio item"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
