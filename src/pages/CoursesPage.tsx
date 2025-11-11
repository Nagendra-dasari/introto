import { motion } from "motion/react";
import { CoursesSection } from "../components/CoursesSection";
import { Search } from "lucide-react";
import { useState } from "react";

interface CoursesPageProps {
  onNavigate: (page: string, courseId?: number | string, scrollTo?: string) => void;
}

export function CoursesPage({ onNavigate }: CoursesPageProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen pt-12 pb-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-5xl mx-auto"
        >
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-6 leading-tight">
            Explore Our Courses
          </h1>
          
          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-white mb-8 max-w-2xl mx-auto">
            Discover world-class AI-powered courses designed to transform your career
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
            <div className="relative">
              <input
                type="text"
                placeholder="  Start searching courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-8 pr-12 text-sm rounded-lg bg-white/5 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-gray-600 focus:bg-white/10 transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <CoursesSection onNavigate={onNavigate} showAll={true} searchQuery={searchQuery} scrollToCurriculum={true} />
        </div>
      </div>
    </div>
  );
}
