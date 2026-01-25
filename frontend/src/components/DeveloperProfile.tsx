import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Github, Linkedin, Mail, ExternalLink, Terminal, BrainCircuit, Sparkles } from "lucide-react"

export function DeveloperProfile() {
  return (
    <div className="p-1 rounded-[2rem] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-2xl">
      <Card className="w-full max-w-2xl mx-auto overflow-hidden border-none bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl rounded-[1.9rem]">
        <CardContent className="p-0">
          {/* Header Section with Profile */}
          <div className="relative p-8 pb-6 flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <User size={48} strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-500 border-4 border-white dark:border-slate-950 rounded-full flex items-center justify-center shadow-md">
                <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    Ayush Parmar
                  </h3>
                  <p className="flex items-center justify-center md:justify-start gap-2 text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                    <Terminal size={16} />
                    Full-Stack & ML Developer
                  </p>
                </div>
                <div className="flex justify-center gap-2">
                  <a href="https://github.com/AyushParmar9106/cardio_disease" target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="icon" className="rounded-xl hover:bg-black hover:text-white transition-all shadow-sm">
                      <Github size={18} />
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/ayush-parmar-1791972b5" target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="icon" className="rounded-xl hover:bg-[#0077B5] hover:text-white transition-all shadow-sm">
                      <Linkedin size={18} />
                    </Button>
                  </a>
                  {/* <a href="mailto:your-">
                    <Button variant="secondary" size="icon" className="rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
                      <Mail size={18} />
                    </Button>
                  </a> */}
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="px-8 py-4">
            <div className="bg-slate-100/50 dark:bg-slate-900/50 rounded-2xl p-5 border border-white/50 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-yellow-500" />
                About Me
              </h4>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Specializing in building scalable web applications with <span className="text-blue-600 font-medium">Next.js</span> and 
                integrating intelligent backends using <span className="text-blue-600 font-medium">FastAPI & ML</span>. 
                This project showcases my ability to bridge the gap between AI models and user-centric interfaces.
              </p>
            </div>
          </div>

          {/* Skills Section */}
          <div className="px-8 py-4">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 flex items-center gap-2">
              <BrainCircuit size={14} className="text-indigo-500" />
              Core Expertise
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                { name: "Next.js", color: "bg-black text-white" },
                { name: "Python", color: "bg-blue-500 text-white" },
                { name: "FastAPI", color: "bg-emerald-500 text-white" },
                { name: "Machine Learning", color: "bg-purple-600 text-white" },
                { name: "Tailwind", color: "bg-cyan-500 text-white" },
                { name: "PostgreSQL", color: "bg-indigo-500 text-white" }
              ].map((skill) => (
                <Badge 
                  key={skill.name} 
                  className={`${skill.color} border-none px-4 py-1.5 rounded-lg shadow-sm hover:scale-110 transition-transform cursor-default`}
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Footer Section */}
          <div className="p-8 pt-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/30 rounded-2xl border border-blue-100 dark:border-blue-900/30">
              <div>
                <p className="text-[10px] font-bold uppercase text-blue-500 tracking-widest">Placement Project</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Final Semester 2026</p>
              </div>
              <a href="https://www.linkedin.com/in/ayush-parmar-1791972b5" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-blue-600 hover:bg-indigo-700 text-white rounded-xl px-5 shadow-lg shadow-blue-500/20 group">
                  Contact Me <ExternalLink size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}