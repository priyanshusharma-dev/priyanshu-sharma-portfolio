// "use client";
// import ScrollReveal from "../components/ui/ScrollReveal";
// import SplitText from "../components/ui/SplitText";
// import Lightbox from "../components/ui/Lightbox";
// import { motion } from "framer-motion";
// import { useState } from "react";

// /* ═══════════════════════════════════════════════════════════════════════
//    🎨 YOUR DESIGNS — EDIT THIS ARRAY!
//    ─────────────────────────────────────────────────────────────────────
//    For each design you want to show, add an object:
//      • title:    what you want to call the design
//      • image:    path to the PNG/JPG in /public/designs/
//                  e.g. "/designs/richard-mille.png"
//      • figmaUrl: the shareable Figma URL, or "#" for placeholder
//    ───────────────────────────────────────────────────────────────────── */
// const designs = [
//   {
//     title: "Richard Mille - Hero Section",
//     image: "/designs/richard-mille.png",
//     figmaUrl: "https://www.figma.com/design/tTpmPl3RT43vkyYRlb2fkl/RICHARD-MILLE?node-id=1-4&t=F4ugahdWUAcdjzBz-1",
//     color: "from-emerald-500/30 to-teal-500/20",
//   },
//   {
//     title: "Audemars Piguet - Hero Section",
//     image: "/designs/audemars-piguet.png",
//     figmaUrl: "https://www.figma.com/design/aUyVtqAkcCAELakbvIdsWA/Audemars-Piguet?node-id=0-1&t=4TlGls3K6sT7sIlE-1",
//     color: "from-violet-500/30 to-indigo-500/20",
//   },
//   {
//     title: "Toyota Hilux - Hero Section",
//     image: "/designs/toyota-hilux.png",
//     figmaUrl: "https://www.figma.com/design/irbXLRKVluWhe7TrtR1jaR/Toyota-Hilux-Random-?node-id=0-1&t=vJ3M3ZHVKVNmEcfy-1",
//     color: "from-cyan-500/30 to-blue-500/20",
//   },
//   {
//     title: "Koenigsegg Sadair's Spear - Hero Section",
//     image: "/designs/koenigsegg-sadair's-spear.png",
//     figmaUrl: "https://www.figma.com/design/XhwaLYcFiugaH8BwNfTkXt/Koenigsegg-Sadairs-Sphere?node-id=0-1&t=WlDXE0QnAdXA8YmK-1",
//     color: "from-emerald-500/30 to-teal-500/20",
//   },
//   {
//     title: "Nucleus Programming - Home Page",
//     image: "/designs/nucleus-programming.png",
//     figmaUrl: "https://www.figma.com/design/79PZeAPAVdDGoNTL3NM5aD/Nucleus-Programming?node-id=0-1&t=uMvCCP9TqBDsu1aW-1",
//     color: "from-pink-500/30 to-rose-500/20",
//   },
//   {
//     title: "Cold Solutions - Home Page",
//     image: "/designs/cold-solutions.png",
//     figmaUrl: "https://www.figma.com/design/h6dMQrLpZgi2HfeBY3tYca/COLD-SOLUTIONS?node-id=2-2&t=kytt0f45pIbPbvzC-1",
//     color: "from-amber-500/30 to-yellow-500/20",
//   },
// ];

// const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
// const itemAnim = {
//   hidden: { opacity: 0, scale: 0.95 },
//   show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
// };

// export default function Designs() {
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const openLightbox = (index) => {
//     if (designs[index].image) {
//       setCurrentIndex(imageIndexToLightboxIndex(index));
//       setLightboxOpen(true);
//     }
//   };

//   const lightboxImages = designs
//     .filter((d) => d.image)
//     .map((d) => ({
//       title: d.title,
//       src: d.image,
//       figmaUrl: d.figmaUrl === "#" ? undefined : d.figmaUrl,
//     }));

//   function imageIndexToLightboxIndex(idx) {
//     let count = 0;
//     for (let i = 0; i < idx; i++) {
//       if (designs[i].image) count++;
//     }
//     return count;
//   }

//   return (
//     <section id="designs" className="relative py-28 bg-black px-6">
//       <div className="max-w-6xl mx-auto">
//         <ScrollReveal>
//           <p className="text-xs tracking-[0.3em] uppercase text-emerald-500 mb-4">04 — Designs</p>
//           <SplitText
//             as="h2"
//             className="text-4xl md:text-6xl font-normal text-white mb-6 tracking-tight"
//             text="Figma explorations."
//             triggerOnScroll
//           />
//           <p className="text-white/50 mb-16 max-w-xl">
//             UI concepts, wireframes, and experiments from my design process.
//             Click any design to view it larger.
//           </p>
//         </ScrollReveal>

//         <motion.div
//           className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
//           variants={container}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.1 }}
//         >
//           {designs.map((design, index) => (
//             <motion.div
//               key={index}
//               variants={itemAnim}
//               whileHover={{ y: -6 }}
//               onClick={() => openLightbox(index)}
//               className={`group relative block rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-emerald-500/40 transition-all duration-300 ${
//                 design.image ? "cursor-pointer" : ""
//               }`}
//               data-cursor-hover
//             >
//               {/* Image area — PORTRAIT aspect ratio (3:4) great for mobile/UI designs */}
//               <div className="aspect-[3/4] bg-white/[0.02] flex items-center justify-center relative overflow-hidden p-3">
//                 {design.image ? (
//                   <img
//                     src={design.image}
//                     alt={design.title}
//                     className="max-w-full max-h-full w-auto h-auto object-contain rounded-md shadow-lg group-hover:scale-105 transition-transform duration-700"
//                   />
//                 ) : (
//                   <div
//                     className={`w-full h-full rounded-md bg-gradient-to-br ${design.color} flex items-center justify-center`}
//                   >
//                     <span className="text-white/20 text-3xl md:text-4xl font-serif italic">
//                       {String(index + 1).padStart(2, "0")}
//                     </span>
//                   </div>
//                 )}

//                 {/* Hover overlay */}
//                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center pointer-events-none">
//                   {design.image ? (
//                     <span className="text-white text-xs md:text-sm font-medium flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
//                       </svg>
//                       View larger
//                     </span>
//                   ) : (
//                     <span className="text-white/0 group-hover:text-white/60 text-[10px] md:text-xs tracking-wider uppercase transition-colors duration-300">
//                       Coming soon
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {/* Card footer */}
//               <div className="p-3 md:p-4 flex items-center justify-between border-t border-white/5">
//                 <span className="text-sm text-white/70 group-hover:text-white transition-colors truncate">
//                   {design.title}
//                 </span>
//                 {design.figmaUrl && design.figmaUrl !== "#" ? (
//                   <a
//                     href={design.figmaUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     onClick={(e) => e.stopPropagation()}
//                     className="text-[10px] uppercase tracking-wider text-white/30 hover:text-emerald-400 transition-colors flex-shrink-0 ml-2"
//                   >
//                     Figma ↗
//                   </a>
//                 ) : (
//                   <span className="text-[10px] uppercase tracking-wider text-white/20 flex-shrink-0 ml-2">
//                     Figma
//                   </span>
//                 )}
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>

//       {lightboxOpen && lightboxImages.length > 0 && (
//         <Lightbox
//           images={lightboxImages}
//           currentIndex={currentIndex}
//           onClose={() => setLightboxOpen(false)}
//           onNavigate={setCurrentIndex}
//         />
//       )}
//     </section>
//   );
// }