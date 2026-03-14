'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Shield, 
  Users, 
  Target, 
  Trophy, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  X, 
  Send, 
  FileText,
  Clock,
  Code,
  Heart,
  UserPlus,
  Sparkles,
  Linkedin,
  Plus,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useFormStore } from '@/store/form-store';

// Step configurations - now 7 steps
const STEPS = [
  { id: 1, title: 'Basic Info', icon: UserPlus },
  { id: 2, title: 'Commitment', icon: Clock },
  { id: 3, title: 'Experience', icon: Code },
  { id: 4, title: 'Interests', icon: Heart },
  { id: 5, title: 'Team', icon: Users },
  { id: 6, title: 'Motivation', icon: Sparkles },
  { id: 7, title: 'Chat', icon: MessageSquare },
];

const YEAR_OPTIONS = ['L1', 'L2', 'L3', 'M1', 'M2'];
const HOURS_OPTIONS = ['2–4 hours', '4–6 hours', '6+ hours'];
const INTERESTS_OPTIONS = [
  'Machine Learning',
  'Deep Learning',
  'Computer Vision',
  'NLP',
  'Data Science',
  'AI + Web apps',
  'AI for startups/products',
];

// Animation variants
const slideIn = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

// Selection Button Component - Clean style
function SelectionButton({ 
  selected, 
  onClick, 
  children,
  className = '',
}: { 
  selected: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-4 py-3 rounded-lg border transition-all duration-200 font-medium text-sm",
        "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
        selected 
          ? "border-purple-500 bg-purple-500 text-white" 
          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400",
        className
      )}
    >
      {children}
    </button>
  );
}

// Landing Page Component
function LandingPage() {
  const { setView } = useFormStore();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="CSCC AI" className="w-9 h-9 object-contain" />
            <span className="font-semibold text-lg text-gray-900">CSCC AI Department</span>
          </div>
          <Badge variant="outline" className="border-gray-300 text-gray-600 font-normal">
            <Shield className="w-3 h-3 mr-1.5" />
            Member Access
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-gray-100 text-gray-600 font-normal">
              Department Members Only
            </Badge>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Project Team Formation
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
              Complete this form to help us identify your technical strengths and preferences for balanced team formation.
            </p>
            <Button 
              size="lg" 
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-6 text-base rounded-lg"
              onClick={() => setView('form')}
            >
              Access Form
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Objectives Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: 'Internal Projects',
                description: 'Collaborate on department-led AI research initiatives and build impactful solutions.',
              },
              {
                icon: Target,
                title: 'Skill Matching',
                description: 'Get paired with senior and junior researchers based on complementary skills.',
              },
              {
                icon: Trophy,
                title: 'Competition Ready',
                description: 'Form balanced squads for AI hackathons and competitions throughout the year.',
              },
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
                      <card.icon className="w-5 h-5 text-gray-700" />
                    </div>
                    <CardTitle className="text-base text-gray-900">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-500 text-sm">
                      {card.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2026 CSCC AI Department
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              Policy
            </a>
            <a href="#" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Progress Header Component
function ProgressHeader() {
  const { currentStep } = useFormStore();
  const progress = (currentStep / 7) * 100;
  const currentStepData = STEPS[currentStep - 1];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-purple-500 uppercase tracking-wide">
            Step {currentStep} of 7
          </span>
          <span className="text-gray-300">•</span>
          <span className="text-sm text-gray-600">
            {currentStepData?.title}
          </span>
        </div>
        <span className="text-sm text-gray-400">
          {Math.round(progress)}%
        </span>
      </div>
      <Progress value={progress} className="h-1 bg-gray-100 [&>div]:bg-purple-500" />
      
      {/* Step indicators */}
      <div className="flex items-center justify-between mt-6 px-1">
        {STEPS.map((step) => {
          const Icon = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                  isActive && "bg-purple-500 text-white",
                  isCompleted && "bg-purple-500 text-white",
                  !isActive && !isCompleted && "bg-gray-100 text-gray-400"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Step 1: Basic Information
function Step1BasicInfo() {
  const { formData, updateFormData, nextStep, setView } = useFormStore();

  const canProceed = formData.fullName && formData.yearOfStudy && formData.fieldMajor && formData.telegramUsername;

  return (
    <motion.div
      variants={slideIn}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Basic Information</h2>
        <p className="text-gray-500 mt-1.5">Let&apos;s start with some basic details</p>
      </div>

      <div className="space-y-5">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-gray-700 text-sm font-medium">Full Name</Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            className="h-11 rounded-lg border-gray-300"
          />
        </div>

        {/* Year of Study */}
        <div className="space-y-2">
          <Label className="text-gray-700 text-sm font-medium">Year of Study</Label>
          <div className="grid grid-cols-5 gap-2">
            {YEAR_OPTIONS.map((year) => (
              <SelectionButton
                key={year}
                selected={formData.yearOfStudy === year}
                onClick={() => updateFormData({ yearOfStudy: year })}
              >
                {year}
              </SelectionButton>
            ))}
          </div>
        </div>

        {/* Field / Major */}
        <div className="space-y-2">
          <Label htmlFor="fieldMajor" className="text-gray-700 text-sm font-medium">Field / Major</Label>
          <Input
            id="fieldMajor"
            placeholder="Computer Science"
            value={formData.fieldMajor}
            onChange={(e) => updateFormData({ fieldMajor: e.target.value })}
            className="h-11 rounded-lg border-gray-300"
          />
        </div>

        {/* LinkedIn Profile */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="linkedin" className="text-gray-700 text-sm font-medium">LinkedIn Profile</Label>
            <span className="text-xs text-gray-400">Optional</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg text-gray-400 text-sm border border-gray-200">
              <Linkedin className="w-4 h-4" />
              linkedin.com/in/
            </div>
            <Input
              id="linkedin"
              placeholder="username"
              value={formData.linkedinProfile}
              onChange={(e) => updateFormData({ linkedinProfile: e.target.value })}
              className="h-11 flex-1 rounded-lg border-gray-300"
            />
          </div>
        </div>

        {/* Telegram Username */}
        <div className="space-y-2">
          <Label htmlFor="telegram" className="text-gray-700 text-sm font-medium">Telegram Username</Label>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 rounded-lg text-gray-400 text-sm border border-gray-200">
              @
            </div>
            <Input
              id="telegram"
              placeholder="username"
              value={formData.telegramUsername}
              onChange={(e) => updateFormData({ telegramUsername: e.target.value })}
              className="h-11 flex-1 rounded-lg border-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
        <Button
          variant="ghost"
          onClick={() => setView('landing')}
          className="text-gray-500 hover:text-gray-700"
        >
          Cancel
        </Button>
        <Button
          onClick={nextStep}
          disabled={!canProceed}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6"
        >
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// Step 2: Commitment
function Step2Commitment() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  const canProceed = formData.confirmStay && formData.hoursPerWeek;

  return (
    <motion.div
      variants={slideIn}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Commitment</h2>
        <p className="text-gray-500 mt-1.5">Your availability and commitment level</p>
      </div>

      <div className="space-y-6">
        {/* Confirm Stay */}
        <div className="space-y-3">
          <Label className="text-gray-700 text-sm font-medium">
            Do you confirm that you want to stay in the AI department?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <SelectionButton
              selected={formData.confirmStay === 'yes'}
              onClick={() => updateFormData({ confirmStay: 'yes' })}
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Yes, I confirm
              </div>
            </SelectionButton>
            <SelectionButton
              selected={formData.confirmStay === 'no'}
              onClick={() => updateFormData({ confirmStay: 'no' })}
            >
              <div className="flex items-center gap-2">
                <X className="w-4 h-4" />
                Not sure
              </div>
            </SelectionButton>
          </div>
        </div>

        {/* Hours Per Week */}
        <div className="space-y-3">
          <Label className="text-gray-700 text-sm font-medium">
            How many hours per week can you dedicate?
          </Label>
          <div className="grid grid-cols-3 gap-3">
            {HOURS_OPTIONS.map((hours) => (
              <SelectionButton
                key={hours}
                selected={formData.hoursPerWeek === hours}
                onClick={() => updateFormData({ hoursPerWeek: hours })}
              >
                {hours}
              </SelectionButton>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          className="border-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={!canProceed}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6"
        >
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// Step 3: AI/Tech Experience
function Step3TechExperience() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();
  const [newTool, setNewTool] = useState('');

  const addTool = () => {
    if (newTool.trim() && !formData.toolsTechnologies.includes(newTool.trim())) {
      updateFormData({ toolsTechnologies: [...formData.toolsTechnologies, newTool.trim()] });
      setNewTool('');
    }
  };

  const removeTool = (tool: string) => {
    updateFormData({ toolsTechnologies: formData.toolsTechnologies.filter(t => t !== tool) });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTool();
    }
  };

  const getSkillLabel = (value: number) => {
    if (value <= 3) return 'Beginner';
    if (value <= 6) return 'Intermediate';
    return 'Advanced';
  };

  const canProceed = formData.aiLevel && formData.toolsTechnologies.length > 0 && formData.hasProjectExperience;

  return (
    <motion.div
      variants={slideIn}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">AI / Tech Experience</h2>
        <p className="text-gray-500 mt-1.5">Tell us about your technical background</p>
      </div>

      <div className="space-y-6">
        {/* AI Level Slider */}
        <div className="space-y-3">
          <Label className="text-gray-700 text-sm font-medium">
            What is your current level in AI / programming?
          </Label>
          <div className="border border-gray-200 rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Beginner</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-900">
                  {formData.aiLevel || 1}
                </span>
                <span className="text-gray-400">/10</span>
              </div>
              <span className="text-sm text-gray-400">Expert</span>
            </div>
            <Slider
              value={[formData.aiLevel ? parseInt(formData.aiLevel) : 1]}
              onValueChange={(value) => updateFormData({ aiLevel: value[0].toString() })}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="text-center mt-3">
              <Badge variant="secondary" className="bg-gray-100 text-gray-700 font-normal">
                {getSkillLabel(parseInt(formData.aiLevel || '1'))}
              </Badge>
            </div>
          </div>
        </div>

        {/* Tools & Technologies - Custom Input */}
        <div className="space-y-3">
          <Label className="text-gray-700 text-sm font-medium">
            Which tools or languages do you know?
          </Label>
          
          {/* Input for adding tools */}
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Python, TensorFlow, React..."
              value={newTool}
              onChange={(e) => setNewTool(e.target.value)}
              onKeyDown={handleKeyPress}
              className="h-11 rounded-lg border-gray-300"
            />
            <Button
              onClick={addTool}
              disabled={!newTool.trim()}
              className="h-11 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Display added tools as tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <AnimatePresence>
              {formData.toolsTechnologies.map((tool) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  <Badge
                    variant="secondary"
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 font-normal"
                  >
                    {tool}
                    <button
                      onClick={() => removeTool(tool)}
                      className="ml-2 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {formData.toolsTechnologies.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              Type a tool name and press Enter to add it.
            </p>
          )}
        </div>

        {/* Project Experience */}
        <div className="space-y-3">
          <Label className="text-gray-700 text-sm font-medium">
            Have you worked on a project before?
          </Label>
          <div className="grid grid-cols-2 gap-3">
            <SelectionButton
              selected={formData.hasProjectExperience === 'yes'}
              onClick={() => updateFormData({ hasProjectExperience: 'yes' })}
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Yes
              </div>
            </SelectionButton>
            <SelectionButton
              selected={formData.hasProjectExperience === 'no'}
              onClick={() => updateFormData({ hasProjectExperience: 'no', projectDescription: '' })}
            >
              <div className="flex items-center gap-2">
                <X className="w-4 h-4" />
                No
              </div>
            </SelectionButton>
          </div>
          
          {formData.hasProjectExperience === 'yes' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2 pt-2"
            >
              <Label htmlFor="projectDescription" className="text-gray-600 text-sm">
                Project Description
              </Label>
              <Textarea
                id="projectDescription"
                placeholder="Describe briefly (1-2 sentences)"
                value={formData.projectDescription}
                onChange={(e) => updateFormData({ projectDescription: e.target.value })}
                className="rounded-lg border-gray-300 min-h-[80px]"
              />
            </motion.div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          className="border-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={!canProceed}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6"
        >
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// Step 4: Interests
function Step4Interests() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  const toggleInterest = (interest: string) => {
    const current = [...formData.interests];
    if (current.includes(interest)) {
      updateFormData({ interests: current.filter(i => i !== interest) });
    } else if (current.length < 3) {
      updateFormData({ interests: [...current, interest] });
    }
  };

  const canProceed = formData.interests.length >= 1;

  return (
    <motion.div
      variants={slideIn}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Interests</h2>
        <p className="text-gray-500 mt-1.5">What AI areas excite you the most?</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-gray-700 text-sm font-medium">
            Select 1-3 areas
          </Label>
          <span className="text-sm text-gray-400">
            {formData.interests.length}/3
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {INTERESTS_OPTIONS.map((interest) => (
            <SelectionButton
              key={interest}
              selected={formData.interests.includes(interest)}
              onClick={() => toggleInterest(interest)}
              className="justify-between"
            >
              <span>{interest}</span>
              {formData.interests.includes(interest) && (
                <Check className="w-4 h-4" />
              )}
            </SelectionButton>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          className="border-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={!canProceed}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6"
        >
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// Step 5: Team Preferences
function Step5TeamPreferences() {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();

  return (
    <motion.div
      variants={slideIn}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Team Preferences</h2>
        <p className="text-gray-500 mt-1.5">Help us create the best team dynamics</p>
      </div>

      <div className="space-y-5">
        {/* Preferred Teammates */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="preferredTeammates" className="text-gray-700 text-sm font-medium">
              Preferred teammates
            </Label>
            <span className="text-xs text-gray-400">Optional</span>
          </div>
          <Input
            id="preferredTeammates"
            placeholder="e.g., Yassine Alikacem, Rania Belakebi"
            value={formData.preferredTeammates}
            onChange={(e) => updateFormData({ preferredTeammates: e.target.value })}
            className="h-11 rounded-lg border-gray-300"
          />
        </div>

        {/* Avoid Teammates */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="avoidTeammates" className="text-gray-700 text-sm font-medium">
              Prefer NOT to work with
            </Label>
            <span className="text-xs text-gray-400">Optional</span>
          </div>
          <Input
            id="avoidTeammates"
            placeholder="e.g., Yassine Alikacem, Rania Belakebi"
            value={formData.avoidTeammates}
            onChange={(e) => updateFormData({ avoidTeammates: e.target.value })}
            className="h-11 rounded-lg border-gray-300"
          />
          <p className="text-xs text-gray-400">
            This information is kept confidential
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          className="border-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={nextStep}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6"
        >
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// Step 6: Motivation
function Step6Motivation() {
  const { formData, updateFormData, prevStep, nextStep } = useFormStore();

  const canProceed = formData.whyJoin && formData.yearGoals;

  return (
    <motion.div
      variants={slideIn}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">Motivation</h2>
        <p className="text-gray-500 mt-1.5">Tell us about your goals</p>
      </div>

      <div className="space-y-5">
        {/* Why Join */}
        <div className="space-y-2">
          <Label htmlFor="whyJoin" className="text-gray-700 text-sm font-medium">
            Why do you want to join a team in the AI department?
          </Label>
          <Textarea
            id="whyJoin"
            placeholder="Share your motivation..."
            value={formData.whyJoin}
            onChange={(e) => updateFormData({ whyJoin: e.target.value })}
            className="rounded-lg border-gray-300 min-h-[80px]"
          />
        </div>

        {/* Year Goals */}
        <div className="space-y-2">
          <Label htmlFor="yearGoals" className="text-gray-700 text-sm font-medium">
            What do you want to achieve by the end of the year?
          </Label>
          <Textarea
            id="yearGoals"
            placeholder="e.g., build projects, win competitions, learn ML..."
            value={formData.yearGoals}
            onChange={(e) => updateFormData({ yearGoals: e.target.value })}
            className="rounded-lg border-gray-300 min-h-[80px]"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          className="border-gray-300"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={nextStep}
          disabled={!canProceed}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6"
        >
          Continue
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// Step 7: AI Chat (Integrated in form)
function Step7Chat() {
  const { formData, prevStep, setView } = useFormStore();
  const [messages, setMessages] = useState<{role: string; content: string}[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [interviewComplete, setInterviewComplete] = useState(false);

  // Initialize the chat on mount
  useEffect(() => {
    if (messages.length === 0) {
      sendToAI([], 1);
    }
  }, []);

  // Build context-aware system prompt using form data and current question step
  const getSystemMessages = (userMessages: {role: string; content: string}[], targetQuestion: number) => {
    let instruction = "";
    
    if (targetQuestion === 1) {
      instruction = "This is Question 1. Greet them by name first. Ask them a VERY SIMPLE, amateur-friendly question about their interest in AI. If they listed tools, ask what they liked building with them. If they didn't list anything, ask what excites them about AI. DO NOT ask deep technical or coding questions. Keep it light and welcoming.";
    } else if (targetQuestion === 2) {
      instruction = "This is Question 2. Based on their answer, ask a simple follow-up question. For example, ask about a challenge they think AI could solve, or what they hope to learn in the department. Keep it non-technical and conversational.";
    } else if (targetQuestion === 3) {
      instruction = "This is Question 3 (the final question). Ask them a simple team-fit question, like what kind of role they enjoy in a group project (e.g., coming up with ideas, organizing, or learning to code).";
    } else {
      instruction = "The interview is over. Briefly thank them for their time, tell them their answers have been recorded to help admins balance the teams, and let them know they can click Submit Form below.";
    }

    const systemPrompt = {
      role: 'system',
      content: `You are a friendly, welcoming AI Interviewer for the CSCC AI Department's Team Formation Portal. You are chatting with a student to help match them with a team.
      
IMPORTANT: Many applicants are COMPLETE BEGINNERS to AI. Do NOT ask difficult, pro, or highly technical questions. Your questions must be easy to answer for someone who is just curious about AI.

Here is their profile:
- Name: ${formData.fullName || 'Unknown'}
- AI/Programming Level: ${formData.aiLevel || 'Unknown'}/10
- Tools they know: ${formData.toolsTechnologies.join(', ') || 'None listed'}
- Interests: ${formData.interests.join(', ') || 'None listed'}
- Motivation to join: ${formData.whyJoin || 'Not provided'}

INSTRUCTION FOR THIS TURN: 
${instruction}

RULES:
- Ask ONLY ONE simple question at a time.
- Keep your response SHORT (2-3 sentences max).
- Be incredibly supportive, professional, and encouraging.`
    };
    return [systemPrompt, ...userMessages];
  };

  const sendToAI = async (currentMessages: {role: string; content: string}[], nextQuestionNum: number) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: getSystemMessages(currentMessages, nextQuestionNum),
        }),
      });

      const data = await response.json();

      if (response.ok && data.content) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: data.content }
        ]);
        setQuestionCount(nextQuestionNum);
        if (nextQuestionNum > 3) {
          setInterviewComplete(true);
        }
      } else {
        throw new Error('API Error');
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'We had a slight connection issue, but your answers so far look great. You can proceed to submit the form!' }
      ]);
      setInterviewComplete(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = { role: 'user', content: inputValue };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue('');
    
    sendToAI(updatedMessages, questionCount + 1);
  };

  const handleSubmit = () => {
    setView('success');
  };

  return (
    <motion.div
      variants={slideIn}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25 }}
      className="space-y-4"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">AI Interview</h2>
        <p className="text-gray-500 mt-1.5">Answer 3 quick questions to help us match you with the right team</p>
      </div>

      {/* Chat Container */}
      <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col h-[400px]">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-3",
                message.role === 'user' ? "flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
                message.role === 'assistant' 
                  ? "bg-purple-100" 
                  : "bg-gray-200"
              )}>
                {message.role === 'assistant' 
                  ? <Bot className="w-4 h-4 text-purple-600" />
                  : <span className="text-xs font-medium">You</span>
                }
              </div>
              <div className={cn(
                "px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm",
                message.role === 'assistant'
                  ? "bg-white border border-gray-100 text-gray-700 rounded-tl-sm"
                  : "bg-purple-500 text-white rounded-tr-sm"
              )}>
                {message.content}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-purple-100 shadow-sm">
                <Bot className="w-4 h-4 text-purple-600" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white border border-gray-100 text-gray-400 text-sm rounded-tl-sm shadow-sm">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <Input
              placeholder={interviewComplete ? "Interview complete" : "Type your answer..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading || interviewComplete}
              className="flex-1 h-10 rounded-xl border-gray-300 text-sm focus-visible:ring-purple-500"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading || interviewComplete}
              className="h-10 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {!interviewComplete && (
            <div className="flex justify-between items-center mt-2 px-1 text-xs text-gray-400">
              <span>{Math.max(0, 3 - questionCount + 1)} questions remaining</span>
              <span>Press Enter to send</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-6">
        <Button
          variant="outline"
          onClick={prevStep}
          className="border-gray-300"
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>
        <AnimatePresence>
          {interviewComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Button
                onClick={handleSubmit}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 shadow-md"
              >
                Submit Form
                <Check className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Success View
function SuccessView() {
  const { setView } = useFormStore();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-sm w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-8 h-8 text-green-600" />
        </motion.div>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Form Submitted!
        </h2>
        <p className="text-gray-500 mb-8">
          Thank you for completing the form. We&apos;ll review your information and get back to you soon.
        </p>

        <Button
          onClick={() => setView('landing')}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-5 rounded-lg"
        >
          Return to Home
        </Button>
      </motion.div>
    </div>
  );
}

// Form Container
function FormView() {
  const { currentStep, setView } = useFormStore();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step2Commitment />;
      case 3:
        return <Step3TechExperience />;
      case 4:
        return <Step4Interests />;
      case 5:
        return <Step5TeamPreferences />;
      case 6:
        return <Step6Motivation />;
      case 7:
        return <Step7Chat />;
      default:
        return <Step1BasicInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="CSCC AI" className="w-9 h-9 object-contain" />
            <span className="font-semibold text-gray-900">CSCC AI Department</span>
          </div>
          <Button
            variant="ghost"
            onClick={() => setView('landing')}
            className="text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Form Content */}
      <main className="max-w-xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-8">
          <ProgressHeader />
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        {/* Privacy Note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Your data is securely processed and will not be shared without your permission.
        </p>
      </main>
    </div>
  );
}

// Main App
export default function Home() {
  const { currentView } = useFormStore();

  return (
    <AnimatePresence mode="wait">
      {currentView === 'landing' && (
        <motion.div
          key="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LandingPage />
        </motion.div>
      )}
      {currentView === 'form' && (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <FormView />
        </motion.div>
      )}
      {currentView === 'success' && (
        <motion.div
          key="success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <SuccessView />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
