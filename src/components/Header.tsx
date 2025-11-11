import { Menu, LogOut, User, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
  // Translucent header that participates in normal document flow (scrolls away)
  <header className="relative w-full backdrop-blur-xl bg-white/50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleNavigation("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-lg sm:text-xl">I</span>
            </div>
            <span className="text-lg sm:text-xl text-gray-900 font-semibold">Introto</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavigation("about")}
              className={`transition-colors font-medium ${currentPage === 'about' ? 'text-amber-600' : 'text-gray-700 hover:text-gray-900'}`}
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation("courses")}
              className={`transition-colors font-medium ${currentPage === 'courses' ? 'text-amber-600' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Courses
            </button>
            <button 
              onClick={() => handleNavigation("community")}
              className={`transition-colors font-medium ${currentPage === 'community' ? 'text-amber-600' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Community
            </button>
            <button 
              onClick={() => handleNavigation("blog")}
              className={`transition-colors font-medium ${currentPage === 'blog' ? 'text-amber-600' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Blog
            </button>
          </nav>

          {/* Login/User Button */}
          <div className="hidden md:block">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 hover:bg-white transition-all shadow-sm hover:shadow-md">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{user?.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200 shadow-lg">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    {isAdmin && (
                      <div className="mt-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 text-xs font-medium inline-block">
                        Admin
                      </div>
                    )}
                  </div>
                  <div className="py-1">
                    {isAdmin ? (
                      <DropdownMenuItem 
                        onSelect={() => handleNavigation("admin")}
                        className="px-3 py-2 cursor-pointer flex items-center gap-2 text-amber-700 hover:bg-amber-50"
                      >
                        <Shield className="w-4 h-4" />
                        <span className="text-sm">Admin Panel</span>
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem 
                        onSelect={() => handleNavigation("profile")}
                        className="px-3 py-2 cursor-pointer flex items-center gap-2 text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4" />
                        <span className="text-sm">Profile</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onSelect={handleLogout}
                      className="px-3 py-2 cursor-pointer flex items-center gap-2 text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Logout</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={() => handleNavigation("login")}
                className="bg-white/80 border-0 text-gray-900 hover:bg-white shadow-sm"
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <button 
              onClick={() => handleNavigation("about")}
              className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => handleNavigation("courses")}
              className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Courses
            </button>
            <button 
              onClick={() => handleNavigation("community")}
              className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Community
            </button>
            <button 
              onClick={() => handleNavigation("blog")}
              className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Blog
            </button>
            {isAuthenticated ? (
              <>
                <div className="text-gray-700 font-medium pt-2 pb-2 border-t border-gray-200">
                  Hi, {user?.name}
                  {isAdmin && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 text-xs">Admin</span>
                  )}
                </div>
                {isAdmin ? (
                  <Button 
                    onClick={() => handleNavigation("admin")}
                    className="w-full bg-amber-500/20 border-0 text-amber-700 hover:bg-amber-500/30 shadow-sm justify-start"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Button>
                ) : (
                  <Button 
                    onClick={() => handleNavigation("profile")}
                    className="w-full bg-white/80 border-0 text-gray-900 hover:bg-white shadow-sm justify-start"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                )}
                <Button 
                  onClick={handleLogout}
                  className="w-full bg-white/80 border-0 text-gray-900 hover:bg-white shadow-sm justify-start"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => handleNavigation("login")}
                className="w-full bg-white/80 border-0 text-gray-900 hover:bg-white shadow-sm"
              >
                Login
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
