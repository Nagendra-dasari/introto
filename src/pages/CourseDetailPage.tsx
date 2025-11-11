import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import {
  ArrowLeft,
  Clock,
  Users,
  Star,
  CheckCircle,
  BookOpen,
  CreditCard,
  Lock,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { coursesData } from "../data/coursesData";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect, useRef } from "react";

interface CourseDetailPageProps {
  courseId: number;
  onNavigate: (page: string, param?: number | string, scrollTo?: string) => void;
  scrollToSection?: string;
}

export function CourseDetailPage({ courseId, onNavigate, scrollToSection }: CourseDetailPageProps) {
  const course = coursesData.find((c) => c.id === courseId);
  const { isAuthenticated, enrollCourse, isEnrolled } = useAuth();
  const [showPayment, setShowPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (scrollToSection) {
      setTimeout(() => {
        const element = document.getElementById(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, [scrollToSection]);

  // refs for the "train on a track" payment card effect
  const mainRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  // scroll-follow effect: move the card inside the track based on scroll progress
  useEffect(() => {
    let rafId: number | null = null;

    const onScroll = () => {
      if (!mainRef.current || !trackRef.current || !cardRef.current) return;

      const mainRect = mainRef.current.getBoundingClientRect();
      const cardEl = cardRef.current;

      const mainTop = window.scrollY + mainRect.top;
      const mainHeight = mainRect.height;
      const cardHeight = cardEl.offsetHeight;

      // set the track container height to match the main content so the card can travel full length
      trackRef.current.style.height = `${mainHeight}px`;

      const start = mainTop;
      const end = mainTop + Math.max(0, mainHeight - cardHeight);

      const scrollY = window.scrollY;
      const progress = (scrollY - start) / Math.max(1, end - start);
      const clamped = Math.min(1, Math.max(0, progress));

      const translate = clamped * Math.max(0, mainHeight - cardHeight);

      // apply transform using rAF friendly update
      cardEl.style.position = "absolute";
      cardEl.style.top = "0px";
      cardEl.style.left = "0px";
      cardEl.style.width = "100%";
      cardEl.style.transform = `translateY(${translate}px)`;
    };

    const handler = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler);

    // run once to initialize
    handler();

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [showPayment]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl text-white mb-4">Course Not Found</h1>
          <Button onClick={() => onNavigate("courses")}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  const enrolled = isEnrolled(courseId);

  const handleEnrollment = () => {
    if (!isAuthenticated) {
      onNavigate("login");
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    enrollCourse(courseId);
    onNavigate("lms", courseId);
  };

  if (enrolled) {
    onNavigate("lms", courseId);
    return null;
  }

  const message = course.category === "Technology"
    ? "The only way to do great work is to love what you do."
    : course.category === "Marketing"
    ? "Marketing is no longer about the stuff you make, but about the stories you tell."
    : course.category === "Business"
    ? "The best investment you can make is in yourself."
    : "Design is not just what it looks like, it is how it works.";

  const motivationalQuote = `${message} - Start your journey today!`;

  return (
    <div className="min-h-screen pt-12 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={() => onNavigate("courses")}
          className="flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div ref={mainRef} className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm">
                <ImageWithFallback
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-sm">
                      {course.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm">
                      {course.level}
                    </span>
                  </div>

                  <h1 className="text-4xl text-white mb-4">{course.title}</h1>

                  <p className="text-lg text-white/80 mb-6">{course.description}</p>

                  <div className="flex flex-wrap items-center gap-6 text-white/70">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                      <span className="text-white">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      <span>{course.modules.length} modules</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Motivational Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20"
            >
              <p className="text-lg text-amber-200 italic text-center">{motivationalQuote}</p>
            </motion.div>

            {/* Learning Outcomes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm">
                <h2 className="text-2xl text-white mb-6">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{outcome}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Instructor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm">
                <h2 className="text-2xl text-white mb-6">Your Instructor</h2>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl flex-shrink-0">
                    {course.instructor.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-1">{course.instructor.name}</h3>
                    <p className="text-amber-300 mb-2">{course.instructor.title}</p>
                    <p className="text-white/70">{course.instructor.bio}</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Course Curriculum */}
            <motion.div id="curriculum" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
              <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm">
                <h2 className="text-2xl text-white mb-6">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.modules.map((module, idx) => (
                    <div key={module.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white flex-shrink-0">{idx + 1}</div>
                        <div className="flex-1">
                          <h3 className="text-white mb-1">{module.title}</h3>
                          <p className="text-sm text-white/70 mb-2">{module.description}</p>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span>{module.content.type.toUpperCase()}</span>
                            {module.content.duration && <span>{module.content.duration}</span>}
                            <span>{module.quiz.questions.length} quiz questions</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - Enrollment */}
          <div className="lg:col-span-1">
            <div ref={trackRef} className="relative">
              <div ref={cardRef} style={{ position: "absolute", top: 0, left: 0, width: "100%" }}>
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                  <Card className="p-8 border-white/10 bg-white/5 backdrop-blur-sm">
                    {!showPayment ? (
                      <>
                        <div className="text-center mb-6">
                          <div className="text-5xl text-white mb-2">${course.price}</div>
                          <p className="text-white/70">One-time payment</p>
                        </div>

                        <Button onClick={handleEnrollment} size="lg" className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 shadow-xl mb-4">Enroll Now</Button>

                        <div className="space-y-3 pt-6 border-t border-white/10">
                          <div className="flex items-center gap-3 text-white/90"><CheckCircle className="w-5 h-5 text-green-400" /><span>Lifetime access</span></div>
                          <div className="flex items-center gap-3 text-white/90"><CheckCircle className="w-5 h-5 text-green-400" /><span>Certificate of completion</span></div>
                          <div className="flex items-center gap-3 text-white/90"><CheckCircle className="w-5 h-5 text-green-400" /><span>24/7 support</span></div>
                          <div className="flex items-center gap-3 text-white/90"><CheckCircle className="w-5 h-5 text-green-400" /><span>Access on mobile & desktop</span></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl text-white mb-6 text-center">Payment Details</h3>

                        <form onSubmit={handlePayment} className="space-y-4">
                          <div>
                            <Label htmlFor="cardName" className="text-white mb-2 block">Cardholder Name</Label>
                            <Input id="cardName" type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required className="bg-white/10 border-white/30 text-white placeholder:text-white/50" />
                          </div>

                          <div>
                            <Label htmlFor="cardNumber" className="text-white mb-2 block">Card Number</Label>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                              <Input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required maxLength={19} className="pl-11 bg-white/10 border-white/30 text-white placeholder:text-white/50" />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiry" className="text-white mb-2 block">Expiry Date</Label>
                              <Input id="expiry" type="text" placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required maxLength={5} className="bg-white/10 border-white/30 text-white placeholder:text-white/50" />
                            </div>
                            <div>
                              <Label htmlFor="cvv" className="text-white mb-2 block">CVV</Label>
                              <Input id="cvv" type="text" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} required maxLength={3} className="bg-white/10 border-white/30 text-white placeholder:text-white/50" />
                            </div>
                          </div>

                          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-white">
                            <span>Total</span>
                            <span className="text-2xl">${course.price}</span>
                          </div>

                          <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white border-0 shadow-xl"><Lock className="w-4 h-4 mr-2" />Complete Payment</Button>

                          <Button type="button" variant="outline" onClick={() => setShowPayment(false)} className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20">Cancel</Button>
                        </form>

                        <div className="mt-4 text-xs text-white/60 text-center"><Lock className="w-3 h-3 inline mr-1" />Secure payment powered by Stripe</div>
                      </>
                    )}
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
