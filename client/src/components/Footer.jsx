import { Facebook, Instagram, Linkedin, Phone } from "lucide-react";
import SkillSwapLogo from "../assids/Skillsawp.png"; // ✅ import image from top

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand & Tagline */}
        <div>
          <a href="/" className="flex items-center gap-2 mb-3">
            <img
              src={SkillSwapLogo}
              alt="SkillSwap Logo"
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-white tracking-tight">
              SkillSwap
            </span>
          </a>
          <p className="text-gray-400 mb-4">
            Connecting learners worldwide through skill exchange.
          </p>
          <div className="flex gap-4 text-gray-400">
            <a href="#"><Facebook className="hover:text-white" /></a>
            <a href="#"><Instagram className="hover:text-white" /></a>
            <a href="#"><Linkedin className="hover:text-white" /></a>
            <a href="tel:+919977413362"><Phone className="hover:text-white" /></a>
          </div>
        </div>

        {/* Platform */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-indigo-400">Platform</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">How It Works</a></li>
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Safety</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-indigo-400">Community</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Guidelines</a></li>
            <li><a href="#" className="hover:text-white">Company</a></li>
            <li><a href="#" className="hover:text-white">About</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-indigo-400">Legal</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Privacy</a></li>
            <li><a href="#" className="hover:text-white">Terms</a></li>
          </ul>

          {/* Clickable Email */}
          <p className="text-sm text-gray-400 mt-4">
            Email: <a href="mailto:skillswap63@gmail.com" className="hover:text-white">skillswap63@gmail.com</a>
          </p>

          {/* Clickable Phone */}
          <p className="text-sm text-gray-400">
            Phone: <a href="tel:+919977413362" className="hover:text-white">+91 9977413362</a>, 
                   <a href="tel:+919302451035" className="hover:text-white"> 93024 51035</a>
          </p>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />

      <p className="text-center text-gray-500 text-sm">
        © {currentYear} SkillSwap. Empowering learners worldwide.
      </p>
    </footer>
  );
}
