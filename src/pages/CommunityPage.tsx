import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Star, MessageCircle, Send, ThumbsUp, Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const availableCourses = [
  "Data Science Fundamentals",
  "Digital Marketing Mastery",
  "UX Design Principles",
  "Financial Analytics & Modeling",
  "Artificial Intelligence Essentials",
  "Full-Stack Web Development",
  "Business Leadership",
  "Python for Beginners"
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Senior Data Analyst",
    course: "Data Science Fundamentals",
    content: "EduVista transformed my career. The Data Science course gave me practical skills I use every day. The instructors are world-class and truly invested in student success.",
    rating: 5,
    date: "October 2025"
  },
  {
    id: 2,
    name: "James Chen",
    role: "Marketing Director",
    course: "Digital Marketing Mastery",
    content: "The Digital Marketing Mastery course exceeded all expectations. I implemented strategies from week one and saw immediate results in our campaigns.",
    rating: 5,
    date: "September 2025"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "UX Designer",
    course: "UX Design Principles",
    content: "As a career changer, I was nervous about learning UX design. Introto's supportive community and hands-on projects made the transition seamless.",
    rating: 5,
    date: "August 2025"
  }
];


interface DiscussionPost {
  id: number;
  author: string;
  content: string;
  date: string;
  replies: number;
  likes: number;
}

const discussionPosts: DiscussionPost[] = [
  {
    id: 1,
    author: "David Kim",
    content: "What are the best practices for implementing machine learning models in production? Looking for real-world experiences.",
    date: "2 hours ago",
    replies: 12,
    likes: 24
  },
  {
    id: 2,
    author: "Lisa Anderson",
    content: "Just completed the Digital Marketing course! Has anyone successfully implemented SEO strategies from Module 3?",
    date: "5 hours ago",
    replies: 8,
    likes: 15
  },
  {
    id: 3,
    author: "Carlos Martinez",
    content: "Struggling with the quiz in Module 2 of Business Leadership. Any tips on strategic planning frameworks?",
    date: "1 day ago",
    replies: 20,
    likes: 31
  }
];

interface CommunityPageProps {
  onNavigate: (page: string) => void;
}

export function CommunityPage({ onNavigate }: CommunityPageProps) {
  const { isAuthenticated, user } = useAuth();
  const [testimonialText, setTestimonialText] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [discussionText, setDiscussionText] = useState("");
  const [activeTab, setActiveTab] = useState("testimonials");

  const handleTestimonialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onNavigate("login");
      return;
    }
    if (!selectedCourse) {
      alert("Please select a course!");
      return;
    }
    // In real app, would submit to backend
    alert(`Testimonial submitted successfully for ${selectedCourse}!`);
    setTestimonialText("");
    setSelectedCourse("");
  };

  const handleDiscussionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onNavigate("login");
      return;
    }
    // In real app, would submit to backend
    alert("Discussion post created successfully!");
    setDiscussionText("");
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl text-white mb-6">
            Community
            <span className="block bg-gradient-to-r from-amber-300 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              Hub
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Connect, share experiences, and learn from our global community of learners
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-sm border border-white/10">
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="forum" className="data-[state=active]:bg-amber-500/20 data-[state=active]:text-amber-300">
              Discussion Forum
            </TabsTrigger>
          </TabsList>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Write Testimonial */}
              <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                <h3 className="text-2xl text-white mb-6">Share Your Experience</h3>
                {isAuthenticated ? (
                  <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white/90 text-sm font-medium mb-3">Select Course</label>
                      <Select value={selectedCourse} onValueChange={setSelectedCourse} required>
                        <SelectTrigger className="h-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-amber-400/50 text-white rounded-xl transition-all shadow-lg hover:shadow-amber-500/20">
                          <SelectValue placeholder="Choose a course..." />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900/95 backdrop-blur-xl border-2 border-white/20 rounded-xl shadow-2xl">
                          {availableCourses.map((course) => (
                            <SelectItem 
                              key={course} 
                              value={course} 
                              className="text-white hover:bg-amber-500/20 hover:text-amber-300 cursor-pointer py-3 px-4 rounded-lg my-1 transition-all"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                                {course}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Textarea
                      value={testimonialText}
                      onChange={(e) => setTestimonialText(e.target.value)}
                      placeholder="Tell us about your learning journey with Introto..."
                      rows={4}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 resize-none"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Testimonial
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="w-12 h-12 text-white/50 mx-auto mb-4" />
                    <p className="text-white/80 mb-4">Please log in to write a testimonial</p>
                    <Button
                      onClick={() => onNavigate("login")}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0"
                    >
                      Login to Continue
                    </Button>
                  </div>
                )}
              </Card>

              {/* Testimonials List */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, idx) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all h-full flex flex-col">
                      <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm mb-4 self-start">
                        {testimonial.course}
                      </div>

                      <p className="text-white/90 mb-6 flex-1 leading-relaxed">
                        {testimonial.content}
                      </p>

                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                        ))}
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="text-white">{testimonial.name}</div>
                            <div className="text-sm text-white/70">{testimonial.role}</div>
                          </div>
                        </div>
                        <div className="text-xs text-white/50 mt-2">{testimonial.date}</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Discussion Forum Tab */}
          <TabsContent value="forum" className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Create Discussion Post */}
              <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                <h3 className="text-2xl text-white mb-6">Start a Discussion</h3>
                {isAuthenticated ? (
                  <form onSubmit={handleDiscussionSubmit} className="space-y-4">
                    <Textarea
                      value={discussionText}
                      onChange={(e) => setDiscussionText(e.target.value)}
                      placeholder="Ask a question or start a discussion..."
                      rows={4}
                      required
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/50 resize-none"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600 text-white border-0"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Post Discussion
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="w-12 h-12 text-white/50 mx-auto mb-4" />
                    <p className="text-white/80 mb-4">Please log in to participate in discussions</p>
                    <Button
                      onClick={() => onNavigate("login")}
                      className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0"
                    >
                      Login to Continue
                    </Button>
                  </div>
                )}
              </Card>

              {/* Discussion Posts */}
              <div className="space-y-4">
                {discussionPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <Card className="p-6 border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white flex-shrink-0">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-white">{post.author}</span>
                            <span className="text-sm text-white/50">{post.date}</span>
                          </div>
                          <p className="text-white/90 mb-4 leading-relaxed">{post.content}</p>
                          <div className="flex items-center gap-6 text-sm">
                            <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.replies} replies</span>
                            </button>
                            <button className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{post.likes} likes</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
