import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Code2, Database, Cloud, Container, Server, Terminal, Braces, Cpu,
  FileCode, Globe, Layers, Share2, Zap, Package, Triangle, Wind, GitBranch,
  Move3d, MousePointer2, RotateCw, Monitor, Layout, Smartphone,
  Hexagon, Rocket, Settings, Shield, Activity, Wifi, Wrench
} from 'lucide-react';

const TECHS = [
  { name: 'React', icon: Code2, color: '#61DAFB' },
  { name: 'Node.js', icon: Server, color: '#83CD29' },
  { name: 'TypeScript', icon: Braces, color: '#3178C6' },
  { name: 'Python', icon: Terminal, color: '#FFD43B' },
  { name: 'MongoDB', icon: Database, color: '#47A248' },
  { name: 'Docker', icon: Container, color: '#2496ED' },
  { name: 'AWS', icon: Cloud, color: '#FF9900' },
  { name: 'JavaScript', icon: FileCode, color: '#F7DF1E' },
  { name: 'Vue.js', icon: Globe, color: '#42B883' },
  { name: 'Firebase', icon: Layers, color: '#FFCA28' },
  { name: 'LLMs', icon: Cpu, color: '#FF6B6B' },
  { name: 'MySQL', icon: Database, color: '#4479A1' },
  { name: 'GraphQL', icon: Share2, color: '#E535AB' },
  { name: 'Redis', icon: Zap, color: '#DC382D' },
  { name: 'PostgreSQL', icon: Database, color: '#6BA5D7' },
  { name: 'Next.js', icon: Triangle, color: '#EDEDED' },
  { name: 'Tailwind', icon: Wind, color: '#38BDF8' },
  { name: 'Kubernetes', icon: Package, color: '#326CE5' },
  { name: 'Git', icon: GitBranch, color: '#F05032' },
  { name: 'Figma', icon: Layout, color: '#F24E1E' },
  { name: 'Vite', icon: Zap, color: '#646CFF' },
  { name: 'Supabase', icon: Database, color: '#3ECF8E' },
  { name: 'Svelte', icon: Hexagon, color: '#FF3E00' },
  { name: 'HTML5', icon: Globe, color: '#E34F26' },
  { name: 'CSS3', icon: Layout, color: '#1572B6' },
  { name: 'Linux', icon: Monitor, color: '#FCC624' },
  { name: 'Vercel', icon: Triangle, color: '#FFFFFF' },
  { name: 'Framer', icon: Hexagon, color: '#0055FF' },
  { name: 'Go', icon: Rocket, color: '#00ADD8' },
  { name: 'Rust', icon: Settings, color: '#DEA584' },
  { name: 'Cypress', icon: Activity, color: '#17202C' },
  { name: 'Jest', icon: Shield, color: '#C21325' },
  { name: 'React Native', icon: Smartphone, color: '#61DAFB' },
  { name: 'WebSockets', icon: Wifi, color: '#010101' },
  { name: 'CI/CD', icon: Wrench, color: '#2088FF' },
];

const PERSPECTIVE = 1100;
const RADIUS = 280;

// Fibonacci sphere distribution for even spacing of points on a sphere surface.
// These are the *unrotated* coordinates; the browser handles rotation via CSS.
function fibonacciSphere(count: number, radius: number) {
  const points: { x: number; y: number; z: number }[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    points.push({ x: x * radius, y: y * radius, z: z * radius });
  }
  return points;
}

const TechStackSphere = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [rotation, setRotation] = useState({ x: -15, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoSpin, setAutoSpin] = useState(true);

  const dragState = useRef({ velX: 0, velY: 0.15 });
  const lastPointer = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const points = useRef(fibonacciSphere(TECHS.length, RADIUS)).current;

  // Continuous animation loop: auto-spin + momentum decay
  useEffect(() => {
    const tick = () => {
      setRotation((prev) => {
        let { velX, velY } = dragState.current;

        if (!isDragging) {
          if (autoSpin) {
            velY += (0.15 - velY) * 0.02;
            velX *= 0.95;
          } else {
            velX *= 0.94;
            velY *= 0.94;
          }
        }

        dragState.current.velX = velX;
        dragState.current.velY = velY;

        return {
          x: Math.max(-85, Math.min(85, prev.x + velX)),
          y: prev.y + velY,
        };
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging, autoSpin]);

  const handlePointerDownCapture = useCallback((e: React.PointerEvent) => {
    lastPointer.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true);
    dragState.current.velX = 0;
    dragState.current.velY = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastPointer.current.x;
      const dy = e.clientY - lastPointer.current.y;
      lastPointer.current = { x: e.clientX, y: e.clientY };
      dragState.current.velX = -dy * 0.3;
      dragState.current.velY = dx * 0.3;
      setRotation((prev) => ({
        x: Math.max(-85, Math.min(85, prev.x - dy * 0.3)),
        y: prev.y + dx * 0.3,
      }));
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // We still need to know each point's post-rotation depth (for z-index / fade),
  // and an approximate perspective-projected screen position (for the faint
  // connecting lines only) — actual node placement is real CSS 3D, not this math.
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const rx = rad(rotation.x);
  const ry = rad(rotation.y);

  const projected = points.map((p, i) => {
    const x1 = p.x * Math.cos(ry) + p.z * Math.sin(ry);
    const z1 = -p.x * Math.sin(ry) + p.z * Math.cos(ry);
    const y2 = p.y * Math.cos(rx) - z1 * Math.sin(rx);
    const z2 = p.y * Math.sin(rx) + z1 * Math.cos(rx);
    const scaleFactor = PERSPECTIVE / (PERSPECTIVE - z2);
    return { index: i, z: z2, screenX: x1 * scaleFactor, screenY: y2 * scaleFactor };
  });

  const sortedByDepth = [...projected].sort((a, b) => a.z - b.z);
  const depthOrder = new Map(sortedByDepth.map((d, order) => [d.index, order]));

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#04050a]">
      {/* starfield */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.7) 1%, transparent 60%),' +
            'radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.5) 1%, transparent 60%),' +
            'radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.6) 1%, transparent 60%),' +
            'radial-gradient(1px 1px at 60% 85%, rgba(255,255,255,0.4) 1%, transparent 60%),' +
            'radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.5) 1%, transparent 60%),' +
            'radial-gradient(1px 1px at 45% 40%, rgba(255,255,255,0.6) 1%, transparent 60%),' +
            'radial-gradient(1px 1px at 15% 90%, rgba(255,255,255,0.5) 1%, transparent 60%)',
          backgroundSize: '340px 340px',
          backgroundRepeat: 'repeat',
        }}
      />
      {/* nebula glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-devnest-indigo/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-devnest-mint/10 blur-[100px] pointer-events-none" />

      <div className="container relative mx-auto max-w-7xl flex justify-center items-center">
        {/* sphere stage */}
        <div className="relative w-full max-w-4xl">
          {/* interaction hints */}
          <div className="hidden md:flex flex-col gap-3 absolute top-2 right-2 z-50 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md px-4 py-3">
            <div className="flex items-center gap-2 text-xs text-devnest-muted">
              <Move3d className="w-3.5 h-3.5 text-devnest-mint" />
              Drag to rotate
            </div>
            <div className="flex items-center gap-2 text-xs text-devnest-muted">
              <MousePointer2 className="w-3.5 h-3.5 text-devnest-mint" />
              Hover to spotlight
            </div>
            <button
              onClick={() => setAutoSpin((v) => !v)}
              className="flex items-center gap-2 text-xs text-devnest-muted hover:text-white transition-colors"
            >
              <RotateCw className={`w-3.5 h-3.5 ${autoSpin ? 'text-devnest-mint' : 'text-devnest-muted'}`} />
              Auto rotate{' '}
              <span className={autoSpin ? 'text-devnest-mint font-semibold' : 'text-devnest-muted font-semibold'}>
                {autoSpin ? 'ON' : 'OFF'}
              </span>
            </button>
          </div>

          <div
            className="relative w-full h-[680px] flex items-center justify-center select-none touch-none cursor-grab active:cursor-grabbing"
            style={{ perspective: `${PERSPECTIVE}px`, perspectiveOrigin: '50% 50%' }}
            onPointerDownCapture={handlePointerDownCapture}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {/* faint connecting lines from core to each node (screen-space approximation) */}
            <svg
              className="absolute top-1/2 left-1/2 pointer-events-none"
              style={{ width: 800, height: 800, transform: 'translate(-50%, -50%)' }}
              viewBox="-400 -400 800 800"
            >
              {projected.map((p) => {
                const t = TECHS[p.index];
                const fade = 0.15 + ((depthOrder.get(p.index) ?? 0) / (TECHS.length - 1)) * 0.35;
                return (
                  <line
                    key={t.name}
                    x1={0}
                    y1={0}
                    x2={p.screenX}
                    y2={p.screenY}
                    stroke={t.color}
                    strokeOpacity={fade}
                    strokeWidth={1}
                  />
                );
              })}
            </svg>

            {/* the 3D group: everything inside shares one rotation and one
                perspective-corrected coordinate space */}
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translate(-50%, -50%) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
            >
              {/* wireframe meridians */}
              {[0, 30, 60, 90, 120, 150].map((deg) => (
                <div
                  key={deg}
                  className="absolute rounded-full border border-dashed pointer-events-none"
                  style={{
                    width: RADIUS * 2,
                    height: RADIUS * 2,
                    top: -RADIUS,
                    left: -RADIUS,
                    borderColor: 'rgba(100,255,218,0.15)',
                    transform: `rotateY(${deg}deg)`,
                  }}
                />
              ))}
              <div
                className="absolute rounded-full border border-dashed pointer-events-none"
                style={{
                  width: RADIUS * 2,
                  height: RADIUS * 2,
                  top: -RADIUS,
                  left: -RADIUS,
                  borderColor: 'rgba(108,99,255,0.2)',
                  transform: 'rotateX(90deg)',
                }}
              />

              {/* core */}
              <motion.div
                className="absolute rounded-full bg-gradient-to-br from-devnest-mint via-devnest-indigo to-purple-600 flex items-center justify-center"
                style={{ width: 88, height: 88, top: -44, left: -44 }}
                animate={{
                  scale: [1, 1.15, 1],
                  boxShadow: [
                    '0 0 50px rgba(100, 255, 218, 0.6)',
                    '0 0 90px rgba(108, 99, 255, 0.8)',
                    '0 0 50px rgba(100, 255, 218, 0.6)',
                  ],
                }}
                transition={{
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <Code2 className="w-9 h-9 text-white" />
              </motion.div>

              {/* tech nodes — real 3D position via translate3d */}
              {points.map((p, index) => {
                const tech = TECHS[index];
                const Icon = tech.icon;
                const isHovered = hoveredIndex === index;
                const order = depthOrder.get(index) ?? 0;
                const depthFade = 0.5 + (order / (TECHS.length - 1)) * 0.5;

                return (
                  <div
                    key={tech.name}
                    className="absolute top-0 left-0"
                    style={{
                      transform: `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateY(${-rotation.y}deg) rotateX(${-rotation.x}deg)`,
                      transformStyle: 'preserve-3d',
                      zIndex: order,
                      opacity: depthFade,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <motion.div
                      onPointerEnter={() => setHoveredIndex(index)}
                      onPointerLeave={() => setHoveredIndex(null)}
                      initial={{ scale: 0 }}
                      animate={{ scale: isHovered ? 1.4 : 1 }}
                      transition={{ duration: 0.25 }}
                      className="w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center gap-1 cursor-pointer"
                      style={{
                        border: `1px solid ${tech.color}66`,
                        boxShadow: isHovered
                          ? `0 0 40px ${tech.color}cc, 0 0 70px ${tech.color}55, 0 8px 24px rgba(0,0,0,0.7)`
                          : `0 0 16px ${tech.color}33, 0 8px 20px rgba(0,0,0,0.6)`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: tech.color }} />
                      <span className="text-[9px] font-semibold text-white whitespace-nowrap">
                        {tech.name}
                      </span>
                      <span
                        className="w-3 h-[2px] rounded-full"
                        style={{ background: tech.color }}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSphere;