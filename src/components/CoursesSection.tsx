import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Clock, Users, ArrowRight, Languages } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { coursesData } from "../data/coursesData";

interface CoursesSectionProps {
  onNavigate: (page: string, courseId?: number | string, scrollTo?: string) => void;
  showAll?: boolean;
  searchQuery?: string;
  scrollToCurriculum?: boolean;
}

export function CoursesSection({ onNavigate, showAll = false, searchQuery = "", scrollToCurriculum = false }: CoursesSectionProps) {
  // Filter courses by search query
  const filteredCourses = coursesData.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayCourses = showAll ? filteredCourses : filteredCourses.slice(0, 3);
  
  // Group courses by segment
  const flagshipCourses = displayCourses.filter(c => c.segment === 'flagship');
  const microCourses = displayCourses.filter(c => c.segment === 'micro');
  const wipCourses = displayCourses.filter(c => c.segment === 'wip');

  const renderCourseGrid = (courses: typeof coursesData, segmentTitle: string, segmentColor: string) => {
    if (courses.length === 0) return null;
    
    return (
      <div className="mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <h3 className="text-2xl sm:text-3xl text-white font-semibold">{segmentTitle}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${segmentColor} w-fit`}>
            {courses.length} {courses.length === 1 ? 'Course' : 'Courses'}
          </span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all h-full flex flex-col group">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs text-slate-900">
                      {course.category}
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-xs text-white">
                      {course.level}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Centered Title */}
                    <h3 className="text-white text-center mb-4 text-lg font-semibold group-hover:text-amber-300 transition-colors">
                      {course.title}
                    </h3>

                    {/* Centered Icon Details */}
                    <div className="flex items-center justify-center gap-6 mb-4 text-sm text-white/70">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Languages className="w-4 h-4" />
                        <span>English</span>
                      </div>
                    </div>

                    {/* Brief Description (3-4 lines) */}
                    <p className="text-white/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3 text-center">
                      {course.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-2xl text-white">${course.price}</span>
                      <Button 
                        size="sm"
                        onClick={() => onNavigate("course-detail", course.id, scrollToCurriculum ? "curriculum" : undefined)}
                        className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 group-hover:shadow-lg"
                      >
                        Enroll Now
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      );
    };

  return (
    <section id="courses" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-6">
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl text-white mb-6">
              Explore Our Premium Course Catalog
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Discover expertly crafted courses designed to accelerate your career and expand your skill set
            </p>
          </motion.div>
        )}

        {showAll ? (
          <>
            {/* Flagship Courses */}
            {renderCourseGrid(flagshipCourses, "Flagship Courses", "bg-amber-500/20 text-amber-300 border border-amber-500/30")}
            
            {/* Micro Courses */}
            {renderCourseGrid(microCourses, "Micro Courses", "bg-blue-500/20 text-blue-300 border border-blue-500/30")}
            
            {/* WIP Courses */}
            {renderCourseGrid(wipCourses, "WIP Courses", "bg-green-500/20 text-green-300 border border-green-500/30")}
          </>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayCourses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/30 transition-all h-full flex flex-col group">
                    <div className="relative overflow-hidden">
                      <ImageWithFallback
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs text-slate-900">
                        {course.category}
                      </div>
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-amber-500 text-xs text-white">
                        {course.level}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      {/* Centered Title */}
                      <h3 className="text-white text-center mb-4 text-lg font-semibold group-hover:text-amber-300 transition-colors">
                        {course.title}
                      </h3>

                      {/* Centered Icon Details */}
                      <div className="flex items-center justify-center gap-6 mb-4 text-sm text-white/70">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Languages className="w-4 h-4" />
                          <span>English</span>
                        </div>
                      </div>

                      {/* Brief Description (3-4 lines) */}
                      <p className="text-white/70 text-sm leading-relaxed mb-4 flex-1 line-clamp-3 text-center">
                        {course.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-2xl text-white">${course.price}</span>
                        <Button 
                          size="sm"
                          onClick={() => onNavigate("course-detail", course.id, scrollToCurriculum ? "curriculum" : undefined)}
                          className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-0 group-hover:shadow-lg"
                        >
                          Enroll Now
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mt-12"
            >
              <Button 
                size="lg"
                variant="outline"
                onClick={() => onNavigate("courses")}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                View All Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
