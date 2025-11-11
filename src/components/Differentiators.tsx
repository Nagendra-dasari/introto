import React from "react";
import { motion } from "motion/react";
import { 
  Award, 
  Clock, 
  Globe, 
  HeadphonesIcon, 
  Shield, 
  Zap,
  BookOpen,
  Target
} from "lucide-react";

const differentiators = [
  {
    icon: Award,
    title: "Industry-Recognized Certificates",
    description: "Earn credentials that matter to employers worldwide",
    gradient: "from-amber-400 to-orange-500"
  },
  {
    icon: Clock,
    title: "Flexible Learning Schedules",
    description: "Learn at your own pace, anytime and anywhere",
    gradient: "from-blue-400 to-indigo-500"
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with learners from 150+ countries",
    gradient: "from-teal-400 to-cyan-500"
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Expert Support",
    description: "Get help whenever you need it from our dedicated team",
    gradient: "from-purple-400 to-pink-500"
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "Every course meets our rigorous standards of excellence",
    gradient: "from-green-400 to-emerald-500"
  },
  {
    icon: Zap,
    title: "Cutting-Edge Curriculum",
    description: "Stay ahead with constantly updated content",
    gradient: "from-yellow-400 to-amber-500"
  },
  {
    icon: BookOpen,
    title: "Hands-On Projects",
    description: "Build real-world portfolio with practical assignments",
    gradient: "from-rose-400 to-red-500"
  },
  {
    icon: Target,
    title: "Personalized Learning Paths",
    description: "AI-powered recommendations tailored to your goals",
    gradient: "from-violet-400 to-purple-500"
  }
];

export function Differentiators() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl text-white mb-6">
            What Sets Us Apart
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Experience the EduVista advantage through our commitment to excellence, innovation, and your success
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiators.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="h-full p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all hover:shadow-xl hover:shadow-black/20">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
