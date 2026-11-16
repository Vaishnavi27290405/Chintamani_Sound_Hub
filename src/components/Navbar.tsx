import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import {
  Volume2,
  Calendar,
  Sparkles,
  User,
  LogOut,
  Bell,
  Menu,
  X,
  PhoneCall,
  Disc,
  FileText,
  Code,
  Instagram
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSoundDemo: () => void;
  onOpenDjangoHub?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSoundDemo,
  onOpenDjangoHub
}) => {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { notifications, openNotificationsDrawer, bookings } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'packages', label: 'Packages' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact Us' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#07010f]/95 backdrop-blur-lg border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & LoudLee Brand */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 p-0.5 shadow-[0_0_20px_rgba(168,85,247,0.5)] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all">
                <div className="w-full h-full bg-[#0d021a] rounded-[10px] flex items-center justify-center">
                  <Volume2 className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-black tracking-wider text-white">
                  CHINTAMANI
                </span>
                <span className="text-lg font-black tracking-wider bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-300 bg-clip-text text-transparent">
                  SOUND
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] uppercase font-bold tracking-widest text-purple-300/80">
                <span className="px-1.5 py-0.2 rounded bg-purple-900/60 border border-purple-500/30 text-purple-300 text-[9px]">
                  LLOYD LEE SERIES
                </span>
                <span className="text-amber-400 font-extrabold">DOLBY AUDIO</span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-purple-900/40 text-white border border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.2)]'
                    : 'text-purple-200/80 hover:text-white hover:bg-purple-950/40'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* My Bookings Tab if has bookings */}
            {bookings.length > 0 && (
              <button
                onClick={() => {
                  setActiveTab('my-bookings');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'my-bookings'
                    ? 'bg-purple-900/40 text-white border border-purple-400/40'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-purple-400" />
                <span>My Bookings ({bookings.length})</span>
              </button>
            )}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Dolby Sound Demo Trigger */}
            <button
              onClick={onOpenSoundDemo}
              className="px-3 py-1.5 rounded-xl bg-[#17052e] hover:bg-purple-900/50 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all hover:scale-105"
              title="Test Subwoofer Bass & Surround Sound"
            >
              <Disc className="w-3.5 h-3.5 text-purple-400 animate-spin" />
              <span>Dolby Demo</span>
            </button>

            {/* Python Django Architecture Button */}
            {onOpenDjangoHub && (
              <button
                onClick={onOpenDjangoHub}
                className="px-3 py-1.5 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm transition-all hover:scale-105"
                title="View Python Django Backend Architecture & API"
              >
                <Code className="w-3.5 h-3.5 text-emerald-400" />
                <span>Django DB</span>
              </button>
            )}

            {/* Notifications / SMS Inbox Bell */}
            <button
              onClick={() => openNotificationsDrawer('sms')}
              className="relative p-2 rounded-xl bg-[#140529] hover:bg-purple-900/50 border border-purple-500/30 text-purple-300 transition-colors"
              title="View SMS & Email Receipts"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-fuchsia-500 text-white text-[10px] font-black animate-pulse">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Quick Helpline & Instagram */}
            <a
              href="https://www.instagram.com/chintamani_soundsatara?igsh=ZHM4bWZzN3V0bXAy"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600/30 to-purple-600/30 border border-pink-500/40 text-pink-200 text-xs font-semibold flex items-center space-x-1.5 hover:from-pink-600/50 hover:to-purple-600/50 hover:border-pink-400 transition-all hover:scale-105"
              title="Official Instagram @chintamani_soundsatara"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden xl:inline">Instagram</span>
            </a>

            <a
              href="tel:+919175136546"
              className="px-3 py-1.5 rounded-xl bg-purple-950/70 border border-purple-500/20 text-purple-300 text-xs font-mono flex items-center space-x-1 hover:border-purple-400 transition-colors"
              title="Call Helpline: +91 91751 36546"
            >
              <PhoneCall className="w-3.5 h-3.5 text-purple-400" />
              <span>+91 91751 36546</span>
            </a>

            {/* User Auth Section */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-purple-900/40 border border-purple-400/40 text-white text-xs font-semibold hover:bg-purple-800/40 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-[11px] font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#130526] border border-purple-500/40 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in duration-150">
                    <div className="px-3 py-2 border-b border-purple-500/20">
                      <div className="text-xs font-bold text-white truncate">{user.name}</div>
                      <div className="text-[10px] text-purple-300 font-mono truncate">{user.email}</div>
                      <div className="text-[10px] text-purple-400 font-mono">{user.phone}</div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('my-bookings');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-purple-200 hover:bg-purple-900/40 rounded-lg flex items-center space-x-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                      <span>My Bookings & Invoices</span>
                    </button>

                    <button
                      onClick={() => {
                        openNotificationsDrawer('sms');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-purple-200 hover:bg-purple-900/40 rounded-lg flex items-center space-x-2"
                    >
                      <Bell className="w-3.5 h-3.5 text-purple-400" />
                      <span>SMS & Email Logs</span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs text-red-300 hover:bg-red-950/40 rounded-lg flex items-center space-x-2 border-t border-purple-500/20 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-400" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-600/30 flex items-center space-x-1.5 transition-all hover:scale-105"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login / Register</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => openNotificationsDrawer('sms')}
              className="p-2 rounded-lg bg-[#140529] border border-purple-500/30 text-purple-300 relative"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-fuchsia-400"></span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#140529] border border-purple-500/30 text-purple-300"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-[#0c0218] border-b border-purple-500/30 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold ${
                activeTab === item.id
                  ? 'bg-purple-900/60 text-white border border-purple-400/40'
                  : 'text-purple-200 hover:bg-purple-950/50'
              }`}
            >
              {item.label}
            </button>
          ))}

          {bookings.length > 0 && (
            <button
              onClick={() => {
                setActiveTab('my-bookings');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-purple-300 bg-purple-950/40 flex items-center justify-between"
            >
              <span>My Bookings & Invoices</span>
              <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-xs font-mono">
                {bookings.length}
              </span>
            </button>
          )}

          <div className="pt-3 border-t border-purple-500/20 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenSoundDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-[#1b0638] border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Disc className="w-4 h-4 text-purple-400 animate-spin" />
              <span>Experience Dolby Sound Demo</span>
            </button>

            {onOpenDjangoHub && (
              <button
                onClick={() => {
                  onOpenDjangoHub();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold font-mono flex items-center justify-center gap-2"
              >
                <Code className="w-4 h-4 text-emerald-400" />
                <span>Python & Django DB Architecture</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://www.instagram.com/chintamani_soundsatara?igsh=ZHM4bWZzN3V0bXAy"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-600/30 to-purple-600/30 border border-pink-500/40 text-pink-200 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>Instagram</span>
              </a>

              <a
                href="tel:+919175136546"
                className="py-2.5 px-3 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-200 text-xs font-bold font-mono flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4 text-purple-400" />
                <span>+91 91751 36546</span>
              </a>
            </div>

            {isAuthenticated && user ? (
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{user.name}</div>
                  <div className="text-[10px] text-purple-300 font-mono">{user.phone}</div>
                </div>
                <button
                  onClick={logout}
                  className="text-xs text-red-400 font-bold hover:underline"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  openAuthModal('login');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-md"
              >
                Login / Register Account
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
