import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

const ScrollingFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/public/site-config`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.feedbacks && data.data.feedbacks.length > 0) {
          setFeedbacks(data.data.feedbacks);
        } else {
            // some default genz feedbacks if admin hasn't added any yet
            setFeedbacks([
                "Aarav Sharma: pojo.dev literally saved my final year project fr fr 🚀",
                "Priya Patel: W mentors, totally carried me through my interview prep ✨",
                "Rohan Singh: no cap, the best codebase i've ever seen 🔥",
                "Ananya Gupta: they understood the assignment. absolutely goated team 🐐"
            ]);
        }
      })
      .catch(err => {
          console.error(err);
          setFeedbacks([
            "Aarav Sharma: pojo.dev literally saved my final year project fr fr 🚀",
            "Priya Patel: W mentors, totally carried me through my interview prep ✨",
            "Rohan Singh: no cap, the best codebase i've ever seen 🔥",
            "Ananya Gupta: they understood the assignment. absolutely goated team 🐐"
        ]);
      });
  }, []);

  if (feedbacks.length === 0) return null;

  return (
    <section className="w-full py-12 bg-devnest-darker border-y border-white/5 overflow-hidden relative flex flex-col justify-center">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-devnest-darker to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-devnest-darker to-transparent z-10 pointer-events-none" />
      
      <div className="flex w-fit group">
        <div 
          className="flex whitespace-nowrap items-stretch min-w-max animate-marquee"
        >
          {/* We duplicate the feedbacks list to create a seamless loop */}
          {[...feedbacks, ...feedbacks, ...feedbacks, ...feedbacks].map((feedback, idx) => {
            let name = "";
            let message = feedback;
            if (feedback.includes(":")) {
              const parts = feedback.split(":");
              name = parts[0].trim();
              message = parts.slice(1).join(":").trim();
            } else {
              const defaultNames = ["Aarav Sharma", "Priya Patel", "Rohan Singh", "Ananya Gupta", "Vikram Reddy", "Neha Desai"];
              name = defaultNames[idx % defaultNames.length];
            }

            return (
              <div key={idx} className="flex flex-col gap-3 min-w-[350px] md:min-w-[450px] bg-white/5 border border-white/10 rounded-2xl p-6 mx-4 hover:bg-white/10 transition-colors shadow-lg cursor-default h-full">
                <div className="flex text-yellow-400 mb-2">
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                  <Star size={16} className="fill-current" />
                </div>
                <p className="text-white text-lg font-medium italic mb-4 whitespace-normal">
                  "{message}"
                </p>
                <div className="mt-auto flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-devnest-mint to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-devnest-muted text-xs">Verified Student</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScrollingFeedback;
